using Microsoft.EntityFrameworkCore;
using Infrastructure;
using Application.Repositories;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Presentation;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Postgres")));

builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddScoped<IRecommendationRepository, RecommendationRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint(
                $"/swagger/v1/swagger.json",
                "V1");
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    DbSeeder.Seed(db);
}

app.MapGet("/api/questions", async (IQuestionRepository repository) =>
{
    var questions = await repository.GetAllAsync();
    return Results.Ok(questions);
});

app.MapGet("/api/recommendations", async ([FromQuery] string answers, IQuestionRepository questionRepo, IRecommendationRepository recommendationRepo) =>
{
    if (string.IsNullOrWhiteSpace(answers))
        return Results.BadRequest("No answers provided.");

    // Parse answers string: "1:positive,2:negative"
    var userAnswers = new List<UserAnswerDto>();
    var pairs = answers.Split(',', StringSplitOptions.RemoveEmptyEntries);
    foreach (var pair in pairs)
    {
        var parts = pair.Split(':', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length == 2 && int.TryParse(parts[0], out int qid))
        {
            var answer = parts[1].Trim().ToLower();
            if (answer is "positive" or "negative")
                userAnswers.Add(new UserAnswerDto { QuestionId = qid, Answer = answer });
        }
    }
    if (userAnswers.Count == 0)
        return Results.BadRequest("No valid answers provided.");

    var questionIds = userAnswers.Select(a => a.QuestionId).ToList();
    var questions = (await questionRepo.GetByIdsAsync(questionIds)).ToList();
    if (questions.Count == 0)
        return Results.BadRequest("No valid questions found for provided IDs.");

    // Build a set of tags to filter recommendations
    var tags = new List<string>();
    foreach (var answer in userAnswers)
    {
        var question = questions.FirstOrDefault(q => q.Id == answer.QuestionId);
        if (question == null) continue;
        switch (answer.Answer)
        {
            case "positive":
                tags.Add(question.PositiveAnswerTag);
                break;
            case "negative":
                tags.Add(question.NegativeAnswerTag);
                break;
        }
    }
    if (tags.Count == 0)
        return Results.BadRequest("No tags derived from answers.");

    var recommendations = (await recommendationRepo.GetAllAsync())
        .Where(r => r.Tags.Any(tag => tags.Contains(tag)))
        .ToList();

    return Results.Ok(recommendations);
});

app.Run();

public partial class Program;

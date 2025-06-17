using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Domain.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Hosting;

namespace IntegrationTests
{
    public class QuestionsApiTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public QuestionsApiTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Testing");
            });
        }

        [Fact]
        public async Task GetQuestions_ReturnsSeededQuestions()
        {
            var client = _factory.CreateClient();

            // Seed the in-memory database after the server is running
            using (var scope = _factory.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                DbSeeder.Seed(db);
            }

            var response = await client.GetAsync("/api/questions");
            response.EnsureSuccessStatusCode();

            var questions = await response.Content.ReadFromJsonAsync<List<Question>>();
            Assert.NotNull(questions);
            Assert.NotEmpty(questions);
            Assert.Contains(questions, q => q.QuestionText.Contains("strategy"));
        }
    }
} 
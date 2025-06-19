using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using Domain.Entities;
using Infrastructure;

namespace IntegrationTests
{
    public class QuestionsApiTests : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        private readonly CustomWebApplicationFactory<Program> _factory;

        public QuestionsApiTests(CustomWebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetQuestions_ReturnsSeededQuestions()
        {
            // Arrange
            var client = _factory.CreateClient();

            // Act
            var response = await client.GetAsync("/api/questions");
            response.EnsureSuccessStatusCode();

            // Assert
            var questions = await response.Content.ReadFromJsonAsync<List<Question>>();
            Assert.NotNull(questions);
            Assert.NotEmpty(questions);
            Assert.Contains(questions, q => q.QuestionText.Contains("strategy"));
        }
    }
} 
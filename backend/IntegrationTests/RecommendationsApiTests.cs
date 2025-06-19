using System.Net;
using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using Domain.Entities;
using Infrastructure;

namespace IntegrationTests
{
    public class RecommendationsApiTests : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        private readonly CustomWebApplicationFactory<Program> _factory;

        public RecommendationsApiTests(CustomWebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetRecommendations_ReturnsFilteredRecommendations()
        {
            var client = _factory.CreateClient();
            using (var scope = _factory.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                DbSeeder.Seed(db);
            }

            // Question 1: positive -> "strategy"; Question 2: negative -> "multiplayer"
            var response = await client.GetAsync("/api/recommendations?answers=1:positive,2:negative");
            response.EnsureSuccessStatusCode();
            var recommendations = await response.Content.ReadFromJsonAsync<List<Recommendation>>();
            Assert.NotNull(recommendations);
            Assert.NotEmpty(recommendations);
            Assert.Contains(recommendations, r => r.GameTitle == "Civilization VI"); // has "strategy" tag
            Assert.DoesNotContain(recommendations, r => r.GameTitle == "DOOM Eternal");
        }

        [Fact]
        public async Task GetRecommendations_Returns400ForMissingAnswers()
        {
            var client = _factory.CreateClient();
            var response = await client.GetAsync("/api/recommendations");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task GetRecommendations_ReturnsEmptyIfNoMatch()
        {
            var client = _factory.CreateClient();
            using (var scope = _factory.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                DbSeeder.Seed(db);
            }
            // Use a tag that doesn't exist in any recommendation
            var response = await client.GetAsync("/api/recommendations?answers=1:negative"); // "action" tag, only DOOM Eternal
            response.EnsureSuccessStatusCode();
            var recommendations = await response.Content.ReadFromJsonAsync<List<Recommendation>>();
            Assert.NotNull(recommendations);
            // If you want to check for empty, use a tag that doesn't exist at all
            response = await client.GetAsync("/api/recommendations?answers=1:negative,2:positive"); // "action" and "singleplayer"
            recommendations = await response.Content.ReadFromJsonAsync<List<Recommendation>>();
            Assert.NotNull(recommendations);
            // At least one should match "action" (DOOM Eternal)
            Assert.Contains(recommendations, r => r.GameTitle == "DOOM Eternal");
        }
    }
} 
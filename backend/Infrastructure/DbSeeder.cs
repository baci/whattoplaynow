using Domain.Entities;

namespace Infrastructure
{
    public static class DbSeeder
    {
        public static void Seed(ApplicationDbContext db)
        {
            db.Database.Migrate(); // Ensure DB is up to date

            if (!db.Questions.Any())
            {
                db.Questions.AddRange(new[]
                {
                    new Question { QuestionText = "Do you like strategy games?", PositiveAnswerTag = "strategy", NegativeAnswerTag = "action" },
                    new Question { QuestionText = "Do you prefer single-player experiences?", PositiveAnswerTag = "singleplayer", NegativeAnswerTag = "multiplayer" }
                });
            }
            if (!db.Recommendations.Any())
            {
                db.Recommendations.AddRange(new[]
                {
                    new Recommendation { GameTitle = "Civilization VI", Tags = new List<string>{"strategy","turn-based"}, SteamId = "289070", YoutubeVideoId = "5KdE0p2joJw", CdkeysId = "civilization-vi-pc" },
                    new Recommendation { GameTitle = "DOOM Eternal", Tags = new List<string>{"action","shooter"}, SteamId = "782330", YoutubeVideoId = "FkklG9MA0vM", CdkeysId = "doom-eternal-pc" }
                });
            }
            db.SaveChanges();
        }
    }
} 
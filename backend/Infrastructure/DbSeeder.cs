using Domain.Entities;

namespace Infrastructure;

public static class DbSeeder
{
    public static void Seed(ApplicationDbContext db)
    {
        // Add questions if none exist
        if (!db.Questions.Any())
        {
            db.Questions.AddRange(
                new Question 
                { 
                    QuestionText = "Do you like strategy games?", 
                    PositiveAnswerTag = "strategy", 
                    NegativeAnswerTag = "action" 
                },
                new Question 
                { 
                    QuestionText = "Do you prefer single-player experiences?", 
                    PositiveAnswerTag = "singleplayer", 
                    NegativeAnswerTag = "multiplayer" 
                }
            );
        }

        // Add recommendations if none exist
        if (!db.Recommendations.Any())
        {
            db.Recommendations.AddRange(
                new Recommendation 
                { 
                    GameTitle = "Civilization VI", 
                    Tags = ["strategy", "turn-based"], 
                    SteamId = "289070", 
                    YoutubeVideoId = "5KdE0p2joJw", 
                    CdkeysId = "civilization-vi-pc" 
                },
                new Recommendation 
                { 
                    GameTitle = "DOOM Eternal", 
                    Tags = ["action", "shooter"], 
                    SteamId = "782330", 
                    YoutubeVideoId = "FkklG9MA0vM", 
                    CdkeysId = "doom-eternal-pc" 
                }
            );
        }

        db.SaveChanges();
    }
} 
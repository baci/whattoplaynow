using Domain.Entities;

namespace Infrastructure;

public static class DbSeeder
{
    public static void Seed(ApplicationDbContext db)
    {
        if (!db.Questions.Any())
        {
            db.Questions.AddRange(
                new Question 
                { 
                    QuestionText = "Do you want a game that gets your heart racing?", 
                    PositiveAnswerTag = "action", 
                    NegativeAnswerTag = "chill" 
                },
                new Question
                {
                    QuestionText = "Do you love getting lost in complex menus and skill trees?",
                    PositiveAnswerTag = "complex",
                    NegativeAnswerTag = "simple"
                },
                new Question
                {
                    QuestionText = "Do you believe they just don't make games like they used to?",
                    PositiveAnswerTag = "old",
                    NegativeAnswerTag = "new"
                },
                new Question
                {
                    QuestionText = "Are you always chasing the latest, most stunning graphics?",
                    PositiveAnswerTag = "new",
                    NegativeAnswerTag = "old"
                },
                new Question
                {
                    QuestionText = "Are you looking for a story that will stick with you long after you've finished?",
                    PositiveAnswerTag = "story",
                    NegativeAnswerTag = "simulation"
                },
                new Question
                {
                    QuestionText = "Do you want the freedom to build and manage your own world or empire?",
                    PositiveAnswerTag = "simulation",
                    NegativeAnswerTag = "story"
                },
                new Question
                {
                    QuestionText = "Is discovering a hidden gem your ultimate thrill?",
                    PositiveAnswerTag = "indie",
                    NegativeAnswerTag = "well-known"
                },
                new Question
                {
                    QuestionText = "Do you want to escape to a world of magic, dragons, and impossible feats?",
                    PositiveAnswerTag = "fantasy",
                    NegativeAnswerTag = "reality"
                },
                new Question
                {
                    QuestionText = "Do you prefer your game worlds to be bright, cheerful, and charming?",
                    PositiveAnswerTag = "cute",
                    NegativeAnswerTag = "grim"
                },
                new Question
                {
                    QuestionText = "Is gaming better with friends?",
                    PositiveAnswerTag = "multiplayer",
                    NegativeAnswerTag = "singleplayer"
                }
            );
        }

        if (!db.Recommendations.Any())
        {
            db.Recommendations.AddRange(
                new Recommendation
                {
                    GameTitle = "The Witcher 3: Wild Hunt",
                    Tags = ["action", "complex", "new", "story", "well-known", "fantasy", "grim", "singleplayer"],
                    SteamId = "292030",
                    YoutubeVideoId = "c0i88t0Kacs",
                    CdkeysId = "the-witcher-3-wild-hunt-goty-edition-pc-gog"
                },
                new Recommendation
                {
                    GameTitle = "Stardew Valley",
                    Tags = ["chill", "simple", "old", "simulation", "indie", "reality", "cute", "singleplayer"],
                    SteamId = "413150",
                    YoutubeVideoId = "ot7uXNQskhs",
                    CdkeysId = "stardew-valley-pc"
                },
                new Recommendation
                {
                    GameTitle = "Red Dead Redemption 2",
                    Tags = ["action", "complex", "new", "story", "well-known", "reality", "grim", "singleplayer"],
                    SteamId = "1174180",
                    YoutubeVideoId = "gmA6MrX81z4",
                    CdkeysId = "red-dead-redemption-2-pc-rockstar"
                },
                new Recommendation
                {
                    GameTitle = "Deep Rock Galactic",
                    Tags = ["action", "simple", "new", "simulation", "indie", "fantasy", "grim", "multiplayer"],
                    SteamId = "548430",
                    YoutubeVideoId = "1S-bShG68-M",
                    CdkeysId = "deep-rock-galactic-pc"
                },
                new Recommendation
                {
                    GameTitle = "Elden Ring",
                    Tags = ["action", "complex", "new", "story", "well-known", "fantasy", "grim", "singleplayer"],
                    SteamId = "1245620",
                    YoutubeVideoId = "E3Huy2cdih0",
                    CdkeysId = "elden-ring-pc"
                },
                new Recommendation
                {
                    GameTitle = "Among Us",
                    Tags = ["chill", "simple", "new", "simulation", "indie", "fantasy", "cute", "multiplayer"],
                    SteamId = "945360",
                    YoutubeVideoId = "grdYlHDbVwE",
                    CdkeysId = "among-us-pc"
                },
                new Recommendation
                {
                    GameTitle = "Cyberpunk 2077",
                    Tags = ["action", "complex", "new", "story", "well-known", "fantasy", "grim", "singleplayer"],
                    SteamId = "1091500",
                    YoutubeVideoId = "8X2kIfS6fb8",
                    CdkeysId = "cyberpunk-2077-pc-gog"
                },
                new Recommendation
                {
                    GameTitle = "Cities: Skylines",
                    Tags = ["chill", "complex", "new", "simulation", "well-known", "reality", "cute", "singleplayer"],
                    SteamId = "255710",
                    YoutubeVideoId = "0gI2N1IejyE",
                    CdkeysId = "cities-skylines-pc"
                },
                new Recommendation
                {
                    GameTitle = "God of War",
                    Tags = ["action", "simple", "new", "story", "well-known", "fantasy", "grim", "singleplayer"],
                    SteamId = "1593500",
                    YoutubeVideoId = "K0u_kAWLJOA",
                    CdkeysId = "god-of-war-pc"
                },
                new Recommendation
                {
                    GameTitle = "Terraria",
                    Tags = ["action", "simple", "old", "simulation", "indie", "fantasy", "cute", "multiplayer"],
                    SteamId = "105600",
                    YoutubeVideoId = "w7uOhFTrrq0",
                    CdkeysId = "terraria-pc"
                },
                new Recommendation
                {
                    GameTitle = "Hades",
                    Tags = ["action", "simple", "new", "story", "indie", "fantasy", "grim", "singleplayer"],
                    SteamId = "1145360",
                    YoutubeVideoId = "mD8x5gVNE_w",
                    CdkeysId = "hades-pc"
                },
                new Recommendation
                {
                    GameTitle = "The Sims 4",
                    Tags = ["chill", "simple", "new", "simulation", "well-known", "reality", "cute", "singleplayer"],
                    SteamId = "1222670",
                    YoutubeVideoId = "z00m_t0e24A",
                    CdkeysId = "the-sims-4-pc-origin"
                },
                new Recommendation
                {
                    GameTitle = "Hollow Knight",
                    Tags = ["action", "complex", "old", "story", "indie", "fantasy", "grim", "singleplayer"],
                    SteamId = "367520",
                    YoutubeVideoId = "UAO2urG23S4",
                    CdkeysId = "hollow-knight-pc"
                },
                new Recommendation
                {
                    GameTitle = "Sea of Thieves",
                    Tags = ["action", "simple", "new", "simulation", "well-known", "fantasy", "cute", "multiplayer"],
                    SteamId = "1172620",
                    YoutubeVideoId = "rCj-t4_5A8E",
                    CdkeysId = "sea-of-thieves-pc-xbox-one"
                },
                new Recommendation
                {
                    GameTitle = "Disco Elysium - The Final Cut",
                    Tags = ["chill", "complex", "new", "story", "indie", "reality", "grim", "singleplayer"],
                    SteamId = "632470",
                    YoutubeVideoId = "wujT_mky_v4",
                    CdkeysId = "disco-elysium-the-final-cut-pc"
                },
                new Recommendation
                {
                    GameTitle = "Valheim",
                    Tags = ["action", "complex", "new", "simulation", "indie", "fantasy", "grim", "multiplayer"],
                    SteamId = "892970",
                    YoutubeVideoId = "YbybY_o_2m4",
                    CdkeysId = "valheim-pc"
                },
                new Recommendation
                {
                    GameTitle = "Portal 2",
                    Tags = ["chill", "simple", "old", "story", "well-known", "fantasy", "cute", "multiplayer"],
                    SteamId = "620",
                    YoutubeVideoId = "tax4e4hBBZc",
                    CdkeysId = "portal-2-pc"
                },
                new Recommendation
                {
                    GameTitle = "Dark Souls III",
                    Tags = ["action", "complex", "old", "story", "well-known", "fantasy", "grim", "singleplayer"],
                    SteamId = "374320",
                    YoutubeVideoId = "_zDZYrIUgKE",
                    CdkeysId = "dark-souls-3-pc"
                },
                new Recommendation
                {
                    GameTitle = "Factorio",
                    Tags = ["chill", "complex", "old", "simulation", "indie", "reality", "grim", "multiplayer"],
                    SteamId = "427520",
                    YoutubeVideoId = "J8SBkhe3u2g",
                    CdkeysId = "factorio-pc"
                },
                new Recommendation
                {
                    GameTitle = "Baldur's Gate 3",
                    Tags = ["action", "complex", "new", "story", "well-known", "fantasy", "grim", "multiplayer"],
                    SteamId = "1086940",
                    YoutubeVideoId = "1T22AD_3-oA",
                    CdkeysId = "baldurs-gate-3-pc-gog"
                }
            );
        }

        db.SaveChanges();
    }
} 
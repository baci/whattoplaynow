using System.Collections.Generic;

namespace Domain.Entities
{
    public class Recommendation
    {
        public int Id { get; set; }
        public string GameTitle { get; set; }
        public List<string> Tags { get; set; }
        public string SteamId { get; set; }
        public string YoutubeVideoId { get; set; }
        public string CdkeysId { get; set; }
    }
} 
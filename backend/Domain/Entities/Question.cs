namespace Domain.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public string PositiveAnswerTag { get; set; }
        public string NegativeAnswerTag { get; set; }
    }
} 
namespace Presentation;

public record UserAnswerDto
{
    public required int QuestionId { get; set; }
    public required string Answer { get; set; } // "positive" or "negative"
}
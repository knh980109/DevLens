namespace DevLens.Api.Models;

public class AiInsight
{
    public int Id { get; set; }
    public string Severity { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string File { get; set; } = string.Empty;
    public int? Line { get; set; }
    public string Suggestion { get; set; } = string.Empty;
}

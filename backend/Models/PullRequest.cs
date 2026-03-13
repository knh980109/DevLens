namespace DevLens.Api.Models;

public class PullRequest
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Reviewer { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string CreatedAt { get; set; } = string.Empty;
    public string? MergedAt { get; set; }
    public int QualityScore { get; set; }
    public int Comments { get; set; }
    public int Additions { get; set; }
    public int Deletions { get; set; }
}

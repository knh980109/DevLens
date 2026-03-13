namespace DevLens.Api.Models;

public class DeveloperRadar
{
    public int Speed { get; set; }
    public int Quality { get; set; }
    public int Collaboration { get; set; }
    public int Consistency { get; set; }
    public int Coverage { get; set; }
}

public class Developer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public int TotalPr { get; set; }
    public int MergedPr { get; set; }
    public int AvgQuality { get; set; }
    public int AvgReviewHours { get; set; }
    public DeveloperRadar Radar { get; set; } = new();
}

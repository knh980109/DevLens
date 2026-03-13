using System.Text.Json;
using DevLens.Api.Models;

namespace DevLens.Api.Services;

public class MockDataService
{
    private readonly string _dataPath;
    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public MockDataService(IWebHostEnvironment env)
    {
        _dataPath = Path.Combine(env.ContentRootPath, "Data");
    }

    public List<PullRequest> GetPullRequests()
    {
        var json = File.ReadAllText(Path.Combine(_dataPath, "pull_requests.json"));
        return JsonSerializer.Deserialize<List<PullRequest>>(json, _jsonOptions) ?? [];
    }

    public List<Developer> GetDevelopers()
    {
        var json = File.ReadAllText(Path.Combine(_dataPath, "developers.json"));
        return JsonSerializer.Deserialize<List<Developer>>(json, _jsonOptions) ?? [];
    }

    public List<AiInsight> GetInsights()
    {
        var json = File.ReadAllText(Path.Combine(_dataPath, "ai_insights.json"));
        return JsonSerializer.Deserialize<List<AiInsight>>(json, _jsonOptions) ?? [];
    }

    public object GetOverview()
    {
        var prs = GetPullRequests();
        var devs = GetDevelopers();
        return new
        {
            totalPr = prs.Count,
            openPr = prs.Count(p => p.Status == "open"),
            mergedPr = prs.Count(p => p.Status == "merged"),
            closedPr = prs.Count(p => p.Status == "closed"),
            avgQualityScore = prs.Any() ? (int)prs.Average(p => p.QualityScore) : 0,
            avgReviewHours = devs.Any() ? (int)devs.Average(d => d.AvgReviewHours) : 0,
            totalAdditions = prs.Sum(p => p.Additions),
            totalDeletions = prs.Sum(p => p.Deletions),
            weeklyPrData = new[]
            {
                new { week = "9/3주",  count = 4,  merged = 3 },
                new { week = "9/4주",  count = 6,  merged = 5 },
                new { week = "10/1주", count = 5,  merged = 4 },
                new { week = "10/2주", count = 8,  merged = 7 },
                new { week = "10/3주", count = 7,  merged = 5 },
                new { week = "10/4주", count = 9,  merged = 8 },
                new { week = "11/1주", count = 11, merged = 9 },
                new { week = "11/2주", count = 10, merged = 8 },
                new { week = "11/3주", count = 13, merged = 11 },
                new { week = "11/4주", count = 15, merged = 13 },
                new { week = "12/1주", count = 7,  merged = 5 }
            },
            qualityTrend = new[]
            {
                new { week = "9/3주",  score = 81 },
                new { week = "9/4주",  score = 83 },
                new { week = "10/1주", score = 80 },
                new { week = "10/2주", score = 85 },
                new { week = "10/3주", score = 87 },
                new { week = "10/4주", score = 86 },
                new { week = "11/1주", score = 89 },
                new { week = "11/2주", score = 88 },
                new { week = "11/3주", score = 91 },
                new { week = "11/4주", score = 90 },
                new { week = "12/1주", score = 92 }
            },
            developerPrCounts = devs.Select(d => new { name = d.Name, count = d.TotalPr, merged = d.MergedPr })
        };
    }
}

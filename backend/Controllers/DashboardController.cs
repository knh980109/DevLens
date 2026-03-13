using Microsoft.AspNetCore.Mvc;
using DevLens.Api.Services;

namespace DevLens.Api.Controllers;

[ApiController]
[Route("api/v1")]
public class DashboardController : ControllerBase
{
    private readonly MockDataService _mockData;

    public DashboardController(MockDataService mockData)
    {
        _mockData = mockData;
    }

    [HttpGet("overview")]
    public IActionResult GetOverview() => Ok(_mockData.GetOverview());

    [HttpGet("pull-requests")]
    public IActionResult GetPullRequests() => Ok(_mockData.GetPullRequests());

    [HttpGet("developers")]
    public IActionResult GetDevelopers() => Ok(_mockData.GetDevelopers());

    [HttpGet("insights")]
    public IActionResult GetInsights() => Ok(_mockData.GetInsights());
}

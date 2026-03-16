using Microsoft.AspNetCore.Mvc;
using DevLens.Api.Services;
using DevLens.Api.Models;

namespace DevLens.Api.Controllers;

/// <summary>
/// DevLens 대시보드 API
/// PR 현황, 개발자 분석, AI 인사이트 데이터를 제공합니다.
/// </summary>
[ApiController]
[Route("api/v1")]
[Produces("application/json")]
public class DashboardController : ControllerBase
{
    private readonly MockDataService _mockData;

    public DashboardController(MockDataService mockData)
    {
        _mockData = mockData;
    }

    /// <summary>대시보드 개요 통계 조회</summary>
    /// <remarks>
    /// 전체 PR 수, 평균 품질점수, 11주 추이 차트 데이터 등을 반환합니다.
    /// </remarks>
    /// <returns>KPI 지표 6개 + 주간 PR 추이 + 품질 트렌드 + 개발자별 현황</returns>
    /// <response code="200">정상 응답</response>
    [HttpGet("overview")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GetOverview() => Ok(_mockData.GetOverview());

    /// <summary>PR 목록 전체 조회</summary>
    /// <remarks>
    /// 의료IT 도메인 실무 PR 25건 (EMR/OCS/FHIR/EDI/HL7)을 반환합니다.
    /// </remarks>
    /// <returns>PullRequest 배열 (25건)</returns>
    /// <response code="200">정상 응답</response>
    [HttpGet("pull-requests")]
    [ProducesResponseType(typeof(IEnumerable<PullRequest>), StatusCodes.Status200OK)]
    public IActionResult GetPullRequests() => Ok(_mockData.GetPullRequests());

    /// <summary>개발자 목록 조회</summary>
    /// <remarks>
    /// 7명의 개발자 정보와 레이더 차트용 5축 데이터(속도/품질/협업/일관성/커버리지)를 반환합니다.
    /// </remarks>
    /// <returns>Developer 배열 (7명, radar 데이터 포함)</returns>
    /// <response code="200">정상 응답</response>
    [HttpGet("developers")]
    [ProducesResponseType(typeof(IEnumerable<Developer>), StatusCodes.Status200OK)]
    public IActionResult GetDevelopers() => Ok(_mockData.GetDevelopers());

    /// <summary>AI 인사이트 목록 조회</summary>
    /// <remarks>
    /// 의료 도메인 특화 AI 코드 분석 결과 12건을 반환합니다.
    /// severity: critical (환자정보 취약점) / warning / info
    /// </remarks>
    /// <returns>AiInsight 배열 (12건, severity/category/file/line 포함)</returns>
    /// <response code="200">정상 응답</response>
    [HttpGet("insights")]
    [ProducesResponseType(typeof(IEnumerable<AiInsight>), StatusCodes.Status200OK)]
    public IActionResult GetInsights() => Ok(_mockData.GetInsights());
}

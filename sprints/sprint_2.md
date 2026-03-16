# sprints/sprint_2.md
## 목표: Mock JSON 데이터 + ASP.NET Core API (0:30 ~ 1:00)

## 작업
- [x] `backend/Data/pull_requests.json` 생성
- [x] `backend/Data/developers.json` 생성
- [x] `backend/Data/ai_insights.json` 생성
- [x] `Models/PullRequest.cs`, `Developer.cs`, `AiInsight.cs` 생성
- [x] `Services/MockDataService.cs` - JSON 파일 읽어서 List로 반환
- [x] `Controllers/DashboardController.cs` - 4개 API 엔드포인트 구현
- [x] `http://localhost:5062/api/v1/overview` 응답 확인 (서버 실행 후 확인)
- [x] 완료 후 sprint_3.md 로 이동

## 관련 커밋
| 커밋 해시 | 메시지 |
|-----------|--------|
| `70bf706` | feat: DevLens AI Code Review Dashboard 초기 구현 |
| `3b048b5` | feat: GC메디아이 브랜딩 적용 및 의료IT 실무 데이터 반영 |

---

## 💡 개발 중 발생한 이슈

### 이슈: Swashbuckle 패키지 미포함

**문제 상황**

`dotnet new webapi --no-openapi` 옵션으로 프로젝트를 생성했더니 `Program.cs`에 Swagger 관련 코드가 없었습니다. `/swagger` 경로에 접근하면 404가 반환됐습니다.

**시도**

`Program.cs`에 직접 `app.UseSwagger()` 코드를 추가했으나 `IApplicationBuilder does not contain a definition for 'UseSwagger'` 컴파일 오류가 발생했습니다. Swashbuckle 패키지 자체가 없는 것이 원인이었습니다.

**해결**

```powershell
dotnet add package Swashbuckle.AspNetCore
```

패키지 추가 후 `Program.cs`에 `builder.Services.AddSwaggerGen()` + `app.UseSwaggerUI()`를 등록해 Swagger UI가 정상 동작했습니다. 이후 `DashboardController`에 XML 주석 + `[ProducesResponseType]` 어트리뷰트를 추가해 자동 문서화를 완성했습니다.

### 이슈: `IWebHostEnvironment` 파일 경로 처리

**문제 상황**

`MockDataService`에서 JSON 파일을 `File.ReadAllText("Data/pull_requests.json")`로 읽으면 로컬 실행 시에는 동작하지만, `dotnet publish` 후 배포 경로가 달라져 `FileNotFoundException`이 발생할 수 있었습니다.

**해결**

`IWebHostEnvironment`를 생성자 주입으로 받아 `_env.ContentRootPath`와 결합하는 방식으로 경로를 환경 독립적으로 처리했습니다.

```csharp
var path = Path.Combine(_env.ContentRootPath, "Data", "pull_requests.json");
var json = await File.ReadAllTextAsync(path);
```

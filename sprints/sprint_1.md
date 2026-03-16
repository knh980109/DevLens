# sprints/sprint_1.md
## 목표: 프로젝트 초기 세팅 (0:00 ~ 0:30)

## 작업
- [x] 환경 확인
```powershell
dotnet --version   # 9.x 확인
node -v            # 18 이상 확인
claude -v          # Claude Code 확인
```
- [x] ASP.NET Core Web API 프로젝트 생성
```powershell
cd DevLens
dotnet new webapi -n DevLens.Api -o backend
cd backend
dotnet new gitignore
```
- [x] CORS 및 기본 설정 (Program.cs)
  - CORS 허용 (http://localhost:5173)
  - Swagger 활성화
  - JSON 직렬화 camelCase 설정
- [x] Vue3 프론트엔드 생성
```powershell
cd ..
npm create vite@latest frontend -- --template vue
cd frontend
npm install
npm install vue-router@4 pinia axios apexcharts vue3-apexcharts sass
```
- [x] `frontend/vite.config.js` 프록시 설정
```js
server: {
  proxy: {
    '/api': 'http://localhost:5062'
  }
}
```
- [x] 두 서버 정상 실행 확인
```powershell
# backend (터미널 1)
cd backend && dotnet run

# frontend (터미널 2)
cd frontend && npm run dev
```
- [x] 완료 후 sprint_2.md 로 이동

## 관련 커밋
| 커밋 해시 | 메시지 |
|-----------|--------|
| `70bf706` | feat: DevLens AI Code Review Dashboard 초기 구현 |

---

## 💡 개발 중 발생한 이슈

### 이슈: 백엔드 포트 불일치

**문제 상황**

`dotnet run` 직후 Vite proxy가 동작하지 않았습니다. `vite.config.ts`에 `http://localhost:5062`로 설정했는데 API 호출이 전부 실패했습니다.

원인을 확인하니 `dotnet new webapi` 템플릿이 `launchSettings.json`에 랜덤 포트 **5098**을 할당했습니다.

**시도**

Vite proxy 포트를 5098로 맞춰 임시 해결을 시도했으나, 팀원 환경마다 포트가 달라질 수 있어 근본 해결이 필요하다고 판단했습니다.

**해결**

`backend/Properties/launchSettings.json`의 `applicationUrl`을 `http://localhost:5062`로 고정했습니다. 이후 프론트엔드 proxy와 정상 통신 확인 완료.

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
- [ ] 두 서버 정상 실행 확인
```powershell
# backend (터미널 1)
cd backend && dotnet run

# frontend (터미널 2)
cd frontend && npm run dev
```
- [x] 완료 후 sprint_2.md 로 이동

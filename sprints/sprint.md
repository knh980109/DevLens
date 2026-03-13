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

---

# sprints/sprint_2.md
## 목표: Mock JSON 데이터 + ASP.NET Core API (0:30 ~ 1:00)

## 작업
- [x] `backend/Data/pull_requests.json` 생성
```json
[
  { "id": 1, "title": "feat: 로그인 기능 구현", "author": "김개발", "reviewer": "이시니어", "status": "merged", "createdAt": "2024-01-03", "mergedAt": "2024-01-05", "qualityScore": 88, "comments": 4, "additions": 120, "deletions": 30 },
  { "id": 2, "title": "fix: 결제 버그 수정", "author": "박프론트", "reviewer": "김개발", "status": "merged", "createdAt": "2024-01-06", "mergedAt": "2024-01-07", "qualityScore": 92, "comments": 2, "additions": 45, "deletions": 12 },
  { "id": 3, "title": "refactor: 주문 서비스 분리", "author": "이시니어", "reviewer": "최백엔드", "status": "open", "createdAt": "2024-01-08", "mergedAt": null, "qualityScore": 76, "comments": 7, "additions": 230, "deletions": 95 },
  { "id": 4, "title": "feat: 상품 추천 API", "author": "최백엔드", "reviewer": "이시니어", "status": "open", "createdAt": "2024-01-09", "mergedAt": null, "qualityScore": 81, "comments": 3, "additions": 180, "deletions": 20 },
  { "id": 5, "title": "chore: 의존성 업그레이드", "author": "정데브옵스", "reviewer": "박프론트", "status": "closed", "createdAt": "2024-01-02", "mergedAt": null, "qualityScore": 70, "comments": 1, "additions": 15, "deletions": 15 },
  { "id": 6, "title": "feat: 알림 기능 추가", "author": "박프론트", "reviewer": "최백엔드", "status": "merged", "createdAt": "2024-01-10", "mergedAt": "2024-01-12", "qualityScore": 85, "comments": 5, "additions": 200, "deletions": 40 },
  { "id": 7, "title": "fix: 세션 만료 처리", "author": "김개발", "reviewer": "정데브옵스", "status": "merged", "createdAt": "2024-01-11", "mergedAt": "2024-01-13", "qualityScore": 90, "comments": 3, "additions": 60, "deletions": 25 },
  { "id": 8, "title": "feat: 대시보드 차트 구현", "author": "이시니어", "reviewer": "김개발", "status": "open", "createdAt": "2024-01-14", "mergedAt": null, "qualityScore": 94, "comments": 6, "additions": 310, "deletions": 10 }
]
```
- [x] `backend/Data/developers.json` 생성
```json
[
  { "id": 1, "name": "김개발", "role": "Backend", "totalPr": 12, "mergedPr": 10, "avgQuality": 89, "avgReviewHours": 18, "radar": { "speed": 85, "quality": 89, "collaboration": 92, "consistency": 87, "coverage": 80 } },
  { "id": 2, "name": "박프론트", "role": "Frontend", "totalPr": 9, "mergedPr": 7, "avgQuality": 83, "avgReviewHours": 24, "radar": { "speed": 78, "quality": 83, "collaboration": 88, "consistency": 75, "coverage": 70 } },
  { "id": 3, "name": "이시니어", "role": "Backend", "totalPr": 15, "mergedPr": 13, "avgQuality": 93, "avgReviewHours": 12, "radar": { "speed": 95, "quality": 93, "collaboration": 90, "consistency": 95, "coverage": 92 } },
  { "id": 4, "name": "최백엔드", "role": "Backend", "totalPr": 8, "mergedPr": 6, "avgQuality": 78, "avgReviewHours": 30, "radar": { "speed": 65, "quality": 78, "collaboration": 82, "consistency": 70, "coverage": 75 } },
  { "id": 5, "name": "정데브옵스", "role": "DevOps", "totalPr": 6, "mergedPr": 5, "avgQuality": 85, "avgReviewHours": 20, "radar": { "speed": 80, "quality": 85, "collaboration": 95, "consistency": 88, "coverage": 83 } }
]
```
- [x] `backend/Data/ai_insights.json` 생성
```json
[
  { "id": 1, "severity": "critical", "category": "보안", "title": "SQL Injection 취약점 감지", "description": "UserRepository.cs 에서 동적 쿼리 사용 시 파라미터 바인딩 미적용", "file": "UserRepository.cs", "line": 42, "suggestion": "SqlParameter 또는 Dapper Named Parameter 사용 권장" },
  { "id": 2, "severity": "warning", "category": "성능", "title": "N+1 쿼리 패턴 감지", "description": "OrderService.cs 에서 루프 내 반복 DB 조회 발견", "file": "OrderService.cs", "line": 87, "suggestion": "Include() 또는 별도 Batch 조회 권장" },
  { "id": 3, "severity": "warning", "category": "코드품질", "title": "중복 코드 감지", "description": "ProductController와 AdminController에 동일한 검증 로직 존재", "file": "ProductController.cs", "line": 23, "suggestion": "공통 Validator 클래스로 추출 권장" },
  { "id": 4, "severity": "info", "category": "스타일", "title": "네이밍 컨벤션 불일치", "description": "일부 변수명이 PascalCase 규칙을 따르지 않음", "file": "PaymentService.cs", "line": 15, "suggestion": "팀 컨벤션에 맞게 변수명 통일 권장" },
  { "id": 5, "severity": "critical", "category": "보안", "title": "민감 정보 하드코딩", "description": "appsettings.json에 API 키가 직접 노출됨", "file": "appsettings.json", "line": 8, "suggestion": "환경변수 또는 Secret Manager 사용 권장" },
  { "id": 6, "severity": "info", "category": "테스트", "title": "테스트 커버리지 부족", "description": "PaymentService 테스트 커버리지 42% (권장: 80% 이상)", "file": "PaymentServiceTest.cs", "line": null, "suggestion": "엣지 케이스 테스트 코드 추가 권장" }
]
```
- [x] `Models/PullRequest.cs`, `Developer.cs`, `AiInsight.cs` 생성
- [x] `Services/MockDataService.cs` - JSON 파일 읽어서 List로 반환
- [x] `Controllers/DashboardController.cs` - 4개 API 엔드포인트 구현
- [x] `http://localhost:5062/api/v1/overview` 응답 확인
- [x] 완료 후 sprint_3.md 로 이동

---

# sprints/sprint_3.md
## 목표: SCSS 디자인 시스템 + 다크모드 (1:00 ~ 1:30)

## 작업
- [x] `frontend/src/assets/styles/_variables.scss` 생성
```scss
$primary: #6366f1;
$primary-light: #818cf8;
$success: #22c55e;
$warning: #f59e0b;
$danger: #ef4444;
$info: #3b82f6;

$dark-bg: #0f172a;
$dark-surface: #1e293b;
$dark-border: #334155;
$dark-text: #f1f5f9;
$dark-text-muted: #94a3b8;

$light-bg: #f8fafc;
$light-surface: #ffffff;
$light-border: #e2e8f0;
$light-text: #0f172a;
$light-text-muted: #64748b;

$radius: 12px;
$transition: 0.3s ease;
```
- [x] `frontend/src/assets/styles/main.scss` - 전역 스타일 + CSS 변수 (다크/라이트)
- [x] `App.vue` - 다크모드 토글 로직 (localStorage 저장)
- [x] `components/common/AppHeader.vue` - 네비게이션 + 다크모드 토글 버튼
- [x] `router/index.js` - 4개 라우트 + 페이지 전환 트랜지션 설정
- [x] `App.vue` 에 fade-slide 트랜지션 적용
```vue
<router-view v-slot="{ Component }">
  <transition name="fade-slide" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
```
- [x] SCSS에 fade-slide 트랜지션 작성
- [x] 완료 후 sprint_4.md 로 이동

---

# sprints/sprint_4.md
## 목표: StatCard + 카운터 애니메이션 + Pinia 스토어 (1:30 ~ 2:00)

## 작업
- [x] `stores/dashboard.js` Pinia 스토어 생성
  - state: overview, pullRequests, developers, insights, loading
  - actions: fetchOverview, fetchPullRequests, fetchDevelopers, fetchInsights
- [x] `components/common/StatCard.vue` 생성
  - props: title, value, unit, icon, color, trend
  - 마운트 시 0 → value 카운터 애니메이션 (requestAnimationFrame)
  - trend 방향에 따라 색상 변경
- [x] `components/common/LoadingSpinner.vue` 생성
- [x] StatCard 카운터 애니메이션 동작 확인
- [x] 완료 후 sprint_5.md 로 이동

---

# sprints/sprint_5.md
## 목표: Overview 페이지 완성 (2:00 ~ 2:30)

## 작업
- [x] `views/OverviewView.vue` 완성
  - StatCard 4개 (전체 PR, 오픈, 머지, 평균 품질점수)
  - 주간 PR 추이 LineChart
  - 평균 리뷰 소요시간 GaugeChart
  - 개발자별 PR 수 BarChart
- [x] `components/charts/LineChart.vue` - ApexCharts 라인 차트
- [x] `components/charts/GaugeChart.vue` - ApexCharts 반원 게이지
- [x] API 연동 (fetchOverview, fetchPullRequests 호출)
- [x] 완료 후 sprint_6.md 로 이동

---

# sprints/sprint_6.md
## 목표: PR 목록 페이지 (2:30 ~ 3:00)

## 작업
- [x] `views/PrListView.vue` 완성
  - 상태별 필터 탭 (All / Open / Merged / Closed)
  - PR 목록 테이블 (제목, 작성자, 리뷰어, 품질점수 배지, 상태 배지, 날짜)
  - 품질점수 색상: 90↑ 초록 / 70~89 노랑 / 70↓ 빨강
  - PR 행 클릭 시 PrDetailPanel 슬라이드 오픈
- [x] `components/pr/PrDetailPanel.vue` 생성
  - 오른쪽에서 슬라이드인 패널
  - PR 상세 정보 + AI 코드 품질 분석 요약
  - ESC 키 / 바깥 클릭 시 닫기
- [x] 완료 후 sprint_7.md 로 이동

---

# sprints/sprint_7.md
## 목표: 개발자 분석 페이지 (3:00 ~ 3:30)

## 작업
- [x] `views/DeveloperView.vue` 완성
  - 개발자 카드 그리드 (이름, 역할, 총 PR, 머지율, 평균 품질점수)
  - 카드 클릭 시 상세 모달 오픈
  - 상세 모달: RadarChart + 통계 수치
- [x] `components/charts/RadarChart.vue` - ApexCharts 레이더 차트
  - 5개 축: 속도 / 품질 / 협업 / 일관성 / 커버리지
- [x] 개발자 카드 hover 애니메이션 (transform: translateY)
- [x] 완료 후 sprint_8.md 로 이동

---

# sprints/sprint_8.md
## 목표: AI 인사이트 페이지 (3:30 ~ 4:00)

## 작업
- [x] `views/InsightView.vue` 완성
  - 심각도별 탭 필터 (All / Critical / Warning / Info)
  - 인사이트 카드 리스트
    - 심각도 아이콘 + 색상 (Critical=빨강, Warning=노랑, Info=파랑)
    - 카테고리 배지, 파일명, 라인번호
    - 개선 제안 메시지
  - 카드 마운트 시 순차적 fade-in 애니메이션 (stagger 효과)
- [x] 완료 후 sprint_9.md 로 이동

---

# sprints/sprint_9.md
## 목표: 전체 UI 다듬기 + 반응형 (4:00 ~ 4:30)

## 작업
- [x] 전체 페이지 SCSS 반응형 적용 (1280px / 768px 브레이크포인트)
- [x] 다크모드 전체 페이지 검수
- [x] 페이지 전환 트랜지션 자연스럽게 조정
- [x] 로딩 스피너 모든 페이지 적용 확인
- [x] 빈 데이터 Empty State UI 처리
- [x] 전체 흐름 시연 테스트
  - Overview → PR 목록 → 상세 패널 → 개발자 분석 → AI 인사이트
- [x] 완료 후 sprint_10.md 로 이동

---

# sprints/sprint_10.md
## 목표: README + GitHub 업로드 (4:30 ~ 5:00)

## 작업
- [x] `docs/` 폴더 생성 후 화면 스크린샷 저장
- [x] README.md 스크린샷 경로 확인
- [x] `.gitignore` 확인 (node_modules, bin, obj, .env 제외)
- [x] GitHub push
```powershell
git init
git add .
git commit -m "feat: DevLens AI 코드 리뷰 대시보드 초기 구현"
git remote add origin YOUR_REPO_URL
git push -u origin main
```
- [x] GitHub 레포 README 최종 확인 후 제출
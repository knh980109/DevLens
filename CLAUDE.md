# CLAUDE.md

## 프로젝트 개요
- **프로젝트명**: DevLens - AI Code Review Dashboard
- **목표**: PR/코드 리뷰 현황을 AI 분석 기반으로 시각화하는 대시보드
- **기술 스택**: Vue3 + Vite + SCSS + ApexCharts / ASP.NET Core 9 (C#)
- **데이터**: Mock JSON (실제 DB/API 미사용)
- **포트**: Frontend 5173 / Backend 5062

## 작업 규칙
- 반드시 `sprints/` 폴더의 sprint 파일을 **순서대로** 읽고 진행할 것
- **한 번에 하나의 sprint만** 진행할 것
- 각 태스크 완료 시 해당 sprint md 체크박스 업데이트할 것
- 결과가 이상하면 즉시 멈추고 사용자에게 확인 요청할 것
- 실제 외부 API 호출 코드 작성 금지
- 민감 정보 코드에 절대 포함 금지

## 기술 선택 근거

### Frontend
| 기술 | 선택 이유 |
|------|-----------|
| Vue3 Composition API | React 대비 학습 곡선이 낮고, `<script setup>` 문법으로 코드 간결성 확보 |
| Pinia | Vuex 대비 타입 안전성·단순성 우수, Vue3 공식 권장 상태관리 |
| ApexCharts | 다양한 차트 타입(Area, Radar, RadialBar)을 단일 라이브러리로 지원, 다크모드 내장 |
| SCSS + CSS Variables | 다크/라이트 테마를 런타임 전환하기 위해 CSS Variables 필수, SCSS로 변수/중첩 관리 |
| Axios | fetch 대비 인터셉터·에러 처리 편의성, Vite proxy와 연동 최적 |

### Backend
| 기술 | 선택 이유 |
|------|-----------|
| ASP.NET Core 9 | 최신 LTS, 내장 DI·미들웨어·JSON 직렬화로 별도 설정 최소화 |
| Swashbuckle Swagger | 컨트롤러 어트리뷰트 기반 자동 문서화, 팀 API 계약 명확화 |
| Mock JSON | 해커톤 시간 제약 상 실제 DB 불필요, 런타임 파일 읽기로 데이터 수정 용이 |

## 프로젝트 구조
```
DevLens/
├── CLAUDE.md               # AI 컨텍스트 문서 (이 파일)
├── PRD.md                  # 제품 요구사항 문서
├── README.md               # 프로젝트 소개 및 실행 가이드
├── TESTING.md              # 테스트 전략 문서
├── .github/workflows/      # GitHub Actions CI/CD
│   └── ci.yml
├── backend/                # ASP.NET Core 9
│   ├── Controllers/
│   │   └── DashboardController.cs  # 4개 REST 엔드포인트
│   ├── Services/
│   │   └── MockDataService.cs      # JSON 파일 파싱 및 집계
│   ├── Models/
│   │   ├── PullRequest.cs
│   │   ├── Developer.cs
│   │   └── AiInsight.cs
│   ├── Data/
│   │   ├── pull_requests.json      # 25개 PR Mock 데이터
│   │   ├── developers.json         # 7명 개발자 Mock 데이터
│   │   └── ai_insights.json        # 12개 AI 인사이트 Mock 데이터
│   └── Program.cs                  # CORS, Swagger, DI 설정
└── frontend/               # Vue3 + Vite
    └── src/
        ├── App.vue                 # 루트: 다크모드 provide, 라우터 트랜지션
        ├── main.js                 # Pinia, Vue Router 등록
        ├── assets/styles/
        │   ├── _variables.scss     # 색상·반경·전환 SCSS 변수
        │   └── main.scss           # CSS Variables (다크/라이트), 전역 스타일
        ├── components/
        │   ├── common/
        │   │   ├── AppHeader.vue   # 네비게이션 + 다크모드 토글
        │   │   ├── StatCard.vue    # rAF 카운터 애니메이션 카드
        │   │   └── LoadingSpinner.vue
        │   ├── charts/
        │   │   ├── LineChart.vue   # ApexCharts Area 차트
        │   │   ├── GaugeChart.vue  # ApexCharts RadialBar 게이지
        │   │   └── RadarChart.vue  # ApexCharts Radar 차트
        │   └── pr/
        │       └── PrDetailPanel.vue  # 우측 슬라이드 패널 (ESC/외부클릭 닫기)
        ├── views/
        │   ├── OverviewView.vue    # 6 KPI 카드 + 4개 차트
        │   ├── PrListView.vue      # 필터 탭 + 테이블 + 슬라이드 패널
        │   ├── DeveloperView.vue   # 카드 그리드 + 레이더 모달
        │   └── InsightView.vue     # 심각도 필터 + stagger 카드
        ├── stores/
        │   └── dashboard.js        # Pinia: 4개 fetch 액션, loading 상태
        └── router/
            └── index.js            # 4개 라우트 + lazy loading
```

## API 목록
| Method | URL | 설명 | 응답 예시 |
|--------|-----|------|-----------|
| GET | /api/v1/overview | 메인 통계 + 차트 데이터 | totalPr, weeklyPrData, qualityTrend 등 |
| GET | /api/v1/pull-requests | PR 목록 전체 | 25개 PR 배열 |
| GET | /api/v1/developers | 개발자 목록 | 7명, radar 데이터 포함 |
| GET | /api/v1/insights | AI 인사이트 | 12개, severity/category 포함 |

## 코딩 컨벤션
- Vue 컴포넌트: PascalCase
- SCSS 변수: `$kebab-case`
- C# 클래스: PascalCase, 메서드: PascalCase, 지역변수: camelCase
- API 경로: `/api/v1/...`
- 커밋: `feat:` `fix:` `docs:` `chore:` `refactor:` 컨벤션 준수

## 개발 중 주요 결정사항 및 이슈 기록

### 결정사항

**[결정 1] Spring Boot → ASP.NET Core 전환**
- 배경: CLAUDE.md 초안에 Spring Boot로 명시되어 있었으나, 개발 환경에 .NET 9 SDK가 설치되어 있고 JDK가 없었음
- 결정: ASP.NET Core 9 WebAPI로 전환. REST API 구조, JSON 직렬화, CORS 설정 방식이 유사하여 PRD 요구사항 충족에 문제 없음
- 영향: Models → C# record/class, MockDataService → IWebHostEnvironment 주입 방식으로 구현

**[결정 2] 다크모드 구현 방식: CSS Variables + data-theme 어트리뷰트**
- 배경: SCSS 변수만으로는 런타임 테마 전환 불가
- 결정: `document.documentElement.setAttribute('data-theme', 'dark')` 방식 채택, CSS Variables로 색상 재정의
- 장점: JavaScript 로직 최소화, CSS 전환 애니메이션 자연스럽게 적용

**[결정 3] StatCard 카운터 애니메이션: requestAnimationFrame 사용**
- 배경: `setInterval` 방식은 탭 비활성 시 배터리 낭비 및 불규칙 동작 문제
- 결정: `requestAnimationFrame` + cubic easing (1 - (1-t)³) 적용
- 결과: 60fps 부드러운 카운터 애니메이션 구현

**[결정 4] PrDetailPanel: Teleport to body 사용**
- 배경: 중첩된 컴포넌트 내에서 z-index 스택 충돌 문제 예상
- 결정: Vue3 `<Teleport to="body">` 로 DOM 최상위에 렌더링
- 결과: z-index 충돌 없이 오버레이 정상 동작

### 발생한 이슈 및 해결

**[이슈 1] 백엔드 포트 불일치**
- 현상: launchSettings.json 기본 포트가 5062가 아닌 5098로 설정됨
- 원인: .NET webapi 템플릿이 랜덤 포트 할당
- 해결: launchSettings.json의 applicationUrl을 `http://localhost:5062`로 수정

**[이슈 2] Swashbuckle 패키지 미포함**
- 현상: `dotnet new webapi --no-openapi` 옵션으로 생성 시 Swagger 패키지 없음
- 해결: `dotnet add package Swashbuckle.AspNetCore` 추가

**[이슈 3] ApexCharts 다크모드 테마 동기화**
- 현상: 페이지 진입 시 차트 테마가 초기 다크모드 상태와 불일치
- 원인: `chartOptions`의 theme.mode가 컴포넌트 초기화 시점에 한 번만 계산됨
- 해결: `computed`에서 매번 `document.documentElement.getAttribute('data-theme')` 실시간 조회

**[이슈 4] SCSS `@use` vs `@import` 충돌**
- 현상: `@import` 사용 시 Vite/Sass deprecation 경고
- 해결: `@use 'variables' as *` 방식으로 전환

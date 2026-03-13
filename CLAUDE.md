# CLAUDE.md

## 프로젝트 개요
- **프로젝트명**: DevLens - AI Code Review Dashboard
- **목표**: PR/코드 리뷰 현황을 AI 분석 기반으로 시각화하는 대시보드
- **기술 스택**: Vue3 + Vite + SCSS + ApexCharts / Spring Boot 3 (Java)
- **데이터**: Mock JSON (실제 DB/API 미사용)

## 작업 규칙
- 반드시 `sprints/` 폴더의 sprint 파일을 **순서대로** 읽고 진행할 것
- **한 번에 하나의 sprint만** 진행할 것
- 각 태스크 완료 시 해당 sprint md 체크박스 업데이트할 것
- 결과가 이상하면 즉시 멈추고 사용자에게 확인 요청할 것
- 실제 외부 API 호출 코드 작성 금지
- 민감 정보 코드에 절대 포함 금지

## 프로젝트 구조
```
DevLens/
├── CLAUDE.md
├── PRD.md
├── README.md
├── backend/                          # Spring Boot
│   ├── src/main/java/com/devlens/
│   │   ├── controller/
│   │   │   └── DashboardController.java
│   │   ├── service/
│   │   │   └── MockDataService.java
│   │   └── model/
│   │       ├── PullRequest.java
│   │       ├── Developer.java
│   │       └── AiInsight.java
│   └── src/main/resources/
│       ├── application.yml
│       └── mock/
│           ├── pull_requests.json
│           ├── developers.json
│           └── ai_insights.json
└── frontend/                         # Vue3
    ├── src/
    │   ├── assets/styles/
    │   │   ├── _variables.scss       # 색상/폰트 변수
    │   │   ├── _dark.scss            # 다크모드
    │   │   └── main.scss
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── AppHeader.vue
    │   │   │   ├── StatCard.vue      # 카운터 애니메이션 카드
    │   │   │   └── LoadingSpinner.vue
    │   │   ├── charts/
    │   │   │   ├── LineChart.vue
    │   │   │   ├── RadarChart.vue
    │   │   │   └── GaugeChart.vue
    │   │   └── pr/
    │   │       └── PrDetailPanel.vue # 슬라이드 패널
    │   ├── views/
    │   │   ├── OverviewView.vue
    │   │   ├── PrListView.vue
    │   │   ├── DeveloperView.vue
    │   │   └── InsightView.vue
    │   ├── router/index.js
    │   ├── stores/dashboard.js       # Pinia
    │   └── App.vue
    └── vite.config.js
```

## 코딩 컨벤션
- Vue 컴포넌트: PascalCase
- SCSS 변수: `$kebab-case`
- Java 클래스: PascalCase, 메서드: camelCase
- API 경로: `/api/v1/...`

## API 목록
| Method | URL | 설명 |
|--------|-----|------|
| GET | /api/v1/overview | 메인 통계 |
| GET | /api/v1/pull-requests | PR 목록 |
| GET | /api/v1/developers | 개발자 목록 |
| GET | /api/v1/insights | AI 인사이트 |

## 시작 방법
sprint_1.md 를 읽고 시작하라.
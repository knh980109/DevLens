<div align="center">

# 🔍 DevLens

### AI-Powered Code Review Dashboard

**PR 현황 · 코드 품질 · 개발자 분석 · AI 인사이트**를 한 화면에서

<br/>

![Vue3](https://img.shields.io/badge/Vue3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core_9-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![ApexCharts](https://img.shields.io/badge/ApexCharts-00B1CC?style=for-the-badge&logo=apexcharts&logoColor=white)

</div>

---

## 📸 스크린샷

> 🌙 다크모드 / ☀️ 라이트모드 모두 지원

| Overview | PR 목록 |
|:---:|:---:|
| ![Overview](docs/overview.png) | ![PR List](docs/pr-list.png) |

| 개발자 분석 | AI 인사이트 |
|:---:|:---:|
| ![Developer](docs/developer.png) | ![Insights](docs/insights.png) |

---

## ✨ 주요 기능

### 📊 Overview 대시보드
- **6개 KPI 카드** — 전체·오픈·머지·클로즈 PR, 평균 품질점수, 평균 리뷰시간
- **수치 카운터 애니메이션** — 마운트 시 0에서 목표값까지 easing 애니메이션
- **주간 PR 추이** — 전체 PR vs 머지 PR 11주 Area 차트
- **코드 품질 트렌드** — 주간 품질점수 라인 차트 (목표 기준선 표시)
- **개발자별 PR 현황** — Grouped Bar 차트

### 📋 PR 목록
- **상태 필터 탭** — All / Open / Merged / Closed 실시간 필터링
- **품질점수 배지** — 90↑ 🟢 / 70~89 🟡 / 70↓ 🔴 색상 구분
- **슬라이드 디테일 패널** — 클릭 시 우측에서 슬라이드인, AI 품질 분석 포함
- ESC 키 / 바깥 영역 클릭으로 닫기

### 👥 개발자 분석
- **카드 그리드** — 이름, 역할, PR 수, 머지율, 평균 품질점수
- **Hover 애니메이션** — translateY 리프트 효과
- **레이더 차트 모달** — 속도·품질·협업·일관성·커버리지 5축 분석

### 🤖 AI 인사이트
- **심각도 필터** — Critical 🔴 / Warning 🟡 / Info 🔵
- **스태거 애니메이션** — 카드 순차 fade-in
- 파일명·라인번호·개선 제안 메시지 포함

### 🎨 UX/UI
- **다크모드** — 시스템 설정 자동 감지, `localStorage` 저장
- **페이지 전환** — fade-slide 트랜지션
- **반응형** — 1280px / 768px 브레이크포인트

---

## 🏗️ 아키텍처

```
DevLens/
├── frontend/               # Vue3 + Vite
│   └── src/
│       ├── views/          # 4개 페이지 뷰
│       ├── components/
│       │   ├── common/     # StatCard, AppHeader, LoadingSpinner
│       │   ├── charts/     # LineChart, GaugeChart, RadarChart
│       │   └── pr/         # PrDetailPanel
│       ├── stores/         # Pinia 상태관리
│       ├── router/         # Vue Router
│       └── assets/styles/  # SCSS 디자인 시스템
│
└── backend/                # ASP.NET Core 9
    ├── Controllers/        # DashboardController (4개 엔드포인트)
    ├── Services/           # MockDataService
    ├── Models/             # PullRequest, Developer, AiInsight
    └── Data/               # Mock JSON 데이터
```

---

## 🚀 시작하기

### 요구사항

| 도구 | 버전 |
|------|------|
| Node.js | 18+ |
| .NET SDK | 9.x |

### 실행

```bash
# 1. 저장소 클론
git clone https://github.com/YOUR_USERNAME/DevLens.git
cd DevLens

# 2. 백엔드 실행 (터미널 1)
cd backend
dotnet run
# → http://localhost:5062

# 3. 프론트엔드 실행 (터미널 2)
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

브라우저에서 **http://localhost:5173** 접속

---

## 📡 API 엔드포인트

| Method | URL | 설명 |
|--------|-----|------|
| `GET` | `/api/v1/overview` | 메인 통계 + 차트 데이터 |
| `GET` | `/api/v1/pull-requests` | PR 목록 (25건) |
| `GET` | `/api/v1/developers` | 개발자 목록 (7명) |
| `GET` | `/api/v1/insights` | AI 인사이트 (12건) |

Swagger UI: **http://localhost:5062/swagger**

---

## 🛠️ 기술 스택

| 분류 | 기술 | 용도 |
|------|------|------|
| **Frontend** | Vue 3 + Composition API | UI 프레임워크 |
| | Vite 8 | 빌드 툴 |
| | Pinia | 상태 관리 |
| | Vue Router 4 | 라우팅 |
| | ApexCharts + vue3-apexcharts | 차트 |
| | SCSS + CSS Variables | 스타일 / 다크모드 |
| | Axios | HTTP 클라이언트 |
| **Backend** | ASP.NET Core 9 | REST API 서버 |
| | Swashbuckle (Swagger) | API 문서화 |
| **데이터** | Mock JSON | 실제 DB 미사용 |

---

## 📌 참고 사항

- 실제 GitHub API / AI 모델 연동 없음 (Mock 데이터로 대체)
- 사용자 인증/로그인 기능 미포함
- 포트폴리오·데모 목적 프로젝트

---

<div align="center">

Made with ❤️ by DevLens Team

</div>

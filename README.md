<div align="center">

# DevLens

### GC메디아이 개발팀 AI 코드 리뷰 대시보드

**PR 현황 · 코드 품질 · 개발자 분석 · AI 인사이트**를 한 화면에서 — 의료IT 개발 사이클에 최적화

<br/>

![Vue3](https://img.shields.io/badge/Vue3-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core_9-512BD4?style=flat-square&logo=dotnet&logoColor=white)

[![CI](https://github.com/knh980109/DevLens/actions/workflows/ci.yml/badge.svg)](https://github.com/knh980109/DevLens/actions/workflows/ci.yml)
[![CD](https://github.com/knh980109/DevLens/actions/workflows/cd.yml/badge.svg)](https://github.com/knh980109/DevLens/actions/workflows/cd.yml)
![Tests](https://img.shields.io/badge/Tests-21%20passed-brightgreen?style=flat-square)
![Coverage](https://img.shields.io/badge/Coverage-84.78%25-brightgreen?style=flat-square)

<br/>

### 🌐 [라이브 데모 → knh980109.github.io/DevLens](https://knh980109.github.io/DevLens/)

> 백엔드 없이 Mock 데이터로 모든 기능 동작 · 별도 설치 불필요

</div>

---

## 💡 왜 DevLens인가

유비케어(현 **GC메디아이**)의 개발팀은 EMR, 보험청구, HL7·FHIR 인터페이스, 환자포털 등
**의료 도메인 특화 시스템**을 동시에 유지·개발합니다.

PR 하나에 `환자 개인정보`, `보험청구 로직`, `외부 기관 연동 프로토콜`이 뒤섞이는 환경에서
기존 GitHub PR 화면만으로는 팀 전체의 **코드 품질 흐름과 리스크**를 파악하기 어렵습니다.

**DevLens**는 이 문제를 해결합니다.

| 기존 방식 | DevLens |
|-----------|---------|
| GitHub PR 목록 수동 확인 | 상태별 필터 + 품질점수 자동 배지 |
| 개인별 리뷰 속도 체감 | 레이더 차트로 7명 개발자 역량 시각화 |
| 보안 이슈 코드리뷰 중 발견 | AI 인사이트로 Critical 항목 선제 탐지 |
| 주간 회의에서 구두 공유 | 11주 추이 차트로 데이터 기반 회고 |

---

## ✨ 주요 기능

### 📊 Overview 대시보드
- **6개 KPI 카드** — 전체·오픈·머지·클로즈 PR, 평균 품질점수, 평균 리뷰시간
- **수치 카운터 애니메이션** — 마운트 시 0에서 목표값까지 `requestAnimationFrame` + cubic easing
- **주간 PR 추이** — 11주 전체 PR vs 머지 PR Area 차트
- **코드 품질 트렌드** — 주간 품질점수 라인 차트 (목표 기준선 표시)
- **개발자별 PR 현황** — Grouped Bar 차트

### 📋 PR 목록 (의료IT 실무 반영)
- **상태 필터** — All / Open / Merged / Closed 실시간 필터링
- **품질점수 배지** — 90↑ 🟢 / 70~89 🟡 / 70↓ 🔴 색상 구분 (`qualityClass` 순수 함수)
- **슬라이드 디테일 패널** — 클릭 시 우측 슬라이드, AI 품질 분석 포함, ESC/외부클릭 닫기
- EMR·OCS·FHIR·EDI·HL7 등 실무 PR 시나리오 25건 수록

### 👥 개발자 분석
- **카드 그리드** — 역할(EMR/보험청구/인터페이스/DevOps/보안), PR 수, 머지율, 평균 품질점수
- **레이더 차트 모달** — 속도·품질·협업·일관성·커버리지 5축 분석

### 🤖 AI 인사이트 (의료 도메인 특화)
- **Critical** — 환자 개인정보 SQL Injection, 보험청구 API 키 노출, 진료기록 권한 미검증
- **Warning** — N+1 쿼리, EDI 전송 예외처리 미흡, 청구 검증 로직 중복
- **Info** — 테스트 커버리지 미달, Magic Number, FHIR 엔드포인트 문서 누락
- 파일명·라인번호·의료 도메인 맥락 포함 개선 제안

### 🎨 UX/UI
- **GC메디아이 브랜드** — GC그룹 그린(`#00965E`) 기반 디자인 시스템
- **다크모드** — CSS Variables 기반 런타임 전환, `localStorage` 저장
- **페이지 전환** — fade-slide 트랜지션
- **API 에러 처리** — Mock fallback + 4개 뷰 상단 배너 알림

---

## 🆚 GitHub 기본 PR 뷰와의 차별점

| 관점 | GitHub 기본 PR 뷰 | DevLens |
|------|-------------------|---------|
| **데이터 범위** | 개별 PR 단위 확인 | 팀 전체 11주 추이 한눈에 파악 |
| **코드 품질** | 수동 코드리뷰에 의존 | AI 인사이트로 Critical/Warning/Info 자동 분류 |
| **개발자 분석** | 커밋 히스토리 수동 분석 | 속도·품질·협업·일관성·커버리지 레이더 차트 |
| **의료 도메인** | 범용 UI, 도메인 무관 | EMR·OCS·FHIR·EDI·보험청구 실무 시나리오 반영 |
| **접근성** | GitHub 계정·권한 필요 | GitHub Pages에서 즉시 실행, 설치 불필요 |
| **보안 알림** | PR 코멘트 기반 | 환자 개인정보·진료기록 특화 취약점 우선순위화 |
| **KPI 시각화** | 수치 없음 | 6개 KPI 카드 + 4개 차트 대시보드 |

---

## ✅ 검증 및 테스트

### 단위 테스트 결과 (Vitest)

```
 Test Files   3 passed (3)
 Tests        21 passed (21)
 Duration     2.26s
```

| 테스트 파일 | 테스트 수 | 내용 |
|------------|----------|------|
| `stores/__tests__/dashboard.test.ts` | 13건 | Pinia 스토어 — API 성공/실패, loading 상태, AxiosError 처리, Mock fallback |
| `components/common/__tests__/StatCard.test.ts` | 7건 | rAF 애니메이션, trend 방향, unit prop, color 스타일 |
| `utils/__tests__/quality.test.ts` | 3건 | qualityClass 경계값 (90↑ high, 70~89 mid, 70↓ low) |

### 커버리지 리포트 (`npm run test:coverage`)

| 지표 | 수치 | 비고 |
|------|------|------|
| **Statements** | **84.78%** | |
| **Lines** | **88.37%** | |
| **Functions** | **79.16%** | |
| **Branches** | **43.24%** | |
| `stores/dashboard.ts` | **100% / 100% / 100% / 100%** | 핵심 비즈니스 로직 완전 커버 |
| `utils/quality.ts` | **100% / 100% / 100% / 100%** | 순수 함수 완전 커버 |
| `mock/overview.ts` | **100% / 100% / 100% / 100%** | |

> ApexCharts 래퍼 컴포넌트(GaugeChart, LineChart, RadarChart)는 서드파티 UI 라이브러리 특성상 커버리지 대상 제외

커버리지 리포트 파일: [`frontend/coverage/index.html`](frontend/coverage/index.html)

### E2E 테스트 시나리오 (Playwright)

| # | 시나리오 | 검증 항목 |
|---|----------|----------|
| 1 | Overview 기본 렌더링 | `.stat-card` 6개, `.chart-card` 1개 이상 존재 |
| 2 | PR 목록 페이지 이동 | `nav-pr-list` 클릭 → `.pr-table` 렌더링 |
| 3 | PR 슬라이드 패널 오픈 | `.pr-row` 클릭 → `.panel` 가시 |
| 4 | ESC 키로 패널 닫기 | `Escape` 입력 → `.panel` 비가시 |
| 5 | 다크모드 토글 | `.theme-toggle` 클릭 → `data-theme="dark"` |
| 6 | 다크모드 재토글 | 다시 클릭 → `data-theme="light"` |
| 7 | 개발자 페이지 이동 | `nav-developers` 클릭 → `.dev-card` 존재 |
| 8 | AI 인사이트 페이지 이동 | `nav-insights` 클릭 → `.insight-card` 존재 |

E2E 테스트는 **GitHub Actions CI 환경(Ubuntu)** 에서 실행되며, 결과 리포트는 Actions Artifacts에서 확인 가능합니다.

---

## 🔄 CI/CD 파이프라인

### CI — 테스트 + 빌드 자동화 (`ci.yml`)

```
push / PR → main
│
├── [1] unit-test (Ubuntu)
│     ├── npm ci
│     ├── npm run test:coverage       ← 21건 통과, 커버리지 84%+
│     └── 📦 Artifact: coverage-report (7일 보관)
│
├── [2] build-frontend (needs: unit-test)
│     ├── npm run build
│     └── TypeScript 타입 오류 없음 확인
│
├── [3] e2e-test (needs: build-frontend)
│     ├── npx playwright install --with-deps chromium
│     ├── npm run test:e2e             ← 8개 시나리오 실행
│     └── 📦 Artifact: playwright-report (7일 보관, 항상 업로드)
│
└── [4] build-backend (병렬)
      ├── dotnet restore
      └── dotnet build --configuration Release
```

### CD — GitHub Pages 배포 (`cd.yml`)

```
push → main
│
└── deploy (Ubuntu)
      ├── npm run build
      ├── vite base: '/DevLens/' 적용
      └── 🚀 GitHub Pages 자동 배포
            → https://knh980109.github.io/DevLens/
```

**CI 실행 결과 확인:** [GitHub Actions → CI](https://github.com/knh980109/DevLens/actions/workflows/ci.yml)

---

## 📐 반응형 디자인

### 지원 브레이크포인트

| 환경 | 브레이크포인트 | 레이아웃 변화 |
|------|--------------|-------------|
| **데스크탑** | 1280px 이상 | KPI 카드 3열, 차트 2열 그리드 |
| **태블릿** | 768px ~ 1279px | KPI 카드 2열, 차트 1열 스택 |
| **모바일** | 768px 미만 | 1열 단일 컬럼, 테이블 스크롤 |

### 핵심 반응형 코드

```scss
// OverviewView — KPI 카드 그리드
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  // 데스크탑: 3열

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);  // 태블릿: 2열
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;  // 모바일: 1열
  }
}

// 차트 그리드
.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// LineChart — 뷰포트 너비에 따른 높이 조정
// 1280px 이상: height 300px / 768px 이하: height 220px
```

---

## 🏗️ 아키텍처

```
DevLens/
├── frontend/                   # Vue3 + Vite + TypeScript
│   └── src/
│       ├── types/index.ts      # PullRequest, Developer, AiInsight, Overview 타입
│       ├── views/              # OverviewView, PrListView, DeveloperView, InsightView
│       ├── components/
│       │   ├── common/         # StatCard (rAF 애니메이션), AppHeader, LoadingSpinner
│       │   ├── charts/         # LineChart, GaugeChart, RadarChart (ApexCharts)
│       │   └── pr/             # PrDetailPanel (Teleport, ESC/외부클릭 닫기)
│       ├── stores/dashboard.ts # Pinia: 4개 fetch 액션, AxiosError 로깅, Mock fallback
│       ├── utils/quality.ts    # qualityClass 순수 함수 (100% 커버리지)
│       ├── router/index.ts     # hash mode (prod) / history mode (dev)
│       └── assets/styles/      # SCSS + CSS Variables (다크/라이트 테마)
│
├── backend/                    # ASP.NET Core 9 WebAPI
│   ├── Controllers/            # DashboardController (4개 엔드포인트)
│   ├── Services/               # MockDataService (IWebHostEnvironment 주입)
│   ├── Models/                 # C# record 타입 (Null 안전성)
│   └── Data/                   # 의료IT Mock JSON (25 PR, 7 개발자, 12 인사이트)
│
└── .github/workflows/
    ├── ci.yml                  # 4 jobs: unit-test → build → e2e → backend
    └── cd.yml                  # GitHub Pages 정적 배포
```

### 에러 처리 흐름

```
API 호출 실패
    │
    ├── Pinia store catch
    │     ├── console.warn('[DevLens] {action} API 실패 — Mock fallback. ([STATUS] message)')
    │     ├── store.errors[key] = '에러 메시지'
    │     └── Mock JSON 데이터로 자동 전환
    │
    └── Vue 뷰 레이어
          └── v-if="store.errors[key]" → .api-error-banner 표시
                 (4개 뷰 전체 적용 — 빈 화면 없음 보장)
```

---

## 🚀 시작하기

### 바로 보기 (설치 불필요)

**👉 https://knh980109.github.io/DevLens/**

GitHub Pages로 배포된 라이브 데모입니다. Mock 데이터 기반으로 백엔드 없이 모든 기능이 동작합니다.

### 로컬 실행 (풀스택)

**요구사항**

| 도구 | 버전 |
|------|------|
| Node.js | 18+ |
| .NET SDK | 9.x |

```bash
# 1. 저장소 클론
git clone https://github.com/knh980109/DevLens.git
cd DevLens

# 2. 백엔드 실행 (터미널 1)
cd backend
dotnet run
# → http://localhost:5062
# → Swagger: http://localhost:5062/swagger

# 3. 프론트엔드 실행 (터미널 2)
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### 테스트 실행

```bash
cd frontend

# 단위 테스트 (21건)
npm test

# 커버리지 리포트
npm run test:coverage
# → frontend/coverage/index.html 에서 상세 확인

# E2E 테스트 (Playwright)
npm run test:e2e
```

---

## 📡 API 엔드포인트

| Method | URL | 설명 | 응답 |
|--------|-----|------|------|
| `GET` | `/api/v1/overview` | 메인 통계 + 11주 차트 데이터 | Overview 객체 |
| `GET` | `/api/v1/pull-requests` | 의료IT PR 목록 | PullRequest[] (25건) |
| `GET` | `/api/v1/developers` | 개발자 목록 + 레이더 데이터 | Developer[] (7명) |
| `GET` | `/api/v1/insights` | AI 인사이트 | AiInsight[] (12건) |

Swagger UI: **http://localhost:5062/swagger**

---

## 🛠️ 기술 스택

| 분류 | 기술 | 선택 근거 |
|------|------|-----------|
| **Frontend** | Vue 3 + Composition API | `<script setup lang="ts">` 문법으로 코드 간결성 확보, 의료 포털 컴포넌트 구조에 적합 |
| | TypeScript (완전 적용) | 전체 `.ts`·`.vue` 파일 타입 안전성, `vite-env.d.ts` 모듈 선언 포함 |
| | Pinia | Vuex 대비 타입 추론 용이, 도메인별 스토어 분리 (`errors` 상태 포함) |
| | ApexCharts | Area/RadialBar/Radar/Bar 단일 라이브러리 지원, 다크모드 내장 |
| | SCSS + CSS Variables | 브랜드 색상 일관성 + 런타임 다크모드 전환 |
| **Backend** | ASP.NET Core 9 | TechEmpower 기준 Spring Boot 대비 처리량 2~3배, C# record로 불변 DTO, 내장 DI |
| | Swashbuckle Swagger | API 문서 자동화 (외부 연동 병원 대응) |
| **테스트** | Vitest + @vue/test-utils | 단위 21건 통과, 핵심 모듈 100% 커버리지 |
| | Playwright | E2E 8개 시나리오, CI에서 chromium 자동 설치 후 실행 |
| **CI/CD** | GitHub Actions | 4 jobs (unit-test → build → e2e → backend), 커버리지·E2E 아티팩트 업로드 |
| **배포** | GitHub Pages | 프론트엔드 정적 빌드 자동 배포, hash 라우터 적용 |

---

## 🏥 GC메디아이 연관 실무 시나리오

DevLens의 Mock 데이터는 실제 의료IT 개발 환경을 반영합니다.

| 도메인 | 시나리오 예시 |
|--------|--------------|
| **EMR** | 환자 기본정보 API 캐싱, 진단코드(KCD-8) 자동완성 |
| **보험청구** | EDI 파싱 오류 수정, 심사청구 자동화 배치 |
| **OCS** | 처방전달 응답 지연 개선, 수납 이중처리 방지 |
| **HL7·FHIR** | 원외처방전 FHIR R4 변환, HL7 메시지 파서 리팩터링 |
| **원무** | 접수창구 실시간 대기현황 WebSocket, 진료비 엑셀 다운로드 |
| **보안** | 환자 개인정보 XSS 필터링, 개인정보 마스킹 |
| **인프라** | Kubernetes 헬스체크, 무중단 배포 CI/CD |

---

## 📌 참고 사항

- 실제 GitHub API / AI 모델 연동 없음 (Mock 데이터로 대체)
- 실제 환자 개인정보(PHI) 미포함 — 데모·포트폴리오 목적
- 사용자 인증/로그인 기능 미포함

---

<div align="center">

**GC메디아이** 개발팀의 더 나은 코드 리뷰 문화를 위해

Made with ❤️ · [DevLens Team](https://github.com/knh980109/DevLens)

</div>

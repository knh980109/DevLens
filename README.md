<div align="center">

# 🔍 DevLens

### GC메디아이 의료IT 개발팀 AI 코드 리뷰 대시보드

> EMR·보험청구·FHIR 등 도메인 특화 PR을 AI 인사이트·레이더 차트·11주 추이로 시각화하여
> GitHub 기본 PR 뷰 대비 팀 코드 품질 리스크를 **한눈에 파악**하는 대시보드

<br/>

![Vue3](https://img.shields.io/badge/Vue_3-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core_9-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logo=vue.js&logoColor=black)

<br/>

[![CI](https://github.com/knh980109/DevLens/actions/workflows/ci.yml/badge.svg)](https://github.com/knh980109/DevLens/actions/workflows/ci.yml)
[![CD](https://github.com/knh980109/DevLens/actions/workflows/cd.yml/badge.svg)](https://github.com/knh980109/DevLens/actions/workflows/cd.yml)
![Tests](https://img.shields.io/badge/단위_테스트-21_passed-brightgreen?style=flat-square&logo=vitest)
![E2E](https://img.shields.io/badge/E2E-8_scenarios-brightgreen?style=flat-square&logo=playwright)
![Coverage](https://img.shields.io/badge/커버리지-84.78%25-brightgreen?style=flat-square)

<br/>

### 🌐 [라이브 데모 바로 보기 → knh980109.github.io/DevLens](https://knh980109.github.io/DevLens/)

**설치 불필요 · Mock 데이터 · 모든 기능 즉시 동작**

</div>

---

## ⚡ 30초 데모 시나리오

심사자가 라이브 데모([knh980109.github.io/DevLens](https://knh980109.github.io/DevLens/))에서 바로 확인할 수 있는 핵심 흐름입니다.

```
① Overview 진입
   → 6개 KPI 카드가 0에서 목표값으로 카운터 애니메이션
   → 11주 PR 추이 + 품질 트렌드 + 개발자별 현황 차트 4개 확인

② PR 목록 클릭
   → 25건의 EMR·FHIR·보험청구 실무 PR 목록 표시
   → 품질점수 배지(🟢/🟡/🔴) 한눈에 파악
   → PR 행 클릭 → 우측 슬라이드 패널 + AI 코드 품질 분석

③ 개발자 분석 클릭
   → 7명 카드에서 역할·머지율·품질점수 확인
   → 카드 클릭 → 레이더 차트 모달 (속도/품질/협업/일관성/커버리지)

④ AI 인사이트 클릭
   → Critical: 환자 개인정보 SQL Injection, 진료기록 권한 미검증
   → Warning/Info 필터 탭으로 전환

⑤ 다크모드 토글
   → 우상단 버튼 클릭 → 무채색 다크 테마 전환 (CSS Variables)
```

---

## 💡 왜 DevLens인가

유비케어(현 **GC메디아이**)의 개발팀은 EMR, 보험청구, HL7·FHIR 인터페이스, 환자포털 등
**의료 도메인 특화 시스템**을 동시에 유지·개발합니다.

PR 하나에 `환자 개인정보`, `보험청구 로직`, `외부 기관 연동 프로토콜`이 뒤섞이는 환경에서
기존 GitHub PR 화면만으로는 팀 전체의 **코드 품질 흐름과 리스크를 한눈에 파악하기 어렵습니다.**

| 기존 방식 (GitHub PR 뷰) | DevLens |
|--------------------------|---------|
| PR 목록 수동 확인 | 상태별 필터 + 품질점수 자동 배지 |
| 개인별 리뷰 속도 체감 | 레이더 차트로 7명 개발자 역량 시각화 |
| 보안 이슈 코드리뷰 중 발견 | AI 인사이트로 Critical 항목 **선제 탐지** |
| 주간 회의 구두 공유 | 11주 추이 차트로 **데이터 기반 회고** |
| GitHub 계정·권한 필요 | GitHub Pages에서 즉시 실행, 설치 불필요 |

---

## ✨ 주요 기능

### 📊 Overview 대시보드
- **6개 KPI 카드** — 전체·오픈·머지·클로즈 PR, 평균 품질점수, 평균 리뷰시간
- **카운터 애니메이션** — `requestAnimationFrame` + cubic easing (60fps)
- **주간 PR 추이** — 11주 Area 차트 (전체 vs 머지 PR)
- **코드 품질 트렌드** — 목표 기준선(85점) 포함 라인 차트
- **개발자별 PR 현황** — Grouped Bar 차트

### 📋 PR 목록
- **상태 필터** — All / Open / Merged / Closed 실시간
- **품질점수 배지** — 90↑🟢 / 70~89🟡 / 70↓🔴 (`qualityClass` 순수 함수, 100% 테스트)
- **슬라이드 디테일 패널** — ESC / 외부클릭 닫기, Vue `<Teleport>` 적용
- 의료IT 실무 PR 시나리오 **25건** (EMR/OCS/FHIR/EDI/HL7)

### 👥 개발자 분석
- **역할 카드** — EMR/보험청구/인터페이스/DevOps/보안 담당자 7명
- **레이더 차트 모달** — 속도·품질·협업·일관성·커버리지 5축

### 🤖 AI 인사이트 (의료 도메인 특화)
- **Critical** — 환자 개인정보 SQL Injection, 보험청구 API 키 노출, 진료기록 권한 미검증
- **Warning** — N+1 쿼리, EDI 전송 예외처리 미흡
- **Info** — 테스트 커버리지 미달, FHIR 엔드포인트 문서 누락
- 파일명·라인번호·의료 도메인 맥락 포함 개선 제안

### 🎨 UX / 접근성
- **GC메디아이 브랜드** — GC그룹 그린(`#00965E`) 포인트 컬러
- **다크모드** — CSS Variables 런타임 전환, `localStorage` 저장
- **반응형** — 1280px / 768px 브레이크포인트 (데스크탑 → 태블릿 → 모바일)
- **API 에러 처리** — Mock fallback 자동 전환 + 4개 뷰 배너 알림

---

## ✅ 검증 및 테스트 (Verification & Testing)

### 단위 테스트 실행 결과 (Vitest)

```
 RUNS  frontend/

 Test Files  3 passed (3)
 Tests       21 passed (21)
 Duration    2.26s (transform 280ms, setup 0ms, import 805ms, tests 33ms)
```

| 테스트 파일 | 건수 | 검증 내용 |
|------------|:----:|-----------|
| `stores/__tests__/dashboard.test.ts` | **13건** | API 성공/실패, loading 상태 전이, AxiosError(503) 처리, Mock fallback, 에러 상태 저장 |
| `components/common/__tests__/StatCard.test.ts` | **7건** | rAF 애니메이션 완료, trend 방향(up/down), unit prop 렌더링, color CSS 변수 적용 |
| `utils/__tests__/quality.test.ts` | **3건** | qualityClass 경계값 — 90↑ high, 70~89 mid, 70↓ low |
| **합계** | **21건** | **전체 통과** |

### 커버리지 상세 (`npm run test:coverage`)

| 파일 | Stmts | Branch | Funcs | Lines |
|------|:-----:|:------:|:-----:|:-----:|
| **전체 (측정 대상)** | **84.78%** | **43.24%** | **79.16%** | **88.37%** |
| `stores/dashboard.ts` | ✅ 100% | ✅ 100% | ✅ 100% | ✅ 100% |
| `utils/quality.ts` | ✅ 100% | ✅ 100% | ✅ 100% | ✅ 100% |
| `mock/overview.ts` | ✅ 100% | ✅ 100% | ✅ 100% | ✅ 100% |
| `components/common/StatCard.vue` | 91.66% | 80% | 100% | 100% |

> **핵심 비즈니스 로직(`stores`, `utils`, `mock`) 100% 커버리지 달성**
> ApexCharts 래퍼 컴포넌트(GaugeChart/LineChart/RadarChart)는 서드파티 UI 특성상 커버리지 측정 제외

📄 커버리지 HTML 리포트: [`frontend/coverage/index.html`](frontend/coverage/index.html)

### E2E 테스트 시나리오 (Playwright — CI 환경에서 실행)

| # | 시나리오 | 셀렉터 | 검증 |
|:-:|----------|--------|------|
| 1 | Overview 기본 렌더링 | `.stat-card`, `.chart-card` | 6개 KPI 카드 + 차트 존재 |
| 2 | PR 목록 페이지 이동 | `[data-testid="nav-pr-list"]` | `.pr-table` 렌더링 확인 |
| 3 | PR 슬라이드 패널 오픈 | `.pr-row:first-child` | `.panel` `toBeVisible()` |
| 4 | ESC 키로 패널 닫기 | `keyboard.press('Escape')` | `.panel` `not.toBeVisible()` |
| 5 | 다크모드 토글 ON | `.theme-toggle` | `html[data-theme="dark"]` |
| 6 | 다크모드 토글 OFF | `.theme-toggle` 재클릭 | `html[data-theme="light"]` |
| 7 | 개발자 페이지 이동 | `[data-testid="nav-developers"]` | `.dev-card` 존재 확인 |
| 8 | AI 인사이트 페이지 이동 | `[data-testid="nav-insights"]` | `.insight-card` 존재 확인 |

> E2E는 **GitHub Actions Ubuntu 환경**에서 `npx playwright install --with-deps chromium` 후 실행됩니다.
> 결과 리포트(`playwright-report`)는 Actions Artifacts에 7일간 보관됩니다.

---

## 🔄 CI/CD 파이프라인

### CI — 자동 테스트 + 빌드 (`ci.yml`)

[![CI](https://github.com/knh980109/DevLens/actions/workflows/ci.yml/badge.svg)](https://github.com/knh980109/DevLens/actions/workflows/ci.yml)

```
push / PR → main 브랜치
│
├── ① unit-test                    (Ubuntu Latest)
│   ├── npm ci
│   ├── npm run test:coverage      → 21건 통과 / 커버리지 84%+
│   └── 📦 Artifact 업로드: coverage-report (보관 7일)
│
├── ② build-frontend               (needs: unit-test)
│   ├── npm run build              → TypeScript 컴파일 오류 없음 확인
│   └── Vite 번들 생성 성공
│
├── ③ e2e-test                     (needs: build-frontend)
│   ├── npx playwright install --with-deps chromium
│   ├── npm run test:e2e           → 8개 시나리오 실행
│   └── 📦 Artifact 업로드: playwright-report (if: always(), 보관 7일)
│
└── ④ build-backend                (병렬 실행)
    ├── dotnet restore
    └── dotnet build --configuration Release
```

### CD — GitHub Pages 자동 배포 (`cd.yml`)

[![CD](https://github.com/knh980109/DevLens/actions/workflows/cd.yml/badge.svg)](https://github.com/knh980109/DevLens/actions/workflows/cd.yml)

```
push → main
└── deploy
    ├── npm run build  (base: '/DevLens/')
    └── 🚀 https://knh980109.github.io/DevLens/  자동 배포
```

**파이프라인 실행 이력 확인:** [GitHub Actions](https://github.com/knh980109/DevLens/actions)

---

## 📐 반응형 디자인

### 지원 환경

| 환경 | 기준 | KPI 카드 | 차트 | PR 테이블 |
|------|:----:|:--------:|:----:|:---------:|
| **데스크탑** | 1280px 이상 | 3열 그리드 | 2열 그리드 | 전체 컬럼 |
| **태블릿** | 768px~1279px | 2열 그리드 | 1열 스택 | 전체 컬럼 |
| **모바일** | 768px 미만 | 1열 스택 | 1열 스택 | 가로 스크롤 |

### 실제 구현 코드

```scss
// OverviewView.vue — stat-grid
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   // 데스크탑: 3열

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr); // 태블릿: 2열
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;            // 모바일: 단일 컬럼
  }
}

// chart-grid (2열 → 1열)
.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// PR 목록 테이블 — 모바일 가로 스크롤
.table-wrapper {
  @media (max-width: 768px) {
    overflow-x: auto;
  }
}
```

---

## 🆚 GitHub 기본 PR 뷰 대비 차별점

| 관점 | GitHub 기본 PR 뷰 | DevLens |
|------|:-----------------:|:-------:|
| **데이터 범위** | 개별 PR 단위 | 팀 전체 **11주 추이** |
| **코드 품질** | 수동 코드리뷰 | AI Critical/Warning/Info **자동 분류** |
| **개발자 분석** | 커밋 히스토리 수동 | **레이더 차트** 5축 시각화 |
| **의료 도메인** | 범용 UI | EMR·OCS·FHIR·EDI 실무 시나리오 |
| **접근성** | GitHub 계정 필요 | **GitHub Pages** 즉시 실행 |
| **보안 알림** | PR 코멘트 기반 | 환자정보·진료기록 **취약점 우선순위화** |
| **KPI** | 수치 없음 | **6개 KPI 카드** + 4개 차트 |

---

## 🏗️ 아키텍처 및 에러 처리

### 프로젝트 구조

```
DevLens/
├── frontend/                       # Vue3 + Vite + TypeScript (완전 적용)
│   ├── src/
│   │   ├── types/index.ts          # PullRequest, Developer, AiInsight, Overview 인터페이스
│   │   ├── vite-env.d.ts           # Vue 모듈 타입 선언
│   │   ├── views/                  # OverviewView, PrListView, DeveloperView, InsightView
│   │   ├── components/
│   │   │   ├── common/             # StatCard (rAF+easing), AppHeader, LoadingSpinner
│   │   │   ├── charts/             # LineChart, GaugeChart, RadarChart (ApexCharts)
│   │   │   └── pr/                 # PrDetailPanel (Teleport + ESC/외부클릭)
│   │   ├── stores/dashboard.ts     # Pinia: AxiosError 로깅, errors 상태, Mock fallback
│   │   ├── utils/quality.ts        # qualityClass 순수 함수 (100% 커버리지)
│   │   └── router/index.ts         # hash(prod) / history(dev) 모드 분기
│   ├── src/__tests__/              # Vitest 단위 테스트 21건
│   └── e2e/                        # Playwright E2E 8시나리오
│
├── backend/                        # ASP.NET Core 9 WebAPI
│   ├── Controllers/DashboardController.cs   # 4개 REST 엔드포인트
│   ├── Services/MockDataService.cs          # IWebHostEnvironment 주입
│   ├── Models/                              # C# record 타입 (Null 안전성)
│   └── Data/                               # 의료IT Mock JSON (25PR·7명·12건)
│
└── .github/workflows/
    ├── ci.yml                      # 4 jobs + 2 artifacts
    └── cd.yml                      # GitHub Pages 배포
```

### API 에러 처리 흐름

```
API 호출 실패 (네트워크 오류 / 4xx / 5xx)
    │
    ├── [Store Layer] Pinia store catch
    │     ├── AxiosError → console.warn('[DevLens] fetchXxx API 실패 — [503] message')
    │     ├── store.errors[key] = 'API 연결 실패 — Mock 데이터 표시 중'
    │     └── Mock JSON 데이터 자동 로드 (빈 화면 없음 보장)
    │
    └── [View Layer] 4개 뷰 공통
          └── v-if="store.errors[key]"
                → <div class="api-error-banner"> ⚠️ {{ store.errors[key] }} </div>
                   (상단 배너 노출 — 사용자에게 상태 안내)
```

---

## 🚀 시작하기

### 즉시 실행 (설치 불필요)

**👉 [https://knh980109.github.io/DevLens/](https://knh980109.github.io/DevLens/)**

### 로컬 풀스택 실행

```bash
git clone https://github.com/knh980109/DevLens.git && cd DevLens

# 백엔드 (터미널 1) — Node.js 18+, .NET SDK 9.x 필요
cd backend && dotnet run
# → http://localhost:5062  |  Swagger: http://localhost:5062/swagger

# 프론트엔드 (터미널 2)
cd frontend && npm install && npm run dev
# → http://localhost:5173
```

### 테스트 실행

```bash
cd frontend

npm test                  # 단위 테스트 21건 (2초)
npm run test:coverage     # 커버리지 리포트 → frontend/coverage/index.html
npm run test:e2e          # E2E 8시나리오 (Playwright, 서버 자동 시작)
```

---

## 📡 API 엔드포인트

| Method | URL | 응답 |
|:------:|-----|------|
| `GET` | `/api/v1/overview` | 6개 KPI + 11주 차트 데이터 |
| `GET` | `/api/v1/pull-requests` | PullRequest[] — 25건 |
| `GET` | `/api/v1/developers` | Developer[] — 7명 (레이더 포함) |
| `GET` | `/api/v1/insights` | AiInsight[] — 12건 |

---

## 🛠️ 기술 스택 선택 근거

| 기술 | 선택 근거 |
|------|-----------|
| **Vue 3 + `<script setup lang="ts">`** | 의료 포털 컴포넌트 구조에 적합, 코드 간결성 |
| **TypeScript (전체 파일 적용)** | `vite-env.d.ts` 포함, 파라미터 타입 명시, 컴파일 타임 오류 차단 |
| **Pinia** | Vuex 대비 타입 추론·`errors` 상태 관리 용이 |
| **ApexCharts** | Area/RadialBar/Radar/Bar 단일 라이브러리, 다크모드 내장 |
| **ASP.NET Core 9** | TechEmpower 기준 Spring Boot 대비 처리량 2~3배, C# record 불변 DTO |
| **Vitest** | 21건 단위 테스트, 핵심 모듈 100% 커버리지 |
| **Playwright** | CI Ubuntu 환경에서 chromium E2E 8시나리오 자동 실행 |
| **GitHub Actions** | 4 jobs (테스트→빌드→E2E→백엔드), 아티팩트 자동 업로드 |
| **GitHub Pages** | hash 라우터 적용, main push 시 자동 배포 |

---

## 🏥 GC메디아이 의료IT 실무 시나리오

| 도메인 | Mock 데이터 예시 |
|--------|----------------|
| **EMR** | 환자 기본정보 API 캐싱, 진단코드(KCD-8) 자동완성 |
| **보험청구** | EDI 파싱 오류 수정, 심사청구 자동화 배치 |
| **OCS** | 처방전달 응답 지연 개선, 수납 이중처리 방지 |
| **HL7·FHIR** | 원외처방전 FHIR R4 변환, HL7 메시지 파서 리팩터링 |
| **보안** | 환자 개인정보 XSS 필터링, 개인정보 마스킹 |
| **인프라** | Kubernetes 헬스체크, 무중단 배포 CI/CD |

---

## 📌 참고

- 실제 GitHub API / AI 모델 미연동 — Mock 데이터 기반 데모
- 실제 환자 개인정보(PHI) 미포함
- 사용자 인증 미포함

---

<div align="center">

**GC메디아이** 개발팀의 더 나은 코드 리뷰 문화를 위해

[![GitHub](https://img.shields.io/badge/GitHub-knh980109%2FDevLens-181717?style=flat-square&logo=github)](https://github.com/knh980109/DevLens)
[![Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-brightgreen?style=flat-square&logo=github)](https://knh980109.github.io/DevLens/)

</div>

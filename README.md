<div align="center">

# 🔍 DevLens

### GC메디아이 의료IT 개발팀 AI 코드 리뷰 대시보드

> EMR·보험청구·FHIR 등 의료 도메인 특화 PR을 AI 인사이트·레이더 차트·11주 추이로 시각화하여
> GitHub 기본 PR 뷰 대비 팀 코드 품질 리스크를 **한눈에 파악**하는 대시보드

<br/>

[![CI](https://github.com/knh980109/DevLens/actions/workflows/ci.yml/badge.svg)](https://github.com/knh980109/DevLens/actions/workflows/ci.yml)
[![CD](https://github.com/knh980109/DevLens/actions/workflows/cd.yml/badge.svg)](https://github.com/knh980109/DevLens/actions/workflows/cd.yml)
![Tests](https://img.shields.io/badge/단위_테스트-30_passed-brightgreen?style=flat-square&logo=vitest)
![E2E](https://img.shields.io/badge/E2E-8_scenarios-brightgreen?style=flat-square&logo=playwright)
![Coverage](https://img.shields.io/badge/커버리지-86.53%25-brightgreen?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-전체_적용-3178C6?style=flat-square&logo=typescript&logoColor=white)

<br/>

![Vue3](https://img.shields.io/badge/Vue_3-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core_9-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logo=vue.js&logoColor=black)

<br/>

### 🌐 [라이브 데모 → knh980109.github.io/DevLens](https://knh980109.github.io/DevLens/)

**설치 불필요 · Mock 데이터 · 모든 기능 즉시 동작**

</div>

---

## 🎥 데모

> **라이브 데모 즉시 실행 → [knh980109.github.io/DevLens](https://knh980109.github.io/DevLens/)**

```
① Overview  — KPI 카드 카운터 애니메이션 + 11주 PR 추이 차트
② PR 목록   — 25건 실무 데이터 + 품질점수 배지 + 슬라이드 디테일 패널
③ 개발자    — 레이더 차트 모달 (속도/품질/협업/일관성/커버리지 5축)
④ 인사이트  — Critical/Warning/Info 심각도 필터 + 의료 도메인 취약점 목록
⑤ 다크모드  — CSS Variables 런타임 전환, localStorage 유지
```

| Overview (데스크탑) | PR 목록 + 슬라이드 패널 | AI 인사이트 |
|:-------------------:|:-----------------------:|:-----------:|
| 6개 KPI 카드 + 4개 차트 | 25건 PR + 우측 패널 | Critical·Warning·Info 필터 |
| [라이브에서 확인 →](https://knh980109.github.io/DevLens/) | [라이브에서 확인 →](https://knh980109.github.io/DevLens/#/pull-requests) | [라이브에서 확인 →](https://knh980109.github.io/DevLens/#/insights) |

---

## 1. 프로젝트 소개

유비케어(현 **GC메디아이**)의 개발팀은 EMR, 보험청구, HL7·FHIR 인터페이스, 환자포털 등 **의료 도메인 특화 시스템**을 동시에 유지·개발합니다.

PR 하나에 `환자 개인정보`, `보험청구 로직`, `외부 기관 연동 프로토콜`이 뒤섞이는 환경에서 기존 GitHub PR 화면만으로는 팀 전체의 **코드 품질 흐름과 리스크를 한눈에 파악하기 어렵습니다.**

DevLens는 이 문제를 해결하기 위해 **4개 뷰 + AI 인사이트 + 레이더 차트 + 11주 추이**로 팀의 코드 리뷰 현황을 시각화합니다.

| 기존 방식 (GitHub PR 뷰) | DevLens |
|--------------------------|---------|
| PR 목록 수동 확인 | 상태별 필터 + 품질점수 자동 배지 |
| 개인별 리뷰 속도 체감 | 레이더 차트로 7명 개발자 역량 시각화 |
| 보안 이슈 코드리뷰 중 발견 | AI 인사이트로 Critical 항목 **선제 탐지** |
| 주간 회의 구두 공유 | 11주 추이 차트로 **데이터 기반 회고** |
| GitHub 계정·권한 필요 | GitHub Pages에서 즉시 실행, 설치 불필요 |

---

## 2. 주요 기능

### 📊 Overview 대시보드
- **6개 KPI 카드** — 전체·오픈·머지·클로즈 PR, 평균 품질점수, 평균 리뷰시간
- **카운터 애니메이션** — `requestAnimationFrame` + cubic easing (60fps)
- **주간 PR 추이** — 11주 Area 차트 (전체 vs 머지 PR)
- **코드 품질 트렌드** — 목표 기준선(85점) 포함 라인 차트
- **개발자별 PR 현황** — Grouped Bar 차트

### 📋 PR 목록
- **상태 필터** — All / Open / Merged / Closed 실시간 필터링
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

### 🎨 UX / 접근성
- **GC메디아이 브랜드** — GC그룹 그린(`#00965E`) 포인트 컬러
- **다크모드** — CSS Variables 런타임 전환, `localStorage` 저장
- **반응형** — 1280px / 768px 브레이크포인트

---

## 3. 기술 스택

| 분류 | 기술 | 선택 근거 |
|------|------|-----------|
| **Frontend** | Vue 3 + `<script setup lang="ts">` | `<script setup>` 문법으로 코드 간결성 확보, Composition API |
| | TypeScript (전체 파일 적용) | `vite-env.d.ts` 포함, 컴파일 타임 오류 차단 |
| | Pinia | Vuex 대비 타입 추론 우수, `errors` 상태 관리 용이 |
| | ApexCharts | Area/RadialBar/Radar/Bar 단일 라이브러리, 다크모드 내장 |
| | Axios | fetch 대비 인터셉터·에러 처리 편의성 |
| | SCSS + CSS Variables | 다크/라이트 테마 런타임 전환 |
| **Backend** | ASP.NET Core 9 | TechEmpower 기준 Spring Boot 대비 처리량 2~3배, C# record 불변 DTO |
| **Test** | Vitest | 30건 단위 테스트, 핵심 모듈 100% 커버리지 |
| | Playwright | CI Ubuntu 환경 chromium E2E 8시나리오 |
| **DevOps** | GitHub Actions | 4 jobs (테스트→빌드→E2E→백엔드), 아티팩트 자동 업로드 |
| | GitHub Pages | hash 라우터, main push 시 자동 배포 |

---

## 4. 아키텍처 구조

```
DevLens/
├── frontend/                       # Vue3 + Vite + TypeScript
│   └── src/
│       ├── types/index.ts          # PullRequest, Developer, AiInsight, Overview 인터페이스
│       ├── vite-env.d.ts           # Vue 모듈 타입 선언 (*.vue default export)
│       ├── views/                  # OverviewView, PrListView, DeveloperView, InsightView
│       ├── components/
│       │   ├── common/             # StatCard (rAF+easing), AppHeader, LoadingSpinner
│       │   ├── charts/             # LineChart, GaugeChart, RadarChart (ApexCharts)
│       │   └── pr/                 # PrDetailPanel (Teleport + ESC/외부클릭)
│       ├── stores/dashboard.ts     # Pinia: 에러 로깅, errors 상태, Mock fallback
│       ├── utils/
│       │   ├── errorHandler.ts     # 중앙화 에러 처리 (logApiError, toUserMessage)
│       │   └── quality.ts          # qualityClass 순수 함수
│       └── router/index.ts         # hash(prod) / history(dev) 모드 분기
│
├── backend/                        # ASP.NET Core 9 WebAPI
│   ├── Controllers/DashboardController.cs   # 4개 REST 엔드포인트 (Swagger 문서화)
│   ├── Services/MockDataService.cs          # IWebHostEnvironment 주입
│   ├── Models/                              # C# class 타입 (Null 안전성)
│   └── Data/                               # 의료IT Mock JSON (25PR·7명·12건)
│
└── .github/workflows/
    ├── ci.yml                      # 4 jobs: unit-test → build → e2e-test ‖ build-backend
    └── cd.yml                      # GitHub Pages 자동 배포
```

### API 엔드포인트

| Method | URL | 응답 |
|:------:|-----|------|
| `GET` | `/api/v1/overview` | 6개 KPI + 11주 차트 데이터 |
| `GET` | `/api/v1/pull-requests` | PullRequest[] — 25건 |
| `GET` | `/api/v1/developers` | Developer[] — 7명 (레이더 포함) |
| `GET` | `/api/v1/insights` | AiInsight[] — 12건 |

---

## 5. 에러 처리 전략 (Error Handling Strategy)

### 설계 원칙

모든 API 에러는 **3계층** 구조로 처리합니다.

```
API 호출 실패 (네트워크 오류 / 4xx / 5xx)
    │
    ├── [1] utils/errorHandler.ts — 중앙화 에러 유틸
    │     ├── extractErrorMessage(err)  → "[503] Request failed" 포맷
    │     ├── logApiError(action, err)  → console.warn 일관 출력
    │     └── toUserMessage(err)        → 상태코드별 사용자 메시지 분기
    │
    ├── [2] stores/dashboard.ts — Pinia Store catch
    │     ├── logApiError() 호출 (콘솔 로깅)
    │     ├── store.errors[key] = toUserMessage(err)
    │     └── Mock JSON 자동 로드 (빈 화면 없음 보장)
    │
    └── [3] View Layer — 4개 뷰 공통 배너
          └── v-if="store.errors[key]"
                → <div class="api-error-banner">
                     ⚠️ {{ store.errors[key] }}
                   </div>
```

### 핵심 파일: `src/utils/errorHandler.ts`

```typescript
import { AxiosError } from 'axios'

/** API 에러 메시지 추출 — AxiosError: [상태코드] 메시지, 기타: String() 변환 */
export function extractErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    const status = err.response?.status ?? 'NETWORK'
    return `[${status}] ${err.message}`
  }
  return String(err)
}

/** API 실패 로깅 — [DevLens] {action} API 실패 — Mock 데이터로 fallback. ({에러}) */
export function logApiError(action: string, err: unknown): void {
  console.warn(`[DevLens] ${action} API 실패 — Mock 데이터로 fallback. (${extractErrorMessage(err)})`)
}

/** 에러 종류별 사용자 배너 메시지 반환 */
export function toUserMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    const status = err.response?.status
    if (status && status >= 500) return 'API 서버 오류 — Mock 데이터 표시 중'
    if (status && status >= 400) return 'API 요청 오류 — Mock 데이터 표시 중'
  }
  return 'API 연결 실패 — Mock 데이터 표시 중'
}
```

### 에러 처리 범위

| 레이어 | 전략 | 적용 여부 |
|--------|------|:---------:|
| 에러 메시지 추출 | `extractErrorMessage` — AxiosError/일반 Error 분기 | ✅ |
| 에러 로깅 | `logApiError` — `[DevLens]` 접두어 + action명 포함 | ✅ |
| 사용자 메시지 | `toUserMessage` — 5xx/4xx/네트워크 오류 3단계 분기 | ✅ |
| Mock fallback | API 실패 시 Mock JSON 자동 로드, 빈 화면 없음 | ✅ |
| 에러 배너 UI | 4개 뷰 `api-error-banner` 공통 표시 | ✅ |
| Retry 로직 | 로컬 백엔드 전용 데모이므로 미구현 | — |
| 글로벌 에러바운더리 | Vue `onErrorCaptured` — 추후 구현 예정 | — |

---

## 6. Testing & Validation (테스트 및 검증)

### 단위 테스트 실행 결과 (Vitest)

```
 RUNS  frontend/

 Test Files  4 passed (4)
 Tests       30 passed (30)
 Duration    10.24s
```

| 테스트 파일 | 건수 | 검증 내용 |
|------------|:----:|-----------|
| `stores/__tests__/dashboard.test.ts` | **11건** | API 성공/실패, loading 상태 전이, AxiosError(503) 처리, Mock fallback, 에러 상태 저장 |
| `components/common/__tests__/StatCard.test.ts` | **7건** | rAF 애니메이션 완료, trend 방향(up/down), unit prop 렌더링, color CSS 변수 적용 |
| `utils/__tests__/quality.test.ts` | **3건** | qualityClass 경계값 — 90↑ high, 70~89 mid, 70↓ low |
| `utils/__tests__/errorHandler.test.ts` | **8건** | extractErrorMessage(503/네트워크/일반), logApiError 접두어, toUserMessage(5xx/4xx/네트워크) |
| **합계** | **30건** | **전체 통과** |

### 테스트 커버리지 (Test Coverage)

```
Statements : 86.53%
Branches   : 55.31%
Functions  : 80.76%
Lines      : 89.58%
```

> 핵심 비즈니스 로직(stores, utils, mock) 100% 달성:

```
stores/dashboard.ts  → Statements 100% | Branches 100% | Functions 100% | Lines 100%
utils/errorHandler   → Statements 100% | Branches 100% | Functions 100% | Lines 100%
utils/quality.ts     → Statements 100% | Branches 100% | Functions 100% | Lines 100%
mock/overview.ts     → Statements 100% | Branches 100% | Functions 100% | Lines 100%
```

> ApexCharts 래퍼 컴포넌트(GaugeChart/LineChart/RadarChart)는 서드파티 UI 특성상 커버리지 측정 제외

📄 커버리지 리포트: [`frontend/coverage/index.html`](frontend/coverage/index.html)

### 테스트 코드 예시

**① Pinia Store — API 성공/실패 + AxiosError 처리**

```typescript
// stores/__tests__/dashboard.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios, { AxiosError } from 'axios'
import { useDashboardStore } from '../dashboard'

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

describe('fetchOverview', () => {
  beforeEach(() => { setActivePinia(createPinia()); vi.clearAllMocks() })

  it('API 성공 시 overview 데이터가 저장된다', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: { totalPr: 25, avgQualityScore: 89 } })
    const store = useDashboardStore()
    await store.fetchOverview()
    expect(store.overview?.totalPr).toBe(25)          // ✅ 데이터 저장 확인
    expect(store.loading.overview).toBe(false)         // ✅ 로딩 상태 해제
  })

  it('AxiosError(503) 발생 시 에러 상태 저장 + Mock fallback', async () => {
    const axiosError = new AxiosError('Request failed', 'ERR_BAD_RESPONSE',
      undefined, undefined,
      { status: 503, data: {}, statusText: 'Service Unavailable', headers: {}, config: {} as never })
    mockedAxios.get = vi.fn().mockRejectedValue(axiosError)
    const store = useDashboardStore()
    await store.fetchOverview()
    expect(store.errors.overview).toBeTruthy()         // ✅ 에러 상태 저장
    expect(store.overview).not.toBeNull()              // ✅ Mock fallback 동작
  })
})
```

**② 에러 처리 유틸 — `errorHandler.ts`**

```typescript
// utils/__tests__/errorHandler.test.ts
import { describe, it, expect, vi, afterEach } from 'vitest'
import { AxiosError } from 'axios'
import { extractErrorMessage, logApiError, toUserMessage } from '../errorHandler'

describe('errorHandler', () => {
  afterEach(() => vi.restoreAllMocks())

  it('AxiosError에서 [상태코드] 메시지 형식으로 추출한다', () => {
    const err = new AxiosError('Request failed', 'ERR_BAD_RESPONSE',
      undefined, undefined, { status: 503, data: {}, statusText: '', headers: {}, config: {} as never })
    expect(extractErrorMessage(err)).toBe('[503] Request failed') // ✅
  })

  it('5xx 에러는 서버 오류 메시지를 반환한다', () => {
    const err = new AxiosError('Server Error', 'ERR_BAD_RESPONSE',
      undefined, undefined, { status: 500, data: {}, statusText: '', headers: {}, config: {} as never })
    expect(toUserMessage(err)).toBe('API 서버 오류 — Mock 데이터 표시 중') // ✅
  })

  it('[DevLens] 접두어와 action명을 포함해 console.warn을 호출한다', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    logApiError('fetchOverview', new Error('test'))
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[DevLens]'))      // ✅
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('fetchOverview'))  // ✅
  })
})
```

**③ Vue 컴포넌트 — rAF 애니메이션 + Props 검증**

```typescript
// components/common/__tests__/StatCard.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import StatCard from '../StatCard.vue'

describe('StatCard', () => {
  beforeEach(() => {
    vi.spyOn(performance, 'now').mockReturnValue(0)
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(2000)  // elapsed(2000ms) > duration(1000ms) → 애니메이션 완료 처리
      return 0
    })
  })

  it('title과 icon props가 렌더링된다', () => {
    const wrapper = mount(StatCard, { props: { title: '전체 PR', value: 25, icon: '📋' } })
    expect(wrapper.find('.stat-card__title').text()).toBe('전체 PR')  // ✅
  })

  it('trend가 양수이면 trend--up 클래스가 적용된다', () => {
    const wrapper = mount(StatCard, { props: { title: 'Test', value: 0, trend: 5 } })
    expect(wrapper.find('.stat-card__trend').classes()).toContain('trend--up')  // ✅
  })

  it('color prop이 CSS 변수로 style에 적용된다', () => {
    const wrapper = mount(StatCard, { props: { title: 'Test', value: 0, color: '#00965E' } })
    expect(wrapper.find('.stat-card').attributes('style')).toContain('#00965E')  // ✅
  })
})
```

**④ 순수 함수 경계값 테스트 — `qualityClass`**

```typescript
// utils/__tests__/quality.test.ts
import { describe, it, expect } from 'vitest'
import { qualityClass } from '../quality'

describe('qualityClass', () => {
  it('90 이상이면 quality--high를 반환한다', () => {
    expect(qualityClass(90)).toBe('quality--high')   // ✅ 경계값
    expect(qualityClass(100)).toBe('quality--high')  // ✅ 최댓값
  })
  it('70~89이면 quality--mid를 반환한다', () => {
    expect(qualityClass(70)).toBe('quality--mid')    // ✅ 경계값
    expect(qualityClass(89)).toBe('quality--mid')    // ✅ 상한 경계
  })
  it('70 미만이면 quality--low를 반환한다', () => {
    expect(qualityClass(69)).toBe('quality--low')    // ✅ 경계값
    expect(qualityClass(0)).toBe('quality--low')     // ✅ 최솟값
  })
})
```

### E2E 테스트 시나리오 (Playwright — CI 환경에서 실행)

| # | 시나리오 | 셀렉터 | 검증 |
|:-:|----------|--------|------|
| 1 | Overview 기본 렌더링 | `.stat-card` × 6 | KPI 카드 수 정확히 6개 |
| 2 | PR 목록 페이지 이동 | `a[href="/pull-requests"]` | `.pr-row` 렌더링 확인 |
| 3 | PR 슬라이드 패널 오픈 | `.pr-row:first-child` | `.panel` `toBeVisible()` |
| 4 | ESC 키로 패널 닫기 | `keyboard.press('Escape')` | `.panel` `not.toBeVisible()` |
| 5 | 다크모드 토글 ON | `.theme-toggle` | `html[data-theme="dark"]` |
| 6 | 다크모드 토글 OFF | `.theme-toggle` 재클릭 | `html[data-theme="light"]` |
| 7 | 개발자 페이지 이동 | `a[href="/developers"]` | `.dev-card` 존재 확인 |
| 8 | AI 인사이트 페이지 이동 | `a[href="/insights"]` | `.insight-card` 존재 확인 |

> E2E는 **GitHub Actions Ubuntu 환경**에서 `npx playwright install --with-deps chromium` 후 실행됩니다.
> 결과 리포트(`playwright-report`)는 Actions Artifacts에 7일간 보관됩니다.

---

## 7. CI/CD 파이프라인

### CI — 자동 테스트 + 빌드 (`ci.yml`)

[![CI](https://github.com/knh980109/DevLens/actions/workflows/ci.yml/badge.svg)](https://github.com/knh980109/DevLens/actions/workflows/ci.yml)

**파이프라인 실행 단계:**

```
push / PR → main 브랜치
│
├── ① Install & Unit Test          (Ubuntu Latest)
│   ├── npm ci                     의존성 설치
│   ├── npm run test:coverage      30건 단위 테스트 + 커버리지 측정
│   └── 📦 coverage-report 아티팩트 업로드 (7일 보관)
│
├── ② Build (needs: unit-test)
│   ├── npm run build              TypeScript 컴파일 + Vite 번들링
│   └── 빌드 성공 여부 확인
│
├── ③ E2E Test (needs: build)
│   ├── playwright install chromium
│   ├── npm run test:e2e           8개 시나리오 실행
│   └── 📦 playwright-report 아티팩트 업로드 (항상, 7일 보관)
│
└── ④ Backend Build (병렬 실행)
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

**파이프라인 실행 이력:** [GitHub Actions 보기 →](https://github.com/knh980109/DevLens/actions)

---

## 8. 반응형 디자인

### 지원 환경

| 환경 | 기준 | KPI 카드 | 차트 | PR 테이블 |
|------|:----:|:--------:|:----:|:---------:|
| **데스크탑** | 1280px 이상 | 3열 그리드 | 2열 그리드 | 전체 컬럼 |
| **태블릿** | 768px~1279px | 2열 그리드 | 1열 스택 | 전체 컬럼 |
| **모바일** | 375px~767px | 1열 스택 | 1열 스택 | 가로 스크롤 |

### 실제 화면 (라이브 데모에서 확인)

| 데스크탑 (1280px+) | 태블릿 (768px) | 모바일 (375px) |
|:------------------:|:--------------:|:--------------:|
| 3열 KPI 카드 + 2열 차트 | 2열 KPI 카드 + 1열 차트 | 1열 스택 + 가로 스크롤 |
| [라이브 데모 →](https://knh980109.github.io/DevLens/) | 브라우저 폭 768px로 확인 | 브라우저 DevTools 모바일 뷰 |

### 반응형 구현 코드 (`OverviewView.vue`)

```scss
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 데스크탑: 3열 */

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr); /* 태블릿: 2열 */
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;            /* 모바일: 단일 컬럼 */
  }
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;            /* 모바일: 1열 스택 */
  }
}

.table-wrapper {
  @media (max-width: 768px) {
    overflow-x: auto;                      /* 모바일: 가로 스크롤 */
  }
}
```

---

## 9. 프로젝트 신뢰성 (Project Reliability)

DevLens는 데모 프로젝트이지만 **프로덕션 수준의 신뢰성 기준**을 적용합니다.

| 항목 | 구현 내용 | 파일 |
|------|-----------|------|
| **TypeScript 전체 적용** | 모든 `.vue` 파일에 `lang="ts"`, `vite-env.d.ts` 모듈 선언, 파라미터 타입 명시 | 전체 소스 |
| **중앙화 에러 처리** | `utils/errorHandler.ts` — 메시지 추출·로깅·사용자 메시지 분리, 8건 단위 테스트 | `utils/errorHandler.ts` |
| **자동화 테스트** | Vitest 30건 단위 + Playwright E2E 8건 = 총 38건, 핵심 모듈 100% 커버리지 | `__tests__/`, `e2e/` |
| **CI 게이트** | 단위 테스트 → 빌드 → E2E 순서 강제, 하나라도 실패 시 배포 차단 | `.github/workflows/ci.yml` |
| **API fallback** | 백엔드 없이도 Mock JSON 자동 전환, 4개 뷰 전부 에러 배너 표시 — 빈 화면 없음 | `stores/dashboard.ts` |
| **Swagger API 문서** | 4개 엔드포인트 XML 주석 + `[ProducesResponseType]` 자동 문서화 | `Controllers/DashboardController.cs` |
| **불변 타입 안전성** | C# `class` 타입 + nullable reference types, TypeScript `interface` 공유 | `Models/`, `types/index.ts` |

---

## 10. Demo 시나리오 (30초)

심사자가 [라이브 데모](https://knh980109.github.io/DevLens/)에서 바로 확인할 수 있는 핵심 흐름입니다.

```
① Overview 진입 (0~8초)
   → 6개 KPI 카드가 0에서 목표값으로 카운터 애니메이션 (rAF + cubic easing)
   → 11주 PR 추이 + 품질 트렌드 + 개발자별 현황 차트 4개 확인

② PR 목록 클릭 (8~16초)
   → 25건의 EMR·FHIR·보험청구 실무 PR 목록 표시
   → 품질점수 배지(🟢/🟡/🔴) 한눈에 파악
   → PR 행 클릭 → 우측 슬라이드 패널 + AI 코드 품질 분석 (ESC 닫기)

③ 개발자 분석 클릭 (16~22초)
   → 7명 카드에서 역할·머지율·품질점수 확인
   → 카드 클릭 → 레이더 차트 모달 (속도/품질/협업/일관성/커버리지 5축)

④ AI 인사이트 클릭 (22~27초)
   → Critical: 환자 개인정보 SQL Injection, 진료기록 권한 미검증
   → Warning/Info 필터 탭으로 전환

⑤ 다크모드 토글 (27~30초)
   → 우상단 버튼 클릭 → 무채색 다크 테마 전환 (CSS Variables, 애니메이션)
```

---

## 🔧 핵심 구현 로직 (Core Implementation)

### 1. KPI 집계 — `mock/overview.ts`

25건 PR + 7명 개발자 JSON에서 Overview KPI를 **런타임에 집계**합니다.
단순 하드코딩이 아닌 실제 배열 연산으로 값을 도출해, 데이터 변경 시 자동 반영됩니다.

```typescript
// src/mock/overview.ts
export function getMockOverview(): Overview {
  const prs  = pullRequests  // 25건 PR JSON
  const devs = developers    // 7명 개발자 JSON

  return {
    totalPr:         prs.length,
    openPr:          prs.filter(p => p.status === 'open').length,
    mergedPr:        prs.filter(p => p.status === 'merged').length,
    closedPr:        prs.filter(p => p.status === 'closed').length,

    // 평균 품질점수: 25개 PR qualityScore 합 ÷ 건수
    avgQualityScore: Math.round(prs.reduce((s, p) => s + p.qualityScore, 0) / prs.length),

    // 평균 리뷰시간: 7명 avgReviewHours 합 ÷ 인원
    avgReviewHours:  Math.round(devs.reduce((s, d) => s + d.avgReviewHours, 0) / devs.length),

    // 11주 추이 차트 데이터 (9/3주 ~ 12/1주)
    weeklyPrData: [
      { week: '9/3주',  count: 4,  merged: 3 },
      // ... 11주 전체
    ],
    developerPrCounts: devs.map(d => ({ name: d.name, count: d.totalPr, merged: d.mergedPr }))
  }
}
```

### 2. 에러 처리 — `utils/errorHandler.ts`

HTTP 상태코드에 따라 **3단계 사용자 메시지**를 분기합니다.
`AxiosError` 타입 가드를 활용해 네트워크 오류와 서버 오류를 구분합니다.

```typescript
// src/utils/errorHandler.ts
export function toUserMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    const status = err.response?.status
    if (status && status >= 500) return 'API 서버 오류 — Mock 데이터 표시 중'  // 5xx
    if (status && status >= 400) return 'API 요청 오류 — Mock 데이터 표시 중'  // 4xx
  }
  return 'API 연결 실패 — Mock 데이터 표시 중'  // 네트워크 오류
}

export function logApiError(action: string, err: unknown): void {
  const detail = extractErrorMessage(err)  // "[503] Service Unavailable" 형식
  console.warn(`[DevLens] ${action} API 실패 — Mock 데이터로 fallback. (${detail})`)
}
```

### 3. KPI 카드 애니메이션 — `components/common/StatCard.vue`

`setInterval` 대신 `requestAnimationFrame` + **cubic easing**을 사용합니다.
탭 비활성 시 배터리 낭비 없이 60fps 부드러운 카운터를 구현합니다.

```typescript
// src/components/common/StatCard.vue
onMounted(() => {
  const target    = props.value ?? 0
  const duration  = 1000
  const startTime = performance.now()

  const animate = (now: number) => {
    const elapsed  = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased    = 1 - Math.pow(1 - progress, 3)  // cubic ease-out
    displayValue.value = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(animate) // 완료 전까지만 재귀
  }

  requestAnimationFrame(animate)
})
```

### 4. 품질점수 → CSS 클래스 매핑 — `utils/quality.ts`

뷰 컴포넌트와 분리된 **순수 함수**로 경계값 로직을 격리합니다.
100% 테스트 커버리지, 뷰에서 `import { qualityClass }` 한 줄로 재사용합니다.

```typescript
// src/utils/quality.ts
export function qualityClass(score: number): string {
  if (score >= 90) return 'quality--high'  // 🟢 우수
  if (score >= 70) return 'quality--mid'   // 🟡 보통
  return 'quality--low'                    // 🔴 개선 필요
}
```

---

## 🚀 시작하기

### 즉시 실행 (설치 불필요)

**👉 [https://knh980109.github.io/DevLens/](https://knh980109.github.io/DevLens/)**

### 로컬 풀스택 실행

```bash
git clone https://github.com/knh980109/DevLens.git && cd DevLens

# 백엔드 (터미널 1) — .NET SDK 9.x 필요
cd backend && dotnet run
# → http://localhost:5062  |  Swagger: http://localhost:5062/swagger

# 프론트엔드 (터미널 2)
cd frontend && npm install && npm run dev
# → http://localhost:5173
```

### 테스트 실행

```bash
cd frontend

npm test                  # 단위 테스트 30건 (약 10초)
npm run test:coverage     # 커버리지 리포트 → frontend/coverage/index.html
npm run test:e2e          # E2E 8시나리오 (Playwright, 서버 자동 시작)
```

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

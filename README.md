<div align="center">

<img src="frontend/src/assets/logo.svg" width="72" height="72" alt="DevLens Logo" />

# DevLens

### GC메디아이 개발팀 AI 코드 리뷰 대시보드

**PR 현황 · 코드 품질 · 개발자 분석 · AI 인사이트**를 한 화면에서 — 의료IT 개발 사이클에 최적화

<br/>

![Vue3](https://img.shields.io/badge/Vue3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core_9-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

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
- **수치 카운터 애니메이션** — 마운트 시 0에서 목표값까지 cubic easing
- **주간 PR 추이** — 11주 전체 PR vs 머지 PR Area 차트
- **코드 품질 트렌드** — 주간 품질점수 라인 차트 (목표 기준선 표시)
- **개발자별 PR 현황** — Grouped Bar 차트

### 📋 PR 목록 (의료IT 실무 반영)
- **상태 필터** — All / Open / Merged / Closed 실시간 필터링
- **품질점수 배지** — 90↑ 🟢 / 70~89 🟡 / 70↓ 🔴 색상 구분
- **슬라이드 디테일 패널** — 클릭 시 우측 슬라이드, AI 품질 분석 포함
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
- **GC메디아이 브랜드 색상** — GC그룹 그린(`#00965E`) 기반 디자인 시스템
- **다크모드** — CSS Variables 기반 런타임 전환, `localStorage` 저장
- **페이지 전환** — fade-slide 트랜지션
- **반응형** — 1280px / 768px 브레이크포인트

---

## 🏗️ 아키텍처

```
DevLens/
├── frontend/                   # Vue3 + Vite
│   └── src/
│       ├── views/              # Overview, PR목록, 개발자, AI인사이트
│       ├── components/
│       │   ├── common/         # StatCard, AppHeader, LoadingSpinner
│       │   ├── charts/         # LineChart, GaugeChart, RadarChart
│       │   └── pr/             # PrDetailPanel (슬라이드 패널)
│       ├── stores/             # Pinia 상태관리
│       ├── router/             # Vue Router
│       └── assets/styles/      # SCSS + GC메디아이 브랜드 변수
│
└── backend/                    # ASP.NET Core 9 WebAPI
    ├── Controllers/            # DashboardController
    ├── Services/               # MockDataService
    ├── Models/                 # PullRequest, Developer, AiInsight
    └── Data/                   # 의료IT 시나리오 Mock JSON
```

---

## 🚀 시작하기

### 바로 보기 (설치 불필요)

**👉 https://knh980109.github.io/DevLens/**

GitHub Pages로 배포된 라이브 데모입니다. Mock 데이터 기반으로 백엔드 없이 모든 기능이 동작합니다.

### 로컬 실행 (풀스택)

### 요구사항

| 도구 | 버전 |
|------|------|
| Node.js | 18+ |
| .NET SDK | 9.x |

### 실행

```bash
# 1. 저장소 클론
git clone https://github.com/knh980109/DevLens.git
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
| `GET` | `/api/v1/overview` | 메인 통계 + 11주 차트 데이터 |
| `GET` | `/api/v1/pull-requests` | 의료IT PR 목록 (25건) |
| `GET` | `/api/v1/developers` | 개발자 목록 (7명, 역할 포함) |
| `GET` | `/api/v1/insights` | AI 인사이트 (12건, 의료 도메인) |

Swagger UI: **http://localhost:5062/swagger**

---

## 🛠️ 기술 스택

| 분류 | 기술 | 선택 이유 |
|------|------|-----------|
| **Frontend** | Vue 3 + Composition API | 컴포넌트 재사용성, 의료 포털 구조에 적합 |
| | Vite 8 | HMR 속도, 팀 개발 생산성 향상 |
| | Pinia | Vuex 대비 타입 추론 용이, 도메인별 스토어 분리 |
| | ApexCharts | 의료 통계 시각화에 필요한 다양한 차트 타입 지원 |
| | SCSS + CSS Variables | 브랜드 색상 일관성 + 다크모드 런타임 전환 |
| **Backend** | ASP.NET Core 9 | 유비케어 C# 기술 스택과 일치 |
| | Swashbuckle | API 문서 자동화 (외부 연동 병원 대응) |
| **데이터** | Mock JSON | 실제 PHI 데이터 없이 데모 가능 |
| **CI/CD** | GitHub Actions | PR 푸시 시 frontend/backend 빌드 자동화 |

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

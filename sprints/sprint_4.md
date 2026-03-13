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

## 관련 커밋
| 커밋 해시 | 메시지 |
|-----------|--------|
| `70bf706` | feat: DevLens AI Code Review Dashboard 초기 구현 |
| `6e5f585` | feat: TypeScript 전환 및 Vitest 단위 테스트 8건 추가 |
| `3f7b627` | feat: TypeScript 완전 전환 + Vue 컴포넌트 테스트 + 에러 로깅 강화 |

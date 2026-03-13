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

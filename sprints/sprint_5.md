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

## 관련 커밋
| 커밋 해시 | 메시지 |
|-----------|--------|
| `70bf706` | feat: DevLens AI Code Review Dashboard 초기 구현 |
| `94b2956` | feat: GitHub Pages 배포 설정 (Mock fallback, hash router, deploy workflow) |

---

## 💡 개발 중 발생한 이슈

### 이슈: ApexCharts 다크모드 초기 테마 불일치

**문제 상황**

localStorage에 `dark` 테마가 저장된 상태로 페이지를 새로고침하면, AppHeader의 토글 버튼은 다크 상태로 표시되는데 ApexCharts 차트는 라이트 테마로 렌더링되었습니다. 사용자가 토글을 한 번 누른 뒤에야 차트 테마가 맞춰졌습니다.

**원인 분석**

`chartOptions`의 `theme.mode`가 컴포넌트 초기화 시점(`setup()`)에 **한 번만** 평가되기 때문이었습니다. 이후 `data-theme` 어트리뷰트가 변경되어도 이미 계산된 `chartOptions`는 업데이트되지 않았습니다.

**시도**

`watch`로 다크모드 상태를 감지해 `chartOptions`를 업데이트해보았으나, ApexCharts가 옵션 교체를 즉시 반영하지 않는 경우가 있었습니다.

**해결**

`computed`에서 매 렌더링마다 `document.documentElement.getAttribute('data-theme')`를 실시간으로 읽도록 변경했습니다. computed는 의존성이 바뀔 때 재계산되므로, `data-theme` 어트리뷰트가 바뀌면 `chartOptions`가 자동으로 다시 계산되어 차트 테마가 즉시 동기화됩니다.

```typescript
const chartOptions = computed(() => ({
  theme: {
    // 매번 DOM에서 실시간 조회 → 초기 렌더링 시에도 정확한 테마 적용
    mode: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  },
  // ...
}))
```

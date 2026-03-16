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

---

## 💡 개발 중 발생한 이슈 및 결정

### 결정: StatCard 카운터 — setInterval → requestAnimationFrame

**배경**

초기 구현은 `setInterval(16ms)`으로 카운터를 증가시켰습니다. 하지만 브라우저 탭을 백그라운드로 전환하면 타이머 정확도가 떨어지고 CPU 낭비가 발생했습니다.

**결정**

`requestAnimationFrame` + cubic easing (`1 - (1-t)³`)으로 전환했습니다. rAF는 탭이 비활성 상태일 때 자동으로 일시 정지되어 배터리·CPU 효율적이고, easing 공식으로 60fps 부드러운 애니메이션을 구현했습니다.

### 이슈: Vitest에서 rAF 테스트

**문제 상황**

Vitest(jsdom 환경)에서 `requestAnimationFrame`이 실제로 실행되지 않아 단위 테스트에서 애니메이션 완료 여부를 검증할 수 없었습니다.

**시도**

`vi.useFakeTimers()`로 타이머를 제어해보았으나 rAF는 fake timer 범위 밖이었습니다.

**해결**

`vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => { cb(2000); return 0 })`로 콜백을 즉시 실행시켰습니다. `performance.now()`를 0으로 mocking하고 rAF에 2000ms를 전달하면 `elapsed(2000) > duration(1000)` 조건으로 애니메이션이 즉시 완료 처리됩니다.

```typescript
vi.spyOn(performance, 'now').mockReturnValue(0)
vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
  cb(2000)  // elapsed(2000) > duration(1000) → progress = 1 → 완료
  return 0
})
```

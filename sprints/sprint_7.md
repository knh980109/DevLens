# sprints/sprint_7.md
## 목표: 개발자 분석 페이지 (3:00 ~ 3:30)

## 작업
- [x] `views/DeveloperView.vue` 완성
  - 개발자 카드 그리드 (이름, 역할, 총 PR, 머지율, 평균 품질점수)
  - 카드 클릭 시 상세 모달 오픈
  - 상세 모달: RadarChart + 통계 수치
- [x] `components/charts/RadarChart.vue` - ApexCharts 레이더 차트
  - 5개 축: 속도 / 품질 / 협업 / 일관성 / 커버리지
- [x] 개발자 카드 hover 애니메이션 (transform: translateY)
- [x] 완료 후 sprint_8.md 로 이동

## 관련 커밋
| 커밋 해시 | 메시지 |
|-----------|--------|
| `70bf706` | feat: DevLens AI Code Review Dashboard 초기 구현 |
| `3b048b5` | feat: GC메디아이 브랜딩 적용 및 의료IT 실무 데이터 반영 |

---

## 💡 개발 중 발생한 이슈

### 이슈: RadarChart 초기 데이터 형식 불일치

**문제 상황**

ApexCharts Radar 차트에 개발자 데이터를 넘겼을 때 차트가 빈 상태로 렌더링됐습니다. 콘솔에는 별도 오류 없이 빈 레이더 폴리곤만 표시됐습니다.

**시도**

`series` 데이터를 `[{ name: '김지훈', data: [80, 88, 75, 82, 70] }]` 형태로 직접 하드코딩해 넣어보니 정상 렌더링됐습니다. 문제는 `developers.json`의 `radar` 객체를 배열로 변환하는 로직이 빠져있었습니다.

**해결**

```typescript
// radar 객체 { speed, quality, collaboration, consistency, coverage }
// → ApexCharts가 요구하는 숫자 배열로 변환
const radarData = computed(() => [
  dev.radar.speed,
  dev.radar.quality,
  dev.radar.collaboration,
  dev.radar.consistency,
  dev.radar.coverage
])
```

카테고리 레이블과 데이터 순서를 일치시켜 5축 레이더 차트가 정상 동작했습니다.

### 결정: 개발자 모달 — Vue `<Teleport>` 미적용

**배경**

PrDetailPanel(Sprint 6)과 달리 개발자 레이더 모달은 `DeveloperView.vue` 내부에 직접 렌더링했습니다. 개발자 카드가 있는 컨텐츠 영역 안에서 모달이 열리므로 z-index 충돌 없이 동작했고, Teleport의 추가 복잡도가 불필요하다고 판단했습니다.

# sprints/sprint_8.md
## 목표: AI 인사이트 페이지 (3:30 ~ 4:00)

## 작업
- [x] `views/InsightView.vue` 완성
  - 심각도별 탭 필터 (All / Critical / Warning / Info)
  - 인사이트 카드 리스트
    - 심각도 아이콘 + 색상 (Critical=빨강, Warning=노랑, Info=파랑)
    - 카테고리 배지, 파일명, 라인번호
    - 개선 제안 메시지
  - 카드 마운트 시 순차적 fade-in 애니메이션 (stagger 효과)
- [x] 완료 후 sprint_9.md 로 이동

## 관련 커밋
| 커밋 해시 | 메시지 |
|-----------|--------|
| `70bf706` | feat: DevLens AI Code Review Dashboard 초기 구현 |
| `3b048b5` | feat: GC메디아이 브랜딩 적용 및 의료IT 실무 데이터 반영 |

---

## 💡 개발 중 발생한 이슈

### 이슈: 인사이트 카드 stagger 애니메이션 타이밍

**문제 상황**

인사이트 카드 12개가 순차적으로 나타나는 stagger 효과를 구현할 때, 모든 카드가 동시에 나타나거나 마지막 카드까지 너무 오랜 시간이 걸리는 문제가 있었습니다.

**시도**

처음에 `setTimeout`으로 각 카드 렌더링을 지연시켰으나, `v-for` 루프에서 클로저 참조 문제가 발생했습니다.

**해결**

CSS `animation-delay`를 인라인 스타일로 index에 비례해 적용하는 방식으로 변경했습니다. JavaScript 없이 CSS만으로 stagger를 구현해 코드가 단순해졌습니다.

```vue
<div
  v-for="(insight, i) in filteredInsights"
  :key="insight.id"
  class="insight-card"
  :style="{ animationDelay: `${i * 0.05}s` }"
>
```

카드 12개 기준 마지막 카드까지 0.55초 딜레이로 자연스러운 stagger 효과를 달성했습니다.

### 결정: severity 필터 — 라우터 쿼리 파라미터 미사용

**배경**

`/insights?severity=critical` 형태로 URL에 필터 상태를 반영하는 방식을 검토했으나, 해커톤 시간 제약 상 Pinia 로컬 상태(`selectedTab`)로만 관리하기로 결정했습니다. URL 공유가 필요하지 않은 내부 대시보드이므로 적합한 트레이드오프라고 판단했습니다.

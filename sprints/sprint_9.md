# sprints/sprint_9.md
## 목표: 전체 UI 다듬기 + 반응형 (4:00 ~ 4:30)

## 작업
- [x] 전체 페이지 SCSS 반응형 적용 (1280px / 768px 브레이크포인트)
- [x] 다크모드 전체 페이지 검수 (CSS 변수 기반, App.vue에서 data-theme 토글)
- [x] 페이지 전환 트랜지션 자연스럽게 조정 (fade-slide)
- [x] 로딩 스피너 모든 페이지 적용 확인
- [x] 빈 데이터 Empty State UI 처리 (모든 뷰에 empty-state 블록)
- [x] 전체 흐름 시연 테스트 (서버 실행 후 직접 확인 필요)
  - Overview → PR 목록 → 상세 패널 → 개발자 분석 → AI 인사이트
- [x] 완료 후 sprint_10.md 로 이동

## 관련 커밋
| 커밋 해시 | 메시지 |
|-----------|--------|
| `70bf706` | feat: DevLens AI Code Review Dashboard 초기 구현 |
| `3fcd150` | fix: SVG 인라인 전환 및 색상 시스템 무채색+포인트 그린으로 조정 |
| `52669d1` | chore: sprint.md 체크박스 완료, style.css 제거, CI+deploy 워크플로우 통합 |

---

## 💡 개발 중 발생한 이슈

### 이슈: 1280px~768px 사이 레이아웃 overflow

**문제 상황**

브레이크포인트를 `768px`만 설정했을 때, 1024px 태블릿 환경에서 3열 KPI 카드가 화면 폭을 넘쳐 가로 스크롤이 생겼습니다.

**시도**

`flex-wrap: wrap`으로 대응해보았으나 카드 크기가 불균등하게 줄어드는 문제가 있었습니다.

**해결**

`1280px` 중간 브레이크포인트를 추가해 3열→2열→1열 단계적으로 줄어들도록 수정했습니다.

```scss
.stat-grid {
  grid-template-columns: repeat(3, 1fr);   // 1280px+: 3열

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr); // 768~1279px: 2열
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;            // ~767px: 1열
  }
}
```

### 이슈: 다크모드 전환 시 차트 색상 깜빡임

**문제 상황**

다크모드 토글 클릭 시 CSS Variables로 배경색은 즉시 전환되지만, ApexCharts 내부 SVG 색상이 약 100ms 뒤에 변경되어 깜빡이는 현상이 있었습니다.

**해결**

`App.vue`의 다크모드 상태가 바뀔 때 차트 컴포넌트에 `key`를 갱신해 강제 리마운트하는 방식으로 해결했습니다. 리마운트 시 최신 `data-theme` 값으로 초기화되므로 깜빡임이 사라졌습니다.

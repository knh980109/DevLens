# sprints/sprint_6.md
## 목표: PR 목록 페이지 (2:30 ~ 3:00)

## 작업
- [x] `views/PrListView.vue` 완성
  - 상태별 필터 탭 (All / Open / Merged / Closed)
  - PR 목록 테이블 (제목, 작성자, 리뷰어, 품질점수 배지, 상태 배지, 날짜)
  - 품질점수 색상: 90↑ 초록 / 70~89 노랑 / 70↓ 빨강
  - PR 행 클릭 시 PrDetailPanel 슬라이드 오픈
- [x] `components/pr/PrDetailPanel.vue` 생성
  - 오른쪽에서 슬라이드인 패널
  - PR 상세 정보 + AI 코드 품질 분석 요약
  - ESC 키 / 바깥 클릭 시 닫기
- [x] 완료 후 sprint_7.md 로 이동

## 관련 커밋
| 커밋 해시 | 메시지 |
|-----------|--------|
| `70bf706` | feat: DevLens AI Code Review Dashboard 초기 구현 |

---

## 💡 개발 중 발생한 이슈 및 결정

### 이슈: PrDetailPanel z-index 충돌

**문제 상황**

`PrDetailPanel`을 `PrListView.vue` 내부에 일반 자식 컴포넌트로 배치했을 때, 오버레이가 AppHeader 아래로 가려지거나 다른 요소와 겹치는 z-index 충돌이 발생했습니다. `z-index: 999`로 올려도 AppHeader의 `position: sticky`와 쌓임 맥락(stacking context)이 충돌했습니다.

**시도**

AppHeader의 `z-index`를 낮추거나, `PrDetailPanel`의 부모 요소에 `position: relative`를 제거해보았으나, 다른 페이지에서 레이아웃이 깨지는 부작용이 있었습니다.

**해결**

Vue 3의 `<Teleport to="body">`를 적용했습니다. Teleport는 컴포넌트를 DOM 최상위(`<body>`)에 렌더링하므로 어떤 쌓임 맥락에도 영향을 받지 않습니다. `z-index: 200` 하나로 모든 요소 위에 안정적으로 오버레이가 렌더링됩니다.

```vue
<!-- PrDetailPanel.vue -->
<teleport to="body">
  <transition name="panel">
    <div v-if="pr" class="panel-overlay" @click.self="$emit('close')">
      <div class="panel" role="dialog" aria-modal="true">
        <!-- ... -->
      </div>
    </div>
  </transition>
</teleport>
```

또한 ESC 키 이벤트는 `window.addEventListener`로 전역 등록하고 `onUnmounted`에서 반드시 제거하도록 처리했습니다.

# sprints/sprint_3.md
## 목표: SCSS 디자인 시스템 + 다크모드 (1:00 ~ 1:30)

## 작업
- [x] `frontend/src/assets/styles/_variables.scss` 생성
- [x] `frontend/src/assets/styles/main.scss` - 전역 스타일 + CSS 변수 (다크/라이트)
- [x] `App.vue` - 다크모드 토글 로직 (localStorage 저장)
- [x] `components/common/AppHeader.vue` - 네비게이션 + 다크모드 토글 버튼
- [x] `router/index.js` - 4개 라우트 + 페이지 전환 트랜지션 설정
- [x] `App.vue` 에 fade-slide 트랜지션 적용
- [x] SCSS에 fade-slide 트랜지션 작성
- [x] 완료 후 sprint_4.md 로 이동

## 관련 커밋
| 커밋 해시 | 메시지 |
|-----------|--------|
| `70bf706` | feat: DevLens AI Code Review Dashboard 초기 구현 |
| `3fcd150` | fix: SVG 인라인 전환 및 색상 시스템 무채색+포인트 그린으로 조정 |

---

## 💡 개발 중 발생한 이슈 및 결정

### 이슈: SCSS `@import` Deprecation 경고

**문제 상황**

`_variables.scss`를 다른 파일에서 불러올 때 Vite/Sass가 경고를 출력했습니다.

```
Sass @import rules are deprecated and will be removed in Dart Sass 3.0.
Use @use instead.
```

**시도**

처음에는 경고를 무시하고 진행했으나, 빌드 로그가 지저분해지고 향후 Sass 버전 업그레이드 시 빌드가 깨질 수 있다고 판단했습니다.

**해결**

`@import '_variables'` → `@use 'variables' as *`로 전환했습니다. `as *` 옵션으로 변수에 네임스페이스 없이 접근할 수 있어 기존 코드를 최소한으로 수정했습니다.

### 결정: 다크모드 구현 방식

**배경**

SCSS 변수만으로는 런타임에 테마를 전환할 수 없습니다. JavaScript에서 CSS 변수를 바꾸는 방식이 필요했습니다.

**결정**

`document.documentElement.setAttribute('data-theme', 'dark')` 방식을 채택했습니다. `:root[data-theme="dark"]` 선택자로 CSS Variables를 재정의하면 JavaScript 로직을 최소화하면서 CSS 트랜지션 애니메이션도 자연스럽게 적용됩니다.

```scss
:root { --bg: #ffffff; --text: #111827; }
:root[data-theme="dark"] { --bg: #0f172a; --text: #f1f5f9; }
```

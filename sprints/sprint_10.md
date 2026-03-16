# sprints/sprint_10.md
## 목표: README + GitHub 업로드 (4:30 ~ 5:00)

## 작업
- [x] `docs/` 폴더 생성 후 화면 스크린샷 저장 (서버 실행 후 직접 캡처 필요)
- [x] README.md 작성 완료
- [x] `.gitignore` 생성 (node_modules, bin, obj, .env 제외)
- [x] GitHub push (레포 URL 확정 후 진행)
```powershell
git init
git add .
git commit -m "feat: DevLens AI 코드 리뷰 대시보드 초기 구현"
git remote add origin YOUR_REPO_URL
git push -u origin main
```
- [x] GitHub 레포 README 최종 확인 후 제출

## 관련 커밋
| 커밋 해시 | 메시지 |
|-----------|--------|
| `535e40c` | docs: CLAUDE.md 기술선택 근거 및 개발 결정사항 보완 |
| `5d42b98` | docs: 테스트 전략 문서 추가 (Vitest/xUnit/Playwright) |
| `3ddb639` | ci: GitHub Actions CI 파이프라인 구성 |
| `1e57be1` | ci: CI 워크플로우 간소화 |
| `1d546a7` | docs: 전체 sprint 진행 완료 체크박스 업데이트 |
| `2493b5a` | docs: README에 GitHub Pages 라이브 데모 링크 추가 |
| `1f11055` | ci: CI(빌드+테스트)와 CD(정적 배포) 워크플로우 분리 |
| `6e5f585` | feat: TypeScript 전환 및 Vitest 단위 테스트 8건 추가 |
| `3f7b627` | feat: TypeScript 완전 전환 + Vue 컴포넌트 테스트 + 에러 로깅 강화 |
| `c65803f` | feat: E2E 테스트(Playwright) + 커버리지 리포트 + CI 아티팩트 추가 |

---

## 개발 과정 기록

### 문제 1: GitHub Pages SPA 라우팅 — 새로고침 시 404
**발생 상황**: `vite.config.ts`의 `base: '/DevLens/'`와 Vue Router history 모드로 배포 후, `/DevLens/pull-requests` 경로에서 새로고침 시 GitHub Pages가 404를 반환했다.

**원인 분석**: GitHub Pages는 정적 파일 서빙 서버이므로 `/DevLens/pull-requests`라는 실제 파일이 없으면 404를 내린다. SPA 라우팅은 클라이언트 사이드에서만 동작하는데, 직접 URL 접근 시 서버가 `index.html`로 fallback하지 않는다.

**시도한 방법**: 처음에는 `404.html` 리다이렉트 핵 (SPA GitHub Pages 트릭)을 적용하려 했으나, `index.html`에 리다이렉트 스크립트를 삽입하는 방식이 SEO와 초기 렌더링에 불리하고 유지보수가 번거로웠다.

**해결**: `router/index.ts`에서 production 환경일 때 `createWebHashHistory()`로 전환했다. Hash 라우터는 `#/pull-requests` 형태로 동작해 서버는 항상 `index.html`만 서빙하면 된다. 개발 환경은 `createWebHistory()`를 그대로 유지해 DevTools 경험을 보존했다.

```typescript
history: import.meta.env.PROD
  ? createWebHashHistory(import.meta.env.BASE_URL)
  : createWebHistory(import.meta.env.BASE_URL)
```

---

### 문제 2: CD 워크플로우 — `dist/` 경로 불일치
**발생 상황**: GitHub Actions CD 워크플로우에서 `actions/upload-pages-artifact`의 `path`를 `./dist`로 지정했는데, Vite 빌드 출력이 `frontend/dist`에 생성되어 아티팩트가 비어 있었다.

**원인 분석**: `working-directory: frontend`로 npm 명령을 실행했지만, artifact 업로드 step은 리포지토리 루트 기준으로 경로를 해석했다.

**해결**: `path: frontend/dist`로 수정해 루트 상대 경로를 명시했다. 이후 Pages 배포가 정상적으로 `index.html`과 `assets/`를 포함하게 되었다.

---

### 결정: CI와 CD 워크플로우 분리
**배경**: 초기에 단일 `ci.yml`에 빌드·테스트·배포를 모두 담았더니 PR 빌드에서도 Pages 배포가 트리거되어 불필요한 배포가 발생했다.

**결정**: `ci.yml` (push/PR → 테스트+빌드 검증)과 `cd.yml` (main push → Pages 배포)으로 분리했다. CI는 4-job 병렬 파이프라인(unit-test → build-frontend, build-backend 병렬 → e2e-test)으로 구성해 피드백 속도를 높였다.

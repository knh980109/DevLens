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

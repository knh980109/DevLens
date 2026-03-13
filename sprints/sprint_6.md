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

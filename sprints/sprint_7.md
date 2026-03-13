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

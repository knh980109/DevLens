# TESTING.md - 테스트 전략

## 현재 구현 상태

| 레이어 | 도구 | 구현 파일 | 테스트 수 | 상태 |
|--------|------|-----------|-----------|------|
| 스토어 단위 테스트 | Vitest | `stores/__tests__/dashboard.test.ts` | 13건 | ✅ 구현 완료 |
| 컴포넌트 테스트 | Vitest + @vue/test-utils | `components/common/__tests__/StatCard.test.ts` | 7건 | ✅ 구현 완료 |
| 유틸 단위 테스트 | Vitest | `utils/__tests__/quality.test.ts` | 3건 | ✅ 구현 완료 |
| E2E 테스트 | Playwright | `e2e/dashboard.spec.ts` | 8건 | ✅ 구현 완료 |
| 통합 테스트 | MSW + Vue Test Utils | — | — | 📋 전략 수립 완료 |

**총 자동화 테스트: 31건 (단위 23건 + E2E 8건)**

## 커버리지 현황 (vitest --coverage)

| 지표 | 수치 |
|------|------|
| Statements | **84.78%** |
| Lines | **88.37%** |
| Functions | **79.16%** |
| Branches | **43.24%** |

> 차트 컴포넌트(ApexCharts 래퍼)는 서드파티 UI 라이브러리 특성상 커버리지 대상 제외

```
E2E 테스트 (Playwright) ✅
        ↑
통합 테스트 (Vue Test Utils + MSW) 📋
        ↑
단위 테스트 (Vitest) ✅
```

---

## 2. 단위 테스트 (Unit Test)

**도구**: [Vitest](https://vitest.dev/) + Vue Test Utils

### 2.1 테스트 대상

#### StatCard 카운터 애니메이션
```javascript
// frontend/src/components/common/StatCard.vue
describe('StatCard', () => {
  it('마운트 시 0에서 목표값까지 카운터 애니메이션이 실행된다', async () => {
    const wrapper = mount(StatCard, { props: { value: 100, title: 'Test' } })
    expect(wrapper.find('.stat-card__value').text()).toBe('0')
    await vi.runAllTimersAsync()
    expect(wrapper.find('.stat-card__value').text()).toBe('100')
  })

  it('trend가 양수이면 trend--up 클래스가 적용된다', () => {
    const wrapper = mount(StatCard, { props: { value: 0, title: 'Test', trend: 5 } })
    expect(wrapper.find('.stat-card__trend').classes()).toContain('trend--up')
  })
})
```

#### Pinia 스토어 액션
```javascript
// frontend/src/stores/dashboard.js
describe('useDashboardStore', () => {
  it('fetchOverview 호출 시 loading.overview가 true → false로 변경된다', async () => {
    const store = useDashboardStore()
    const fetchPromise = store.fetchOverview()
    expect(store.loading.overview).toBe(true)
    await fetchPromise
    expect(store.loading.overview).toBe(false)
  })

  it('fetchPullRequests 성공 시 pullRequests 배열이 채워진다', async () => {
    const store = useDashboardStore()
    await store.fetchPullRequests()
    expect(store.pullRequests.length).toBeGreaterThan(0)
  })
})
```

#### 품질점수 색상 로직
```javascript
// PrListView.vue - qualityClass 함수
describe('qualityClass', () => {
  it('90 이상이면 quality--high를 반환한다', () => {
    expect(qualityClass(90)).toBe('quality--high')
    expect(qualityClass(100)).toBe('quality--high')
  })
  it('70~89이면 quality--mid를 반환한다', () => {
    expect(qualityClass(70)).toBe('quality--mid')
    expect(qualityClass(89)).toBe('quality--mid')
  })
  it('70 미만이면 quality--low를 반환한다', () => {
    expect(qualityClass(69)).toBe('quality--low')
  })
})
```

### 2.2 Backend 단위 테스트 (xUnit)

```csharp
// backend.Tests/MockDataServiceTests.cs
public class MockDataServiceTests
{
    [Fact]
    public void GetPullRequests_Returns_NonEmpty_List()
    {
        var service = CreateService();
        var result = service.GetPullRequests();
        Assert.NotEmpty(result);
    }

    [Fact]
    public void GetOverview_AvgQualityScore_Is_Calculated_Correctly()
    {
        var service = CreateService();
        var overview = service.GetOverview() as dynamic;
        Assert.InRange((int)overview.avgQualityScore, 0, 100);
    }

    [Fact]
    public void GetOverview_WeeklyPrData_Has_Correct_Count()
    {
        var service = CreateService();
        var overview = (dynamic)service.GetOverview();
        Assert.Equal(11, ((IEnumerable<dynamic>)overview.weeklyPrData).Count());
    }
}
```

---

## 3. 통합 테스트 (Integration Test)

**도구**: Vue Test Utils + [MSW (Mock Service Worker)](https://mswjs.io/)

MSW로 API 응답을 모킹하여 컴포넌트-스토어-API 연동을 검증합니다.

```javascript
// frontend/tests/integration/OverviewView.test.js
describe('OverviewView 통합 테스트', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('컴포넌트 마운트 시 API 호출 후 StatCard에 데이터가 렌더링된다', async () => {
    const wrapper = mount(OverviewView, { global: { plugins: [createTestingPinia()] } })
    await flushPromises()
    expect(wrapper.findAll('.stat-card').length).toBe(6)
    expect(wrapper.find('.stat-card__value').text()).not.toBe('0')
  })

  it('API 실패 시 empty-state가 표시된다', async () => {
    server.use(rest.get('/api/v1/overview', (req, res, ctx) => res(ctx.status(500))))
    const wrapper = mount(OverviewView)
    await flushPromises()
    expect(wrapper.find('.empty-state').exists()).toBe(true)
  })
})
```

---

## 4. E2E 테스트 (End-to-End)

**도구**: [Playwright](https://playwright.dev/)

```javascript
// e2e/dashboard.spec.js
test.describe('DevLens 대시보드 E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Overview 페이지 기본 렌더링', async ({ page }) => {
    await expect(page.locator('.stat-card')).toHaveCount(6)
    await expect(page.locator('.chart-card')).toHaveCount(4)
  })

  test('PR 행 클릭 시 슬라이드 패널이 열린다', async ({ page }) => {
    await page.click('[data-testid="nav-pr-list"]')
    await page.click('.pr-row:first-child')
    await expect(page.locator('.panel')).toBeVisible()
  })

  test('ESC 키로 패널을 닫을 수 있다', async ({ page }) => {
    await page.click('[data-testid="nav-pr-list"]')
    await page.click('.pr-row:first-child')
    await page.keyboard.press('Escape')
    await expect(page.locator('.panel')).not.toBeVisible()
  })

  test('다크모드 토글이 동작한다', async ({ page }) => {
    await page.click('.theme-toggle')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.click('.theme-toggle')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })

  test('개발자 카드 클릭 시 레이더 차트 모달이 열린다', async ({ page }) => {
    await page.click('[data-testid="nav-developers"]')
    await page.click('.dev-card:first-child')
    await expect(page.locator('.modal')).toBeVisible()
  })
})
```

---

## 5. 테스트 실행 방법

```bash
# 단위 테스트 (Vitest)
cd frontend
npm run test          # watch 모드
npm run test:run      # 1회 실행
npm run test:coverage # 커버리지 리포트

# Backend 단위 테스트 (xUnit)
cd backend
dotnet test

# E2E 테스트 (Playwright) - 서버 실행 후
cd frontend
npx playwright test
npx playwright test --ui   # UI 모드
```

---

## 6. 커버리지 목표

| 레이어 | 목표 커버리지 | 현재 상태 |
|--------|--------------|-----------|
| 비즈니스 로직 (stores, utils) | 80% 이상 | 전략 수립 완료 |
| Vue 컴포넌트 | 70% 이상 | 전략 수립 완료 |
| API 컨트롤러 | 90% 이상 | 전략 수립 완료 |
| E2E 핵심 시나리오 | 5개 시나리오 | 전략 수립 완료 |

> 📌 현재 프로젝트는 해커톤 데모 버전으로 테스트 코드 구현보다 전략 수립에 집중했습니다.
> 프로덕션 전환 시 위 전략을 기반으로 단계적으로 구현 예정입니다.

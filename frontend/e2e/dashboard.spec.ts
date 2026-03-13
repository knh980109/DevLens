import { test, expect } from '@playwright/test'

test.describe('DevLens 대시보드 E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Mock 데이터 로딩 대기
    await page.waitForLoadState('networkidle')
  })

  test('Overview 페이지 — 6개 KPI 카드가 렌더링된다', async ({ page }) => {
    await page.goto('/overview')
    await expect(page.locator('.stat-card')).toHaveCount(6)
  })

  test('Overview 페이지 — 차트 영역이 존재한다', async ({ page }) => {
    await page.goto('/overview')
    await expect(page.locator('.chart-card').first()).toBeVisible()
  })

  test('네비게이션 — PR 목록 페이지로 이동한다', async ({ page }) => {
    await page.goto('/overview')
    await page.click('a[href="/pull-requests"]')
    await expect(page).toHaveURL(/pull-requests/)
    await expect(page.locator('.pr-row').first()).toBeVisible()
  })

  test('네비게이션 — 개발자 페이지로 이동한다', async ({ page }) => {
    await page.goto('/overview')
    await page.click('a[href="/developers"]')
    await expect(page).toHaveURL(/developers/)
    await expect(page.locator('.dev-card').first()).toBeVisible()
  })

  test('네비게이션 — AI 인사이트 페이지로 이동한다', async ({ page }) => {
    await page.goto('/overview')
    await page.click('a[href="/insights"]')
    await expect(page).toHaveURL(/insights/)
    await expect(page.locator('.insight-card').first()).toBeVisible()
  })

  test('PR 슬라이드 패널 — PR 행 클릭 시 패널이 열린다', async ({ page }) => {
    await page.goto('/pull-requests')
    await page.click('.pr-row:first-child')
    await expect(page.locator('.panel')).toBeVisible()
  })

  test('PR 슬라이드 패널 — ESC 키로 닫힌다', async ({ page }) => {
    await page.goto('/pull-requests')
    await page.click('.pr-row:first-child')
    await expect(page.locator('.panel')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.panel')).not.toBeVisible()
  })

  test('다크모드 — 토글 클릭 시 data-theme이 변경된다', async ({ page }) => {
    await page.goto('/overview')
    await page.click('.theme-toggle')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.click('.theme-toggle')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })
})

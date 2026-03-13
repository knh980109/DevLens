import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { useDashboardStore } from '../dashboard'

vi.mock('axios')
const mockedAxios = vi.mocked(axios, true)

const mockOverviewData = {
  totalPr: 25,
  openPr: 5,
  mergedPr: 18,
  closedPr: 2,
  avgQualityScore: 89,
  avgReviewHours: 16,
  totalAdditions: 4800,
  totalDeletions: 1700,
  weeklyPrData: [],
  qualityTrend: [],
  developerPrCounts: []
}

const mockPrData = [
  { id: 1, title: 'feat: EMR 환자 기본정보 조회 API 캐싱', author: '김지훈', reviewer: '이수민',
    status: 'merged' as const, createdAt: '2024-11-04', mergedAt: '2024-11-06',
    qualityScore: 92, comments: 7, additions: 245, deletions: 38 }
]

describe('useDashboardStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('fetchOverview', () => {
    it('API 성공 시 overview 데이터가 저장된다', async () => {
      mockedAxios.get = vi.fn().mockResolvedValue({ data: mockOverviewData })
      const store = useDashboardStore()

      await store.fetchOverview()

      expect(store.overview?.totalPr).toBe(25)
      expect(store.overview?.avgQualityScore).toBe(89)
    })

    it('fetchOverview 호출 중 loading.overview가 true가 된다', async () => {
      let resolveApi!: (v: unknown) => void
      mockedAxios.get = vi.fn().mockReturnValue(new Promise(r => { resolveApi = r }))
      const store = useDashboardStore()

      const promise = store.fetchOverview()
      expect(store.loading.overview).toBe(true)

      resolveApi({ data: mockOverviewData })
      await promise
      expect(store.loading.overview).toBe(false)
    })

    it('API 실패 시 Mock 데이터로 fallback된다', async () => {
      mockedAxios.get = vi.fn().mockRejectedValue(new Error('Network Error'))
      const store = useDashboardStore()

      await store.fetchOverview()

      expect(store.overview).not.toBeNull()
      expect(store.overview?.totalPr).toBeGreaterThan(0)
      expect(store.loading.overview).toBe(false)
    })
  })

  describe('fetchPullRequests', () => {
    it('API 성공 시 pullRequests 배열이 채워진다', async () => {
      mockedAxios.get = vi.fn().mockResolvedValue({ data: mockPrData })
      const store = useDashboardStore()

      await store.fetchPullRequests()

      expect(store.pullRequests).toHaveLength(1)
      expect(store.pullRequests[0].author).toBe('김지훈')
    })

    it('API 실패 시 Mock PR 데이터로 fallback된다', async () => {
      mockedAxios.get = vi.fn().mockRejectedValue(new Error('Network Error'))
      const store = useDashboardStore()

      await store.fetchPullRequests()

      expect(store.pullRequests.length).toBeGreaterThan(0)
    })
  })

  describe('fetchDevelopers', () => {
    it('API 실패 시 Mock 개발자 데이터 7명이 로드된다', async () => {
      mockedAxios.get = vi.fn().mockRejectedValue(new Error('Network Error'))
      const store = useDashboardStore()

      await store.fetchDevelopers()

      expect(store.developers).toHaveLength(7)
      expect(store.developers[0].name).toBe('김지훈')
    })
  })

  describe('fetchInsights', () => {
    it('API 실패 시 Mock 인사이트 12건이 로드된다', async () => {
      mockedAxios.get = vi.fn().mockRejectedValue(new Error('Network Error'))
      const store = useDashboardStore()

      await store.fetchInsights()

      expect(store.insights).toHaveLength(12)
    })

    it('인사이트에 critical severity가 포함된다', async () => {
      mockedAxios.get = vi.fn().mockRejectedValue(new Error('Network Error'))
      const store = useDashboardStore()

      await store.fetchInsights()

      const criticals = store.insights.filter(i => i.severity === 'critical')
      expect(criticals.length).toBeGreaterThan(0)
    })
  })
})

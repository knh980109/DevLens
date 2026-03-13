import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import { getMockOverview } from '@/mock/overview'
import mockPullRequests from '@/mock/pull_requests.json'
import mockDevelopers from '@/mock/developers.json'
import mockInsights from '@/mock/ai_insights.json'
import type { Overview, PullRequest, Developer, AiInsight } from '@/types/index'

interface LoadingState {
  overview: boolean
  pullRequests: boolean
  developers: boolean
  insights: boolean
}

interface DashboardState {
  overview: Overview | null
  pullRequests: PullRequest[]
  developers: Developer[]
  insights: AiInsight[]
  loading: LoadingState
  errors: Partial<Record<keyof LoadingState, string>>
}

function logApiError(action: string, err: unknown): void {
  const message = err instanceof AxiosError
    ? `[${err.response?.status ?? 'NETWORK'}] ${err.message}`
    : String(err)
  console.warn(`[DevLens] ${action} API 실패 — Mock 데이터로 fallback. (${message})`)
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    overview: null,
    pullRequests: [],
    developers: [],
    insights: [],
    loading: {
      overview: false,
      pullRequests: false,
      developers: false,
      insights: false
    },
    errors: {}
  }),
  actions: {
    async fetchOverview(): Promise<void> {
      this.loading.overview = true
      this.errors.overview = undefined
      try {
        const { data } = await axios.get<Overview>('/api/v1/overview')
        this.overview = data
      } catch (err) {
        logApiError('fetchOverview', err)
        this.errors.overview = 'API 연결 실패 — Mock 데이터 표시 중'
        this.overview = getMockOverview()
      } finally {
        this.loading.overview = false
      }
    },
    async fetchPullRequests(): Promise<void> {
      this.loading.pullRequests = true
      this.errors.pullRequests = undefined
      try {
        const { data } = await axios.get<PullRequest[]>('/api/v1/pull-requests')
        this.pullRequests = data
      } catch (err) {
        logApiError('fetchPullRequests', err)
        this.errors.pullRequests = 'API 연결 실패 — Mock 데이터 표시 중'
        this.pullRequests = mockPullRequests as PullRequest[]
      } finally {
        this.loading.pullRequests = false
      }
    },
    async fetchDevelopers(): Promise<void> {
      this.loading.developers = true
      this.errors.developers = undefined
      try {
        const { data } = await axios.get<Developer[]>('/api/v1/developers')
        this.developers = data
      } catch (err) {
        logApiError('fetchDevelopers', err)
        this.errors.developers = 'API 연결 실패 — Mock 데이터 표시 중'
        this.developers = mockDevelopers as Developer[]
      } finally {
        this.loading.developers = false
      }
    },
    async fetchInsights(): Promise<void> {
      this.loading.insights = true
      this.errors.insights = undefined
      try {
        const { data } = await axios.get<AiInsight[]>('/api/v1/insights')
        this.insights = data
      } catch (err) {
        logApiError('fetchInsights', err)
        this.errors.insights = 'API 연결 실패 — Mock 데이터 표시 중'
        this.insights = mockInsights as AiInsight[]
      } finally {
        this.loading.insights = false
      }
    }
  }
})

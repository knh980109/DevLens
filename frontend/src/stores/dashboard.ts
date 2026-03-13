import { defineStore } from 'pinia'
import axios from 'axios'
import { getMockOverview } from '@/mock/overview.js'
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
    }
  }),
  actions: {
    async fetchOverview(): Promise<void> {
      this.loading.overview = true
      try {
        const { data } = await axios.get<Overview>('/api/v1/overview')
        this.overview = data
      } catch {
        this.overview = getMockOverview()
      } finally {
        this.loading.overview = false
      }
    },
    async fetchPullRequests(): Promise<void> {
      this.loading.pullRequests = true
      try {
        const { data } = await axios.get<PullRequest[]>('/api/v1/pull-requests')
        this.pullRequests = data
      } catch {
        this.pullRequests = mockPullRequests as PullRequest[]
      } finally {
        this.loading.pullRequests = false
      }
    },
    async fetchDevelopers(): Promise<void> {
      this.loading.developers = true
      try {
        const { data } = await axios.get<Developer[]>('/api/v1/developers')
        this.developers = data
      } catch {
        this.developers = mockDevelopers as Developer[]
      } finally {
        this.loading.developers = false
      }
    },
    async fetchInsights(): Promise<void> {
      this.loading.insights = true
      try {
        const { data } = await axios.get<AiInsight[]>('/api/v1/insights')
        this.insights = data
      } catch {
        this.insights = mockInsights as AiInsight[]
      } finally {
        this.loading.insights = false
      }
    }
  }
})

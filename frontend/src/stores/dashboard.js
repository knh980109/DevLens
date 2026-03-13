import { defineStore } from 'pinia'
import axios from 'axios'
import { getMockOverview } from '@/mock/overview.js'
import mockPullRequests from '@/mock/pull_requests.json'
import mockDevelopers from '@/mock/developers.json'
import mockInsights from '@/mock/ai_insights.json'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
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
    async fetchOverview() {
      this.loading.overview = true
      try {
        const { data } = await axios.get('/api/v1/overview')
        this.overview = data
      } catch {
        this.overview = getMockOverview()
      } finally {
        this.loading.overview = false
      }
    },
    async fetchPullRequests() {
      this.loading.pullRequests = true
      try {
        const { data } = await axios.get('/api/v1/pull-requests')
        this.pullRequests = data
      } catch {
        this.pullRequests = mockPullRequests
      } finally {
        this.loading.pullRequests = false
      }
    },
    async fetchDevelopers() {
      this.loading.developers = true
      try {
        const { data } = await axios.get('/api/v1/developers')
        this.developers = data
      } catch {
        this.developers = mockDevelopers
      } finally {
        this.loading.developers = false
      }
    },
    async fetchInsights() {
      this.loading.insights = true
      try {
        const { data } = await axios.get('/api/v1/insights')
        this.insights = data
      } catch {
        this.insights = mockInsights
      } finally {
        this.loading.insights = false
      }
    }
  }
})

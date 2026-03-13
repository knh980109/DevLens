import { defineStore } from 'pinia'
import axios from 'axios'

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
      } finally {
        this.loading.overview = false
      }
    },
    async fetchPullRequests() {
      this.loading.pullRequests = true
      try {
        const { data } = await axios.get('/api/v1/pull-requests')
        this.pullRequests = data
      } finally {
        this.loading.pullRequests = false
      }
    },
    async fetchDevelopers() {
      this.loading.developers = true
      try {
        const { data } = await axios.get('/api/v1/developers')
        this.developers = data
      } finally {
        this.loading.developers = false
      }
    },
    async fetchInsights() {
      this.loading.insights = true
      try {
        const { data } = await axios.get('/api/v1/insights')
        this.insights = data
      } finally {
        this.loading.insights = false
      }
    }
  }
})

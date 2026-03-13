export interface PullRequest {
  id: number
  title: string
  author: string
  reviewer: string
  status: 'open' | 'merged' | 'closed'
  createdAt: string
  mergedAt: string | null
  qualityScore: number
  comments: number
  additions: number
  deletions: number
}

export interface DeveloperRadar {
  speed: number
  quality: number
  collaboration: number
  consistency: number
  coverage: number
}

export interface Developer {
  id: number
  name: string
  role: string
  totalPr: number
  mergedPr: number
  avgQuality: number
  avgReviewHours: number
  radar: DeveloperRadar
}

export interface AiInsight {
  id: number
  severity: 'critical' | 'warning' | 'info'
  category: string
  title: string
  description: string
  file: string
  line: number | null
  suggestion: string
}

export interface WeeklyPrData {
  week: string
  count: number
  merged: number
}

export interface QualityTrend {
  week: string
  score: number
}

export interface DeveloperPrCount {
  name: string
  count: number
  merged: number
}

export interface Overview {
  totalPr: number
  openPr: number
  mergedPr: number
  closedPr: number
  avgQualityScore: number
  avgReviewHours: number
  totalAdditions: number
  totalDeletions: number
  weeklyPrData: WeeklyPrData[]
  qualityTrend: QualityTrend[]
  developerPrCounts: DeveloperPrCount[]
}

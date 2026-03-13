import type { Overview } from '@/types/index'
import pullRequests from './pull_requests.json'
import developers from './developers.json'

export function getMockOverview(): Overview {
  const prs = pullRequests
  const devs = developers
  return {
    totalPr: prs.length,
    openPr: prs.filter(p => p.status === 'open').length,
    mergedPr: prs.filter(p => p.status === 'merged').length,
    closedPr: prs.filter(p => p.status === 'closed').length,
    avgQualityScore: Math.round(prs.reduce((s, p) => s + p.qualityScore, 0) / prs.length),
    avgReviewHours: Math.round(devs.reduce((s, d) => s + d.avgReviewHours, 0) / devs.length),
    totalAdditions: prs.reduce((s, p) => s + p.additions, 0),
    totalDeletions: prs.reduce((s, p) => s + p.deletions, 0),
    weeklyPrData: [
      { week: '9/3주',  count: 4,  merged: 3 },
      { week: '9/4주',  count: 6,  merged: 5 },
      { week: '10/1주', count: 5,  merged: 4 },
      { week: '10/2주', count: 8,  merged: 7 },
      { week: '10/3주', count: 7,  merged: 5 },
      { week: '10/4주', count: 9,  merged: 8 },
      { week: '11/1주', count: 11, merged: 9 },
      { week: '11/2주', count: 10, merged: 8 },
      { week: '11/3주', count: 13, merged: 11 },
      { week: '11/4주', count: 15, merged: 13 },
      { week: '12/1주', count: 7,  merged: 5 }
    ],
    qualityTrend: [
      { week: '9/3주',  score: 81 },
      { week: '9/4주',  score: 83 },
      { week: '10/1주', score: 80 },
      { week: '10/2주', score: 85 },
      { week: '10/3주', score: 87 },
      { week: '10/4주', score: 86 },
      { week: '11/1주', score: 89 },
      { week: '11/2주', score: 88 },
      { week: '11/3주', score: 91 },
      { week: '11/4주', score: 90 },
      { week: '12/1주', score: 92 }
    ],
    developerPrCounts: devs.map(d => ({ name: d.name, count: d.totalPr, merged: d.mergedPr }))
  }
}

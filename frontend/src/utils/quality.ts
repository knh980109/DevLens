export function qualityClass(score: number): string {
  if (score >= 90) return 'quality--high'
  if (score >= 70) return 'quality--mid'
  return 'quality--low'
}

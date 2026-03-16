import { AxiosError } from 'axios'

const LOG_PREFIX = '[DevLens]'

/**
 * 에러 객체에서 상세 메시지를 추출한다.
 * - AxiosError: `[HTTP상태] 메시지` 형식
 * - 그 외: String() 변환
 */
export function extractErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    const status = err.response?.status ?? 'NETWORK'
    return `[${status}] ${err.message}`
  }
  return String(err)
}

/**
 * API 실패를 일관된 포맷으로 console.warn에 기록한다.
 * 형식: [DevLens] {action} API 실패 — Mock 데이터로 fallback. ({에러 상세})
 */
export function logApiError(action: string, err: unknown): void {
  const detail = extractErrorMessage(err)
  console.warn(`${LOG_PREFIX} ${action} API 실패 — Mock 데이터로 fallback. (${detail})`)
}

/**
 * 에러 종류에 따라 사용자에게 표시할 배너 메시지를 반환한다.
 * - 5xx 서버 오류 / 4xx 요청 오류 / 네트워크 오류 세 가지를 구분
 */
export function toUserMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    const status = err.response?.status
    if (status && status >= 500) return 'API 서버 오류 — Mock 데이터 표시 중'
    if (status && status >= 400) return 'API 요청 오류 — Mock 데이터 표시 중'
  }
  return 'API 연결 실패 — Mock 데이터 표시 중'
}

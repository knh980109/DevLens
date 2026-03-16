import { describe, it, expect, vi, afterEach } from 'vitest'
import { AxiosError } from 'axios'
import { extractErrorMessage, logApiError, toUserMessage } from '../errorHandler'

describe('errorHandler', () => {
  afterEach(() => vi.restoreAllMocks())

  describe('extractErrorMessage', () => {
    it('AxiosError에서 [상태코드] 메시지 형식으로 추출한다', () => {
      const err = new AxiosError('Request failed', 'ERR_BAD_RESPONSE',
        undefined, undefined,
        { status: 503, data: {}, statusText: 'Service Unavailable', headers: {}, config: {} as never })

      expect(extractErrorMessage(err)).toBe('[503] Request failed')
    })

    it('네트워크 오류(응답 없음)이면 [NETWORK]를 반환한다', () => {
      const err = new AxiosError('Network Error')

      expect(extractErrorMessage(err)).toBe('[NETWORK] Network Error')
    })

    it('일반 Error 객체는 문자열로 변환된다', () => {
      expect(extractErrorMessage(new Error('unknown'))).toBe('Error: unknown')
    })
  })

  describe('logApiError', () => {
    it('[DevLens] 접두어와 action명을 포함해 console.warn을 호출한다', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      logApiError('fetchOverview', new Error('test error'))

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[DevLens]')
      )
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('fetchOverview')
      )
    })

    it('fallback 안내 문구가 포함된다', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      logApiError('fetchInsights', new AxiosError('timeout'))

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Mock 데이터로 fallback')
      )
    })
  })

  describe('toUserMessage', () => {
    it('5xx 에러는 서버 오류 메시지를 반환한다', () => {
      const err = new AxiosError('Internal Server Error', 'ERR_BAD_RESPONSE',
        undefined, undefined,
        { status: 500, data: {}, statusText: '', headers: {}, config: {} as never })

      expect(toUserMessage(err)).toBe('API 서버 오류 — Mock 데이터 표시 중')
    })

    it('4xx 에러는 요청 오류 메시지를 반환한다', () => {
      const err = new AxiosError('Not Found', 'ERR_BAD_RESPONSE',
        undefined, undefined,
        { status: 404, data: {}, statusText: '', headers: {}, config: {} as never })

      expect(toUserMessage(err)).toBe('API 요청 오류 — Mock 데이터 표시 중')
    })

    it('네트워크 오류(응답 없음)는 연결 실패 메시지를 반환한다', () => {
      const err = new AxiosError('Network Error')

      expect(toUserMessage(err)).toBe('API 연결 실패 — Mock 데이터 표시 중')
    })

    it('일반 Error는 연결 실패 메시지를 반환한다', () => {
      expect(toUserMessage(new Error('unknown'))).toBe('API 연결 실패 — Mock 데이터 표시 중')
    })
  })
})

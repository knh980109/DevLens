import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import StatCard from '../StatCard.vue'

describe('StatCard', () => {
  beforeEach(() => {
    // startTime = 0, rAF callback now = 2000 → elapsed(2000) > duration(1000) → progress = 1 → 재귀 없음
    vi.spyOn(performance, 'now').mockReturnValue(0)
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(2000)
      return 0
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('title과 icon props가 렌더링된다', () => {
    const wrapper = mount(StatCard, {
      props: { title: '전체 PR', value: 25, icon: '📋' }
    })
    expect(wrapper.find('.stat-card__title').text()).toBe('전체 PR')
    expect(wrapper.find('.stat-card__icon').text()).toBe('📋')
  })

  it('unit prop이 있으면 단위가 표시된다', () => {
    const wrapper = mount(StatCard, {
      props: { title: '평균 리뷰시간', value: 16, unit: 'h' }
    })
    expect(wrapper.find('.stat-card__unit').text()).toBe('h')
  })

  it('unit prop이 없으면 단위 엘리먼트가 없다', () => {
    const wrapper = mount(StatCard, {
      props: { title: '전체 PR', value: 25 }
    })
    expect(wrapper.find('.stat-card__unit').exists()).toBe(false)
  })

  it('trend가 양수이면 trend--up 클래스가 적용된다', () => {
    const wrapper = mount(StatCard, {
      props: { title: 'Test', value: 0, trend: 5 }
    })
    expect(wrapper.find('.stat-card__trend').classes()).toContain('trend--up')
  })

  it('trend가 음수이면 trend--down 클래스가 적용된다', () => {
    const wrapper = mount(StatCard, {
      props: { title: 'Test', value: 0, trend: -3 }
    })
    expect(wrapper.find('.stat-card__trend').classes()).toContain('trend--down')
  })

  it('trend가 없으면 trend 엘리먼트가 렌더링되지 않는다', () => {
    const wrapper = mount(StatCard, {
      props: { title: 'Test', value: 0 }
    })
    expect(wrapper.find('.stat-card__trend').exists()).toBe(false)
  })

  it('color prop이 CSS 변수로 style에 적용된다', () => {
    const wrapper = mount(StatCard, {
      props: { title: 'Test', value: 0, color: '#00965E' }
    })
    expect(wrapper.find('.stat-card').attributes('style')).toContain('#00965E')
  })
})

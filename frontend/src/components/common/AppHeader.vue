<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="logo">
        <svg class="logo-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="34" height="34">
          <rect width="44" height="44" rx="10" fill="#00965E"/>
          <circle cx="19" cy="19" r="9" fill="none" stroke="white" stroke-width="3"/>
          <line x1="25.5" y1="25.5" x2="33" y2="33" stroke="white" stroke-width="3" stroke-linecap="round"/>
          <circle cx="16" cy="15" r="2.5" fill="rgba(255,255,255,0.35)"/>
        </svg>
        <div class="logo-texts">
          <span class="logo-text">DevLens</span>
          <span class="logo-sub">GC메디아이 코드 리뷰 대시보드</span>
        </div>
      </div>
      <nav class="nav">
        <router-link to="/overview" class="nav-link" data-testid="nav-overview">Overview</router-link>
        <router-link to="/pull-requests" class="nav-link" data-testid="nav-pr-list">PR 목록</router-link>
        <router-link to="/developers" class="nav-link" data-testid="nav-developers">개발자</router-link>
        <router-link to="/insights" class="nav-link" data-testid="nav-insights">AI 인사이트</router-link>
      </nav>
      <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '라이트모드' : '다크모드'">
        {{ isDark ? '☀️' : '🌙' }}
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'

interface ThemeContext { isDark: Ref<boolean>; toggleTheme: () => void }
const { isDark, toggleTheme } = inject<ThemeContext>('theme')!
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  transition: background-color var(--transition), border-color var(--transition);
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo-img {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.logo-texts {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.logo-text {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
}

.logo-sub {
  font-size: 0.65rem;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: -0.01em;
}

.nav {
  display: flex;
  gap: 0.25rem;
  flex: 1;
}

.nav-link {
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 0.9rem;
  transition: background-color var(--transition), color var(--transition);

  &:hover {
    background: var(--bg);
    color: var(--text);
  }

  &.router-link-active {
    background: var(--primary);
    color: #fff;
  }
}

.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  font-size: 1rem;
  transition: border-color var(--transition);

  &:hover {
    border-color: var(--primary);
  }
}
</style>

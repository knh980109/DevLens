<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="logo">
        <span class="logo-icon">&#128269;</span>
        <span class="logo-text">DevLens</span>
      </div>
      <nav class="nav">
        <router-link to="/overview" class="nav-link">Overview</router-link>
        <router-link to="/pull-requests" class="nav-link">PR 목록</router-link>
        <router-link to="/developers" class="nav-link">개발자</router-link>
        <router-link to="/insights" class="nav-link">AI 인사이트</router-link>
      </nav>
      <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '라이트모드' : '다크모드'">
        {{ isDark ? '☀️' : '🌙' }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { inject } from 'vue'
const { isDark, toggleTheme } = inject('theme')
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
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary);
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

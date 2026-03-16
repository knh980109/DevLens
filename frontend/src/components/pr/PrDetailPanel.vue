<template>
  <teleport to="body">
    <transition name="panel">
      <div v-if="pr" class="panel-overlay" @click.self="$emit('close')">
        <div class="panel" role="dialog" aria-modal="true">
          <div class="panel__header">
            <h3 class="panel__title">{{ pr.title }}</h3>
            <button class="panel__close" @click="$emit('close')">✕</button>
          </div>
          <div class="panel__body">
            <div class="panel__meta">
              <div class="meta-row">
                <span class="meta-label">작성자</span>
                <span>{{ pr.author }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">리뷰어</span>
                <span>{{ pr.reviewer }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">상태</span>
                <span class="badge" :class="`badge--${pr.status}`">{{ pr.status }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">생성일</span>
                <span>{{ pr.createdAt }}</span>
              </div>
              <div v-if="pr.mergedAt" class="meta-row">
                <span class="meta-label">머지일</span>
                <span>{{ pr.mergedAt }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">변경 라인</span>
                <span class="additions">+{{ pr.additions }}</span>
                <span class="deletions">-{{ pr.deletions }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">코멘트</span>
                <span>{{ pr.comments }}개</span>
              </div>
            </div>

            <div class="panel__quality">
              <h4>AI 코드 품질 분석</h4>
              <div class="quality-score" :style="{ color: qualityColor }">
                {{ pr.qualityScore }}점
              </div>
              <div class="quality-bar">
                <div class="quality-bar__fill" :style="{ width: pr.qualityScore + '%', background: qualityColor }"></div>
              </div>
              <p class="quality-comment">{{ qualityComment }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  pr: { type: Object, default: null }
})
const emit = defineEmits(['close'])

const qualityColor = computed(() => {
  if (!props.pr) return ''
  if (props.pr.qualityScore >= 90) return 'var(--success)'
  if (props.pr.qualityScore >= 70) return 'var(--warning)'
  return 'var(--danger)'
})

const qualityComment = computed(() => {
  if (!props.pr) return ''
  if (props.pr.qualityScore >= 90) return '우수한 코드 품질입니다. 리뷰어 승인을 권장합니다.'
  if (props.pr.qualityScore >= 70) return '일부 개선 사항이 있습니다. 리뷰어 확인 후 머지를 권장합니다.'
  return '코드 품질 개선이 필요합니다. 상세 리뷰가 필요합니다.'
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style lang="scss" scoped>
.panel-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
}

.panel {
  width: 420px;
  max-width: 100vw;
  height: 100%;
  background: var(--surface);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    background: var(--surface);
  }

  &__title {
    flex: 1;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
  }

  &__close {
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: var(--text-muted);
    padding: 0.25rem;
    &:hover { color: var(--text); }
  }

  &__body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__quality {
    h4 {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 0.75rem;
    }
  }
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.9rem;

  &:last-child { border-bottom: none; }
}

.meta-label {
  width: 80px;
  color: var(--text-muted);
  font-size: 0.8rem;
  flex-shrink: 0;
}

.badge {
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;

  &--open { background: rgba(245, 158, 11, 0.15); color: var(--warning); }
  &--merged { background: rgba(34, 197, 94, 0.15); color: var(--success); }
  &--closed { background: rgba(239, 68, 68, 0.15); color: var(--danger); }
}

.additions { color: var(--success); font-weight: 600; }
.deletions { color: var(--danger); font-weight: 600; }

.quality-score {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.quality-bar {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;

  &__fill {
    height: 100%;
    border-radius: 4px;
    transition: width 1s ease;
  }
}

.quality-comment {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
}

// transition
.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.25s ease;
  .panel { transition: transform 0.25s ease; }
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  .panel { transform: translateX(100%); }
}
</style>

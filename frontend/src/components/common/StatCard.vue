<template>
  <div class="stat-card card" :style="{ '--card-color': color }">
    <div class="stat-card__header">
      <span class="stat-card__icon">{{ icon }}</span>
      <span class="stat-card__title">{{ title }}</span>
    </div>
    <div class="stat-card__body">
      <span class="stat-card__value">{{ displayValue }}</span>
      <span v-if="unit" class="stat-card__unit">{{ unit }}</span>
    </div>
    <div v-if="trend !== undefined" class="stat-card__trend" :class="trendClass">
      {{ trend > 0 ? '▲' : '▼' }} {{ Math.abs(trend) }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  title: String,
  value: { type: Number, default: 0 },
  unit: String,
  icon: String,
  color: { type: String, default: 'var(--primary)' },
  trend: Number
})

const displayValue = ref(0)

const trendClass = computed(() => {
  if (props.trend === undefined) return ''
  return props.trend >= 0 ? 'trend--up' : 'trend--down'
})

onMounted(() => {
  const target = props.value
  const duration = 1000
  const startTime = performance.now()

  const animate = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValue.value = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
})
</script>

<style lang="scss" scoped>
.stat-card {
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--card-color);
    border-radius: var(--radius) 0 0 var(--radius);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  &__icon {
    font-size: 1.25rem;
  }

  &__title {
    color: var(--text-muted);
    font-size: 0.85rem;
    font-weight: 500;
  }

  &__body {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }

  &__value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--card-color);
    line-height: 1;
  }

  &__unit {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  &__trend {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;

    &--up { color: var(--success); }
    &--down { color: var(--danger); }
  }
}
</style>

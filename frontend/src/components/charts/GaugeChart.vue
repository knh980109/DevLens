<template>
  <div class="chart-wrapper">
    <apexchart type="radialBar" :height="height" :options="chartOptions" :series="[value]" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts

const props = defineProps({
  value: { type: Number, default: 0 },
  label: { type: String, default: '' },
  color: { type: String, default: '#6366f1' },
  height: { type: Number, default: 250 }
})

const chartOptions = computed(() => ({
  chart: {
    background: 'transparent',
    toolbar: { show: false }
  },
  theme: { mode: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light' },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: { size: '60%' },
      dataLabels: {
        name: { show: true, offsetY: -10, fontSize: '14px', color: 'var(--text-muted)' },
        value: { show: true, fontSize: '2rem', fontWeight: 700, color: props.color, formatter: v => v }
      }
    }
  },
  labels: [props.label],
  colors: [props.color],
  stroke: { lineCap: 'round' }
}))
</script>

<style scoped>
.chart-wrapper { width: 100%; }
</style>

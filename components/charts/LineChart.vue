<script setup lang="ts">
import { computed } from 'vue'
import { LineChart as Chart } from 'vue-chart-3'
import type { ChartData, ChartOptions } from 'chart.js'

const props = withDefaults(
  defineProps<{
    title?: string
    labels?: string | string[]
    datasets?: string | ChartData<'line'>['datasets']
  }>(),
  {
    title: 'Line Chart',
    labels: '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]',
    datasets: '[{"label":"PV","data":[12,18,9,22,15,19,25],"borderColor":"#2563eb","backgroundColor":"#2563eb20","tension":0.35},{"label":"CV","data":[3,6,4,9,7,10,11],"borderColor":"#10b981","backgroundColor":"#10b98120","tension":0.35}]',
  },
)

const parsedLabels = computed<string[]>(() => {
  if (typeof props.labels === 'string') {
    try {
      return JSON.parse(props.labels)
    } catch {
      return props.labels.split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''))
    }
  }
  return props.labels
})

const parsedDatasets = computed<ChartData<'line'>['datasets']>(() => {
  if (typeof props.datasets === 'string') {
    try {
      return JSON.parse(props.datasets)
    } catch (e) {
      console.error('Failed to parse datasets:', e)
      return []
    }
  }
  return props.datasets
})

const chartData = computed<ChartData<'line'>>(() => ({
  labels: parsedLabels.value,
  datasets: parsedDatasets.value,
}))

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#475569' } },
    y: { grid: { color: '#e2e8f0' }, ticks: { color: '#475569' } },
  },
  plugins: {
    legend: { display: true, position: 'bottom', labels: { color: '#475569', boxWidth: 12 } },
    tooltip: { backgroundColor: '#0f172a', titleColor: '#e2e8f0', bodyColor: '#e2e8f0' },
  },
}
</script>

<template>
  <div class="chart-card">
    <div v-if="title" class="chart-card__title">
      {{ title }}
    </div>
    <ClientOnly>
      <Chart
        class="chart-card__canvas"
        :chart-data="chartData"
        :options="chartOptions"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>
.chart-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
}

.chart-card__title {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.chart-card__canvas {
  height: 280px;
}
</style>


<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { BarChart as Chart } from 'vue-chart-3'
import type { ChartData, ChartOptions } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const props = defineProps<{
  title?: string
  labels?: string | string[]
  datasets?: string | ChartData<'bar'>['datasets']
  'data-sets'?: string | ChartData<'bar'>['datasets']
  datasetLabels?: string | string[]
  'dataset-labels'?: string | string[]
  unit?: string
}>()

// MDCがケバブケースで渡す可能性に対応
const datasetsProp = computed(() => props['data-sets'] || props.datasets)
const datasetLabelsProp = computed(() => props['dataset-labels'] || props.datasetLabels)

const parsedLabels = computed<string[]>(() => {
  if (!props.labels) {
    return []
  }
  if (typeof props.labels === 'string') {
    try {
      return JSON.parse(props.labels)
    } catch {
      return props.labels.split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''))
    }
  }
  return props.labels
})

const parsedDatasetLabels = computed<string[]>(() => {
  const labels = datasetLabelsProp.value
  if (!labels) return []
  if (typeof labels === 'string') {
    try {
      return JSON.parse(labels)
    } catch {
      return labels.split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''))
    }
  }
  return labels
})

const parsedDatasets = computed<ChartData<'bar'>['datasets']>(() => {
  // すべての可能なプロパティ名をチェック
  const datasetsValue = 
    props['data-sets'] || 
    props.datasets || 
    (props as any)['datasets'] ||
    (props as any)['dataSets']
  
  // datasetsが未指定の場合は空配列を返す
  if (!datasetsValue) {
    console.warn('BarChart: datasets prop is not provided. Available props:', Object.keys(props))
    return []
  }

  let datasets: ChartData<'bar'>['datasets'] = []
  
  // 文字列として受け取ってパース
  if (typeof datasetsValue === 'string') {
    try {
      // JSON文字列をパース
      datasets = JSON.parse(datasetsValue)
    } catch (e) {
      console.error('BarChart: Failed to parse datasets JSON:', e)
      console.error('BarChart: Raw datasets value:', datasetsValue)
      return []
    }
  } else if (Array.isArray(datasetsValue)) {
    // 既に配列の場合はそのまま使用
    datasets = datasetsValue
  } else {
    console.error('BarChart: datasets is neither string nor array:', typeof datasetsValue, datasetsValue)
    return []
  }

  // datasetLabels が指定されている場合、ラベルを上書き
  if (parsedDatasetLabels.value.length > 0) {
    datasets = datasets.map((dataset, index) => {
      if (parsedDatasetLabels.value[index]) {
        return { ...dataset, label: parsedDatasetLabels.value[index] }
      }
      return dataset
    })
  }

  return datasets
})

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: parsedLabels.value,
  datasets: parsedDatasets.value,
}))

onMounted(() => {
  console.log('BarChart mounted - All props keys:', Object.keys(props))
  console.log('BarChart mounted - props.datasets:', props.datasets)
  console.log('BarChart mounted - props["data-sets"]:', props['data-sets'])
  console.log('BarChart mounted - Full props object:', props)
})

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#475569',
        maxRotation: 45,
        minRotation: 0,
        autoSkip: false,
        maxTicksLimit: undefined,
      },
    },
    y: { grid: { color: '#e2e8f0' }, ticks: { color: '#475569' }, beginAtZero: true },
  },
  plugins: {
    legend: {
      display: parsedDatasets.value.length > 1,
      position: 'bottom',
      labels: { color: '#475569', boxWidth: 12 },
    },
    tooltip: { backgroundColor: '#0f172a', titleColor: '#e2e8f0', bodyColor: '#e2e8f0' },
    datalabels: {
      display: true,
      color: '#475569',
      anchor: 'end',
      align: 'end',
      formatter: (value: number) => {
        const unit = props.unit || '%'
        // 単位が%の場合は小数点1桁、それ以外は整数表示
        if (unit === '%') {
          return value.toFixed(1) + unit
        } else {
          return value.toLocaleString() + unit
        }
      },
      font: {
        size: 11,
        weight: 500,
      },
      padding: {
        bottom: 4,
      },
    },
  },
}))
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
        :plugins="[ChartDataLabels]"
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


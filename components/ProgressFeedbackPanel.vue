<script setup lang="ts">
// 型定義
interface Domain {
  id: string
  name: string
  score: number
  delta: number
  priority: number
}

interface Task {
  label: string
  amount: string
}

interface ProgressData {
  overallScore: number
  passLine: number
  todayDelta: number
  domains: Domain[]
  tasks: Task[]
}

// Props
interface Props {
  radius?: number
  strokeWidth?: number
  smallRadius?: number
  smallStrokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  radius: 120,
  strokeWidth: 16,
  smallRadius: 50,
  smallStrokeWidth: 8,
})

// モックデータ
const data: ProgressData = {
  overallScore: 58,
  passLine: 70,
  todayDelta: 1.2,
  domains: [
    { id: 'base', name: '医薬品の基礎', score: 42, delta: 0.8, priority: 92 },
    { id: 'body', name: '人体の働き', score: 55, delta: 0.2, priority: 81 },
    { id: 'law', name: '薬事関連法規', score: 78, delta: 0.0, priority: 35 },
    { id: 'practice', name: '実務', score: 63, delta: -0.4, priority: 60 },
  ],
  tasks: [
    { label: '医薬品の基礎 過去問', amount: '10問' },
    { label: '誤答3問の復習', amount: '5分' },
    { label: '人体の働き 重要Topic', amount: '1つ' },
  ],
}

// ユーティリティ関数
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value))
}

const getSemiCircleProps = (
  score: number,
  radius: number,
  strokeWidth: number
) => {
  const progress = clamp(score / 100, 0, 1)
  const circumference = Math.PI * radius // 半円なので円周の半分
  const offset = circumference * (1 - progress)
  
  return {
    circumference,
    offset,
    progress,
  }
}

const getDeltaArcProps = (
  currentScore: number,
  delta: number,
  radius: number
) => {
  const yesterdayScore = currentScore - delta
  const startProgress = clamp(yesterdayScore / 100, 0, 1)
  const endProgress = clamp(currentScore / 100, 0, 1)
  
  const circumference = Math.PI * radius
  const startOffset = circumference * (1 - startProgress)
  const arcLength = Math.abs(circumference * (endProgress - startProgress))
  
  return {
    circumference,
    startOffset,
    arcLength,
    isNegative: delta < 0,
  }
}

const getPassLinePosition = (passLine: number, radius: number) => {
  const progress = clamp(passLine / 100, 0, 1)
  const angle = Math.PI * progress // 0 to π (半円)
  const x = -radius * Math.cos(angle)
  const y = -radius * Math.sin(angle)
  
  return { x, y }
}

const getStatus = (score: number, passLine: number): 'danger' | 'warning' | 'success' => {
  const gap = passLine - score
  if (gap > 20) return 'danger'
  if (gap > 0) return 'warning'
  return 'success'
}

// 計算値
const overallProps = getSemiCircleProps(data.overallScore, props.radius, props.strokeWidth)
const gap = data.passLine - data.overallScore
const status = getStatus(data.overallScore, data.passLine)
const showDeltaArc = Math.abs(data.todayDelta) >= 0.3

const deltaArcRadius = props.radius + props.strokeWidth / 2 + 4
const deltaArcProps = showDeltaArc
  ? getDeltaArcProps(data.overallScore, data.todayDelta, deltaArcRadius)
  : null

const passLinePos = getPassLinePosition(data.passLine, props.radius)

// 分野別データ（優先度順にソート、上位3つ）
const topDomains = [...data.domains]
  .sort((a, b) => b.priority - a.priority)
  .slice(0, 3)

// 各分野のステータス
const getDomainStatus = (domain: Domain): 'danger' | 'warning' | 'success' => {
  if (domain.score < 50) return 'danger'
  if (domain.score < 70) return 'warning'
  return 'success'
}

// SVGサイズ計算
const mainSvgSize = (props.radius + props.strokeWidth + 10) * 2
const smallSvgSize = (props.smallRadius + props.smallStrokeWidth + 5) * 2
</script>

<template>
  <ClientOnly>
    <div class="progress-feedback-panel p-6 max-w-4xl mx-auto">
      <!-- 全体半円ゲージ（大） -->
      <div class="overall-gauge mb-8 flex flex-col items-center">
        <svg
          :width="mainSvgSize"
          :height="mainSvgSize / 2 + 40"
          class="overflow-visible"
        >
          <g :transform="`translate(${mainSvgSize / 2}, ${mainSvgSize / 2})`">
            <!-- 背景トラック -->
            <path
              :d="`M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0`"
              fill="none"
              :stroke-width="strokeWidth"
              class="stroke-gray-200"
            />
            
            <!-- 進捗アーク -->
            <path
              :d="`M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0`"
              fill="none"
              :stroke-width="strokeWidth"
              :stroke-dasharray="overallProps.circumference"
              :stroke-dashoffset="overallProps.offset"
              :class="{
                'stroke-red-500': status === 'danger',
                'stroke-yellow-500': status === 'warning',
                'stroke-green-500': status === 'success',
              }"
              class="transition-all duration-500"
              stroke-linecap="round"
            />
            
            <!-- 差分アーク（外周） -->
            <path
              v-if="deltaArcProps"
              :d="`M ${-deltaArcRadius} 0 A ${deltaArcRadius} ${deltaArcRadius} 0 0 1 ${deltaArcRadius} 0`"
              fill="none"
              stroke-width="3"
              :stroke-dasharray="`${deltaArcProps.arcLength} ${deltaArcProps.circumference}`"
              :stroke-dashoffset="deltaArcProps.startOffset"
              :class="{
                'stroke-blue-400': !deltaArcProps.isNegative,
                'stroke-gray-400': deltaArcProps.isNegative,
              }"
              class="transition-all duration-500"
              stroke-linecap="round"
            />
            
            <!-- 合格ラインマーカー -->
            <circle
              :cx="passLinePos.x"
              :cy="passLinePos.y"
              r="4"
              class="fill-purple-500"
            />
            
            <!-- 中央スコア表示 -->
            <text
              x="0"
              y="-10"
              text-anchor="middle"
              class="text-5xl font-bold fill-gray-800"
            >
              {{ data.overallScore }}
            </text>
            <text
              x="0"
              y="20"
              text-anchor="middle"
              class="text-sm fill-gray-500"
            >
              / 100
            </text>
          </g>
        </svg>
        
        <!-- ギャップ表示 -->
        <div class="mt-4 text-center">
          <div class="text-sm text-gray-600">
            合格ライン {{ data.passLine }}
          </div>
          <div
            v-if="gap > 0"
            class="text-lg font-semibold"
            :class="{
              'text-red-600': status === 'danger',
              'text-yellow-600': status === 'warning',
            }"
          >
            あと{{ gap }}
          </div>
          <div v-else class="text-lg font-semibold text-green-600">
            合格ライン達成！
          </div>
          
          <!-- 今日の伸び -->
          <div v-if="showDeltaArc" class="mt-2 text-sm">
            <span
              :class="{
                'text-blue-600': data.todayDelta > 0,
                'text-gray-600': data.todayDelta <= 0,
              }"
            >
              今日: {{ data.todayDelta > 0 ? '+' : '' }}{{ data.todayDelta.toFixed(1) }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 分野別半円ゲージ（小） -->
      <div class="domain-gauges mb-8">
        <h3 class="text-lg font-semibold mb-4 text-gray-800">
          重点分野
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="domain in topDomains"
            :key="domain.id"
            class="domain-card flex flex-col items-center p-4 bg-gray-50 rounded-lg"
          >
            <svg
              :width="smallSvgSize"
              :height="smallSvgSize / 2 + 20"
              class="overflow-visible"
            >
              <g :transform="`translate(${smallSvgSize / 2}, ${smallSvgSize / 2})`">
                <!-- 背景トラック -->
                <path
                  :d="`M ${-smallRadius} 0 A ${smallRadius} ${smallRadius} 0 0 1 ${smallRadius} 0`"
                  fill="none"
                  :stroke-width="smallStrokeWidth"
                  class="stroke-gray-200"
                />
                
                <!-- 進捗アーク -->
                <path
                  :d="`M ${-smallRadius} 0 A ${smallRadius} ${smallRadius} 0 0 1 ${smallRadius} 0`"
                  fill="none"
                  :stroke-width="smallStrokeWidth"
                  :stroke-dasharray="getSemiCircleProps(domain.score, smallRadius, smallStrokeWidth).circumference"
                  :stroke-dashoffset="getSemiCircleProps(domain.score, smallRadius, smallStrokeWidth).offset"
                  :class="{
                    'stroke-red-500': getDomainStatus(domain) === 'danger',
                    'stroke-yellow-500': getDomainStatus(domain) === 'warning',
                    'stroke-green-500': getDomainStatus(domain) === 'success',
                  }"
                  class="transition-all duration-500"
                  stroke-linecap="round"
                />
                
                <!-- 中央スコア -->
                <text
                  x="0"
                  y="5"
                  text-anchor="middle"
                  class="text-2xl font-bold fill-gray-800"
                >
                  {{ domain.score }}
                </text>
              </g>
            </svg>
            
            <div class="mt-2 text-center">
              <div class="text-sm font-medium text-gray-800">
                {{ domain.name }}
              </div>
              <div
                v-if="Math.abs(domain.delta) > 0"
                class="text-xs mt-1"
                :class="{
                  'text-blue-600': domain.delta > 0,
                  'text-gray-500': domain.delta <= 0,
                }"
              >
                {{ domain.delta > 0 ? '+' : '' }}{{ domain.delta.toFixed(1) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 今日やること -->
      <div class="today-tasks">
        <h3 class="text-lg font-semibold mb-4 text-gray-800">
          今日やること
        </h3>
        <ul class="space-y-3">
          <li
            v-for="(task, index) in data.tasks"
            :key="index"
            class="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
          >
            <span class="text-gray-800">{{ task.label }}</span>
            <span class="text-sm text-gray-600 font-medium">{{ task.amount }}</span>
          </li>
        </ul>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.progress-feedback-panel {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>

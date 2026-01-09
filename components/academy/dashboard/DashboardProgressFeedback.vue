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
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  radius: 80,
  strokeWidth: 12,
  smallRadius: 40,
  smallStrokeWidth: 6,
  compact: false,
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
  const circumference = Math.PI * radius
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
  const angle = Math.PI * progress
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

const deltaArcRadius = props.radius + props.strokeWidth / 2 + 3
const deltaArcProps = showDeltaArc
  ? getDeltaArcProps(data.overallScore, data.todayDelta, deltaArcRadius)
  : null

const passLinePos = getPassLinePosition(data.passLine, props.radius)

// 分野別データ（優先度順にソート、上位3つ）
const topDomains = [...data.domains]
  .sort((a, b) => b.priority - a.priority)
  .slice(0, 3)

const getDomainStatus = (domain: Domain): 'danger' | 'warning' | 'success' => {
  if (domain.score < 50) return 'danger'
  if (domain.score < 70) return 'warning'
  return 'success'
}

// SVGサイズ計算
const mainSvgSize = (props.radius + props.strokeWidth + 8) * 2
const smallSvgSize = (props.smallRadius + props.smallStrokeWidth + 4) * 2
</script>

<template>
  <div class="dashboard-progress-feedback">
    <div class="flex flex-col lg:flex-row items-stretch">
      <!-- 全体進捗エリア (Left) -->
      <div class="lg:w-[320px] lg:flex-shrink-0 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
        <div class="relative">
          <!-- メインゲージSVG -->
          <svg
            :width="mainSvgSize"
            :height="mainSvgSize / 2 + 10"
            class="overflow-visible"
          >
            <g :transform="`translate(${mainSvgSize / 2}, ${mainSvgSize / 2})`">
              <!-- 背景トラック -->
              <path
                :d="`M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0`"
                fill="none"
                :stroke-width="strokeWidth"
                class="stroke-slate-100"
                stroke-linecap="round"
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
                  'stroke-amber-500': status === 'warning',
                  'stroke-emerald-500': status === 'success',
                }"
                class="transition-all duration-700 ease-out"
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
                  'stroke-blue-500': !deltaArcProps.isNegative,
                  'stroke-slate-300': deltaArcProps.isNegative,
                }"
                class="transition-all duration-700 ease-out opacity-80"
                stroke-linecap="round"
              />
              
              <!-- 合格ラインマーカー（内側） -->
              <circle
                :cx="passLinePos.x * 0.85"
                :cy="passLinePos.y * 0.85"
                r="3"
                class="fill-slate-300"
              />
              
              <!-- スコア表示 -->
              <text
                x="0"
                y="-5"
                text-anchor="middle"
                class="text-5xl font-black fill-slate-800 tracking-tight"
                style="font-variant-numeric: tabular-nums;"
              >
                {{ data.overallScore }}
              </text>
              <text
                x="0"
                y="14"
                text-anchor="middle"
                class="text-[10px] fill-slate-400 font-bold uppercase tracking-widest opacity-80"
              >
                Score
              </text>
            </g>
          </svg>

          <!-- 差分バッジ (Absolute) -->
          <div 
            v-if="showDeltaArc"
            class="absolute -right-2 top-0 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-100 shadow-sm"
          >
            {{ data.todayDelta > 0 ? '+' : '' }}{{ data.todayDelta.toFixed(1) }} today
          </div>
        </div>

        <!-- インフォメーション -->
        <div class="mt-2 text-center w-full">
          <div class="flex items-center justify-center gap-2 mb-1">
             <span class="text-[10px] font-bold text-slate-400">合格ライン {{ data.passLine }}</span>
          </div>
          
          <div class="flex items-center justify-center">
             <div 
               v-if="gap > 0"
               class="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100"
             >
                <div 
                  class="w-1.5 h-1.5 rounded-full" 
                  :class="{
                    'bg-red-500': status === 'danger',
                    'bg-amber-500': status === 'warning',
                  }"
                ></div>
                <span class="text-sm font-bold text-slate-700">あと <span class="text-base font-black">{{ gap }}</span> 点</span>
             </div>
             <div v-else class="text-sm font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
               <Icon icon="ph:check-circle-fill" class="w-4 h-4" />
               合格圏内
             </div>
          </div>
        </div>
      </div>

      <!-- 重点分野エリア (Right) -->
      <div class="flex-1 p-6 bg-slate-50/50">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Icon icon="ph:chart-bar-fill" class="w-3.5 h-3.5 text-slate-300" />
            重点対策分野
          </h4>
          <NuxtLink to="/academy/analytics" class="text-[10px] font-bold text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-1">
            詳しく見る
            <Icon icon="ph:caret-right-bold" class="w-2.5 h-2.5" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-3 gap-3 h-full items-center">
          <div
            v-for="domain in topDomains"
            :key="domain.id"
            class="bg-white rounded-xl border border-slate-100 p-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-full flex flex-col justify-between"
          >
            <!-- ステータスバー (Top) -->
            <div 
              class="absolute top-0 left-0 w-full h-1"
              :class="{
                'bg-red-500': getDomainStatus(domain) === 'danger',
                'bg-amber-500': getDomainStatus(domain) === 'warning',
                'bg-emerald-500': getDomainStatus(domain) === 'success',
              }"
            ></div>

            <div class="flex flex-col items-center pt-2">
              <svg
                :width="smallSvgSize"
                :height="smallSvgSize / 2 + 5"
                class="overflow-visible"
              >
                <g :transform="`translate(${smallSvgSize / 2}, ${smallSvgSize / 2})`">
                  <path
                    :d="`M ${-smallRadius} 0 A ${smallRadius} ${smallRadius} 0 0 1 ${smallRadius} 0`"
                    fill="none"
                    :stroke-width="smallStrokeWidth"
                    class="stroke-slate-100"
                    stroke-linecap="round"
                  />
                  <path
                    :d="`M ${-smallRadius} 0 A ${smallRadius} ${smallRadius} 0 0 1 ${smallRadius} 0`"
                    fill="none"
                    :stroke-width="smallStrokeWidth"
                    :stroke-dasharray="getSemiCircleProps(domain.score, smallRadius, smallStrokeWidth).circumference"
                    :stroke-dashoffset="getSemiCircleProps(domain.score, smallRadius, smallStrokeWidth).offset"
                    :class="{
                      'stroke-red-500': getDomainStatus(domain) === 'danger',
                      'stroke-amber-500': getDomainStatus(domain) === 'warning',
                      'stroke-emerald-500': getDomainStatus(domain) === 'success',
                    }"
                    class="transition-all duration-700 ease-out"
                    stroke-linecap="round"
                  />
                  <text
                    x="0"
                    y="0"
                    text-anchor="middle"
                    class="text-lg font-black fill-slate-800"
                    style="font-variant-numeric: tabular-nums;"
                  >
                    {{ domain.score }}
                  </text>
                </g>
              </svg>
            </div>

            <div class="mt-2 text-center">
              <div class="text-[10px] font-bold text-slate-600 leading-tight line-clamp-1 mb-1">
                {{ domain.name }}
              </div>
              <div 
                class="text-[9px] font-bold inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-50"
                :class="{
                  'text-blue-600 bg-blue-50': domain.delta > 0,
                  'text-slate-400': domain.delta <= 0,
                }"
              >
                {{ domain.delta > 0 ? '+' : '' }}{{ domain.delta.toFixed(1) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-progress-feedback {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>

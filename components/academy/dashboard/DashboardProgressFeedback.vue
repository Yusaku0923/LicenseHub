<script setup lang="ts">
// 型定義
interface Domain {
  id: string
  name: string
  score: number // 習熟度 (0-100)
  delta: number
  priority: number
}

interface Task {
  label: string
  amount: string
}

interface ProgressData {
  overallScore: number // 全体習熟度
  passLine: number // 合格目安ライン (参考用)
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
  smallRadius: 36, // 少し小さく
  smallStrokeWidth: 5,
  compact: false,
})

// モックデータ (実データ連携時はここをPropsまたはStoreから受け取る)
const data: ProgressData = {
  overallScore: 58,
  passLine: 70,
  todayDelta: 1.2,
  domains: [
    { id: 'base', name: '医薬品の基礎', score: 42, delta: 0.8, priority: 92 },
    { id: 'body', name: '人体の働き', score: 55, delta: 0.2, priority: 81 },
    { id: 'law', name: '薬事関連法規', score: 78, delta: 0.0, priority: 35 },
    { id: 'hygiene', name: '衛生管理', score: 85, delta: 0.0, priority: 20 },
    { id: 'management', name: '店舗管理', score: 68, delta: -0.1, priority: 55 },
    { id: 'comm', name: '接遇・マナー', score: 92, delta: 0.5, priority: 15 },
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

// 色判定（習熟度ベース：青→緑へのグラデーション）
const getProgressStyles = (score: number) => {
  // 段階的に色を変化させるが、"Danger"（赤）は使わない
  if (score < 40) return { stroke: 'stroke-slate-400', text: 'text-slate-500', bg: 'bg-slate-50', label: '基礎固め' }
  if (score < 70) return { stroke: 'stroke-blue-500', text: 'text-blue-600', bg: 'bg-blue-50', label: '発展途上' }
  return { stroke: 'stroke-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', label: '合格圏内' }
}

// 計算値
const progressStyles = getProgressStyles(data.overallScore)
const overallProps = getSemiCircleProps(data.overallScore, props.radius, props.strokeWidth)
const showDeltaArc = Math.abs(data.todayDelta) >= 0.1

const deltaArcRadius = props.radius + props.strokeWidth / 2 + 4
const deltaArcProps = showDeltaArc
  ? getDeltaArcProps(data.overallScore, data.todayDelta, deltaArcRadius)
  : null

const passLinePos = getPassLinePosition(data.passLine, props.radius)

// 分野別データ（優先度順にソート、上位6つ）
const topDomains = [...data.domains]
  .sort((a, b) => b.priority - a.priority)
  .slice(0, 6)

// メッセージ生成
const getEncouragementMessage = (score: number, delta: number) => {
    if (delta > 0.5) return "良いペースです！着実に伸びています。"
    if (score >= 70) return "素晴らしい仕上がりです！この調子で。"
    return "焦らずいきましょう。毎日の積み重ねが重要です。"
}
const message = getEncouragementMessage(data.overallScore, data.todayDelta)

// SVGサイズ計算
const mainSvgSize = (props.radius + props.strokeWidth + 12) * 2
const smallSvgSize = (props.smallRadius + props.smallStrokeWidth + 4) * 2
</script>

<template>
  <div class="dashboard-progress-feedback font-sans">
    <div class="flex flex-col lg:flex-row items-stretch h-full">
      
      <!-- 1. 全体習熟度 (Left Hero) -->
      <div class="lg:w-[320px] lg:flex-shrink-0 p-5 lg:p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100 relative overflow-hidden">
        <!-- 背景装飾 -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-blue-200 to-emerald-200 opacity-30"></div>

        <div class="relative mt-2">
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
                :class="progressStyles.stroke"
                class="transition-all duration-1000 ease-out"
                stroke-linecap="round"
              />
              
              <!-- 差分アーク（外周・成長の証） -->
              <path
                v-if="deltaArcProps && deltaArcProps.isNegative === false"
                :d="`M ${-deltaArcRadius} 0 A ${deltaArcRadius} ${deltaArcRadius} 0 0 1 ${deltaArcRadius} 0`"
                fill="none"
                stroke-width="4"
                :stroke-dasharray="`${deltaArcProps.arcLength} ${deltaArcProps.circumference}`"
                :stroke-dashoffset="deltaArcProps.startOffset"
                class="stroke-blue-400 mix-blend-multiply opacity-60 transition-all duration-1000 ease-out"
                stroke-linecap="round"
              />
              
              <!-- 合格ラインマーカー（控えめに） -->
              <circle
                :cx="passLinePos.x * 0.88"
                :cy="passLinePos.y * 0.88"
                r="3"
                class="fill-slate-300"
              />
              <!-- 合格ラインラベル -->
              <text
                 :x="passLinePos.x * 0.72"
                 :y="passLinePos.y * 0.72"
                 text-anchor="middle"
                 class="text-[9px] fill-slate-300 font-bold"
              >
                  Goal
              </text>
              
              <!-- 中央：習熟度数値 -->
              <text
                x="0"
                y="-10"
                text-anchor="middle"
                class="text-5xl font-black fill-slate-800 tracking-tighter"
                style="font-variant-numeric: tabular-nums;"
              >
                {{ data.overallScore }}
              </text>
              
              <!-- ラベル：ScoreではなくProficiency（習熟度） -->
              <text
                x="0"
                y="15"
                text-anchor="middle"
                class="text-[10px] fill-slate-400 font-bold uppercase tracking-widest"
              >
                Proficiency
              </text>
            </g>
          </svg>

          <!-- 差分バッジ (Growth Badge) -->
          <div 
            v-if="data.todayDelta > 0"
            class="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2"
          >
            <div class="flex flex-col items-center bg-white border border-blue-100 shadow-sm rounded-lg px-2 py-1">
                <span class="text-[9px] text-slate-400 font-bold uppercase">Growth</span>
                <span class="text-xs font-black text-blue-600">+{{ data.todayDelta.toFixed(1) }}</span>
            </div>
          </div>
        </div>

        <!-- 状態メッセージ (Encouragement) -->
        <div class="mt-4 text-center px-4 w-full">
            <h3 class="text-sm font-bold text-slate-700 mb-1">
                {{ progressStyles.label }}
            </h3>
            <p class="text-xs text-slate-500 leading-relaxed max-w-[260px] mx-auto">
                {{ message }}
            </p>
        </div>
      </div>

      <!-- 2. 本日の伸びしろ (Right Context) -->
      <div class="flex-1 p-5 lg:p-6 bg-slate-50/30 flex flex-col">
        <div class="flex items-center justify-between mb-4 lg:mb-5">
          <h4 class="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Icon icon="ph:plant-fill" class="w-4 h-4 text-emerald-500" />
            本日の伸びしろ (Growth Areas)
          </h4>
          <NuxtLink to="/academy/analytics" class="group flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-emerald-600 transition-colors">
            詳細分析
            <Icon icon="ph:arrow-right-bold" class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 lg:gap-3 flex-1 items-start">
          <div
            v-for="(domain, index) in topDomains"
            :key="domain.id"
            class="flex items-center gap-3 lg:gap-4 bg-white rounded-xl border border-slate-100 p-3 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-emerald-100 transition-all group"
          >
            <!-- 左：ミニチャート -->
            <div class="relative shrink-0 flex items-center justify-center w-12 h-12">
               <svg
                :width="48"
                :height="48"
                class="overflow-visible -rotate-90"
              >
                  <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="4" fill="none" class="text-slate-50" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                    :stroke-dasharray="2 * Math.PI * 20"
                    :stroke-dashoffset="2 * Math.PI * 20 * (1 - clamp(domain.score / 100, 0, 1))"
                    stroke-linecap="round"
                    class="text-emerald-500 transition-all duration-1000"
                  />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-700">
                  {{ domain.score }}
              </div>
            </div>

            <!-- 中：情報 -->
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                    <h5 class="text-sm font-bold text-slate-800 truncate">{{ domain.name }}</h5>
                    <span v-if="index === 0" class="px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-bold rounded-full border border-amber-100">重点</span>
                </div>
                <div class="flex items-center text-[10px] text-slate-500 gap-2">
                    <span>優先度高</span>
                    <span class="w-0.5 h-0.5 bg-slate-300 rounded-full"></span>
                    <span v-if="domain.delta > 0" class="text-blue-500 font-bold">
                        前日比 +{{ domain.delta.toFixed(1) }}
                    </span>
                    <span v-else>変化なし</span>
                </div>
            </div>

             <!-- 右：アクション -->
             <button class="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                 <Icon icon="ph:play-fill" class="w-3 h-3 ml-0.5" />
             </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

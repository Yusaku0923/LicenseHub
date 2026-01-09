<template>
  <div class="flex flex-col gap-3 py-2">
    <div 
      v-for="(step, index) in steps" 
      :key="step.id"
      class="flex items-center gap-4 py-3 px-4 rounded-xl bg-slate-50/50 border border-slate-100/50 transition-all duration-300"
      :class="getStepClass(step.status)"
    >
      <!-- Status Indicator -->
      <div 
        class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
        :class="getIconClass(step.status)"
      >
        <Icon v-if="step.status === 'DONE'" icon="ph:check-bold" class="w-5 h-5" />
        <Icon v-else-if="step.status === 'NEXT'" icon="ph:play-fill" class="w-5 h-5 ml-0.5" />
        <span v-else class="text-xs font-bold text-slate-400">{{ index + 1 }}</span>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-0.5">
          <span 
            class="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded"
            :class="getLabelClass(step.type, step.status)"
          >
            STEP 0{{ index + 2 }}
          </span>
          <span class="text-xs font-bold" :class="step.status === 'WAIT' ? 'text-slate-300' : 'text-slate-400'">
            {{ step.minutes }} min
          </span>
        </div>
        <h4 
          class="text-base font-bold truncate"
          :class="step.status === 'WAIT' ? 'text-slate-500' : 'text-slate-900'"
        >
          {{ step.title }}
        </h4>
        <p class="text-[10px] font-medium text-slate-500 mt-0.5">{{ getStepDescription(step.type) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export type StepStatus = 'DONE' | 'NEXT' | 'WAIT'
export type StepType = 'lecture' | 'practice' | 'flashcard'

export interface StepItem {
  id: string
  type: StepType
  title: string
  minutes: number
  status: StepStatus
  to: string
}

const props = defineProps<{
  steps: StepItem[]
}>()

function getStepDescription(type: StepType) {
  switch (type) {
    case 'practice': return '間違えやすいポイントを確認します'
    case 'flashcard': return '重要語句を短時間で定着させます'
    case 'lecture': return '基礎概念を効率よくインプットします'
    default: return '理解度を確認します'
  }
}

function getStepClass(status: StepStatus) {
  switch (status) {
    case 'DONE':
      return 'bg-emerald-50/50 border-emerald-100 opacity-80'
    case 'NEXT':
      return 'bg-white border-emerald-500 shadow-lg shadow-emerald-500/10 scale-[1.02] z-10'
    case 'WAIT':
      return 'bg-slate-50 border-slate-100 opacity-60'
  }
}

function getIconClass(status: StepStatus) {
  switch (status) {
    case 'DONE':
      return 'bg-emerald-100 text-emerald-600'
    case 'NEXT':
      return 'bg-[var(--brand)] text-white shadow-lg shadow-emerald-500/30'
    case 'WAIT':
      return 'bg-slate-200 text-slate-400'
  }
}

function getLabelClass(type: StepType, status: StepStatus) {
  if (status === 'WAIT') return 'bg-slate-100 text-slate-400'
  
  switch (type) {
    case 'lecture': return 'bg-blue-50 text-blue-600'
    case 'practice': return 'bg-emerald-50 text-emerald-600'
    case 'flashcard': return 'bg-amber-50 text-amber-600'
    default: return 'bg-slate-100 text-slate-500'
  }
}
</script>

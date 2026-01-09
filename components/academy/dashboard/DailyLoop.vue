<template>
  <div class="flex flex-col gap-6">
  <div class="flex flex-col gap-6">
    <!-- 1. AI & Header Area (Always Outside Top now) -->
    <DailyLoopHeader :feedback="aiDailyFeedback" />

    <div :class="horizontal ? 'flex flex-col gap-6 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm' : 'flex flex-col gap-4'">
      
      <!-- 2. Mode Selector -->
      <div class="px-2">
        <DailyLoopModeSelector 
          :current-mode="currentMode" 
          @update:mode="handleModeChange" 
        />
      </div>

      <!-- 3. The Loop (PC: Grid/Flex, SP: Carousel) -->
      <div 
        :class="horizontal 
          ? 'flex items-stretch mt-6 px-2' 
          : 'flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-12 pt-4 -mx-4 scrollbar-hide'"
      >
        <DailyLoopStepCard
          v-for="(item, index) in dailyPlan.items"
          :key="item.id"
          :step-number="index + 1"
          :title="item.title"
          :subtitle="item.subtitle"
          :time="item.estimatedMinutes + '分'"
          :color="getItemColor(item.type)"
          :type="item.type"
          :is-active="item.status === 'in_progress' || (item.status === 'planned' && (index === 0 || dailyPlan.items[index - 1].status === 'completed'))"
          :is-completed="item.status === 'completed'"
          :is-last="index === dailyPlan.items.length - 1"
          :is-first="index === 0"
          :horizontal="true"
          :class="horizontal ? 'flex-1' : 'shrink-0 w-[85vw] snap-center'"
          @click="handleItemClick(item)"
        />
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DailyLoopHeader from './DailyLoopHeader.vue'
import DailyLoopModeSelector, { type LearningMode } from './DailyLoopModeSelector.vue'
import DailyLoopStepCard from './DailyLoopStepCard.vue'
import { useAcademyMock, type UserDailyPlanItem, type DailyPlanItemType } from '~/composables/useAcademyMock'

defineProps<{
  horizontal?: boolean
}>()

// Mock Data
const { dailyPlan, aiDailyFeedback, completeTask } = useAcademyMock()
const currentMode = ref<LearningMode>('standard')
const router = useRouter()

function handleModeChange(mode: LearningMode) {
  currentMode.value = mode
  // In a real app, this would re-fetch the plan
  if (mode === 'mini') dailyPlan.value.totalEstimatedMinutes = 15
  else if (mode === 'standard') dailyPlan.value.totalEstimatedMinutes = 25
  else dailyPlan.value.totalEstimatedMinutes = 45
}

function getItemColor(type: DailyPlanItemType) {
  switch (type) {
    case 'lecture': return 'blue'
    case 'practice': return 'green'
    case 'flashcard': return 'yellow'
    default: return 'green'
  }
}

function handleItemClick(item: UserDailyPlanItem) {
  if (item.status === 'completed') return

  // Mock navigation
  if (item.type === 'lecture') {
    router.push('/academy/lecture')
  } else if (item.type === 'practice') {
    router.push('/academy/practice')
  } else if (item.type === 'flashcard') {
    router.push('/academy/flashcards')
  }
}
</script>

<template>
  <div class="flex flex-col gap-12">
    <!-- Main Mission Card (Main Focus) -->
    <div class="w-full">
      <TodayMissionCard 
        :mission="todayMission"
        :current-step-title="currentStepTitle"
        :next-step-index="nextStepIndex"
        @click-cta="handleCtaClick"
      />
    </div>

    <!-- Upcoming Steps (Secondary / Reassurance) -->
    <div v-if="upcomingSteps.length > 0" class="w-full">
      <!-- Boundary / Header -->
      <div class="flex items-center gap-4 mb-6 px-2">
         <div class="h-px bg-slate-200 flex-1"></div>
         <h3 class="text-xs font-bold text-slate-400 flex items-center gap-2 tracking-wider">
            <Icon icon="ph:caret-double-down-bold" class="w-3 h-3 text-slate-300" />
            次に控えているステップ
         </h3>
         <div class="h-px bg-slate-200 flex-1"></div>
      </div>
      
      <StepProgressList :steps="upcomingSteps" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DashboardTodayTasksSection.vue
 * Replaces the old DailyLoop.vue for a focused "Mission" style dashboard.
 */
import { computed } from 'vue'
import TodayMissionCard, { type MissionData } from './TodayMissionCard.vue'
import StepProgressList, { type StepItem, type StepStatus } from './StepProgressList.vue'
import { useAcademyMock } from '~/composables/useAcademyMock'

const router = useRouter()
const { dailyPlan, aiDailyFeedback } = useAcademyMock()

// --- Data Transformation (Mock -> View Model) ---

// 1. Calculate Steps & Status
const steps = computed<StepItem[]>(() => {
  let firstNextFound = false
  
  return dailyPlan.value.items.map((item, index) => {
    let status: StepStatus = 'WAIT'
    
    if (item.status === 'completed') {
      status = 'DONE'
    } else if (!firstNextFound) {
      status = 'NEXT'
      firstNextFound = true
    } else {
      status = 'WAIT'
    }

    return {
      id: item.id,
      type: item.type,
      title: item.title,
      minutes: item.estimatedMinutes,
      status: status,
      to: getTypeRoute(item.type) // helper
    }
  })
})

// 2. Identify Current Mission
const currentStepIndex = computed(() => steps.value.findIndex(s => s.status === 'NEXT'))
const nextStepIndex = computed(() => currentStepIndex.value === -1 ? steps.value.length : currentStepIndex.value) // If all done, index is length? Or handle all done.
const currentStep = computed(() => {
  if (currentStepIndex.value !== -1) return steps.value[currentStepIndex.value]
  // Fallback if all done
  return steps.value[steps.value.length - 1] 
})

const upcomingSteps = computed(() => {
   // Show all steps AFTER the current active one (NEXT).
   // If no NEXT (all done), show nothing? Or done items?
   // User said "Next lying in wait".
   // If Step 1 is NEXT, show Step 2, 3.
   if (currentStepIndex.value === -1) return [] // All done
   return steps.value.slice(currentStepIndex.value + 1)
})

const currentStepTitle = computed(() => currentStep.value?.title || '全てのタスク完了')

const todayMission = computed<MissionData>(() => {
  const current = currentStep.value
  let ctaLabel = '結果を確認する'
  
  if (current) {
    const typeMap: Record<string, string> = { lecture: '講義', practice: '演習', flashcard: '暗記カード' }
    const typeText = typeMap[current.type] || 'タスク'
    ctaLabel = `${typeText}を始める（${current.minutes}分）`
  }

  return {
    totalMinutes: dailyPlan.value.totalEstimatedMinutes,
    reasonText: `循環器系は直近の演習で正答率が62%でした。\n本試験では毎年2〜3問出題されるため、今日の優先学習に設定しています。`,
    progress: {
      done: steps.value.filter(s => s.status === 'DONE').length,
      total: steps.value.length
    },
    cta: {
      label: ctaLabel,
      to: current?.to || '/academy'
    }
  }
})


// --- Helpers ---
function getTypeRoute(type: string): string {
  switch (type) {
    case 'lecture': return '/academy/learn/topics'
    case 'practice': return '/academy/learn/review'
    case 'flashcard': return '/academy/learn/review/flashcards'
    default: return '/academy'
  }
}

function handleCtaClick(to: string) {
  router.push(to)
}
</script>

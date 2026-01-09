<template>
  <div class="mb-6">
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0 relative">
        <div class="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl shadow-sm border border-emerald-200">
          <Icon v-if="feedback.mood === 'happy'" icon="ph:sun-fill" class="text-amber-500 text-2xl" />
          <Icon v-else-if="feedback.mood === 'concerned'" icon="ph:cloud-rain-fill" class="text-blue-400 text-2xl" />
          <Icon v-else icon="ph:robot-fill" class="text-emerald-600 text-2xl" />
        </div>
        <div class="absolute -bottom-1 -right-1 h-5 w-5 bg-white rounded-full flex items-center justify-center text-[10px] shadow-sm border border-slate-100">
          AI
        </div>
      </div>
      
      <div class="flex-1 min-w-0">
        <div class="bg-white rounded-tr-2xl rounded-br-2xl rounded-bl-2xl p-4 shadow-sm border border-slate-100 relative">
          <!-- Speech bubble tail -->
          <div class="absolute top-0 -left-2 w-3 h-3 bg-white border-l border-t border-slate-100 transform -rotate-45"></div>
          
          <h2 class="text-sm font-bold text-slate-900 mb-1">
            こんにちは、Nakayamaさん
          </h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            {{ feedback.summaryText }}
          </p>
        </div>
      </div>
    </div>

    <!-- Exam Countdown -->
    <div class="mt-4 flex justify-end">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
         <span class="text-[10px] sm:text-xs font-bold text-slate-500">試験まであと</span>
         <span class="text-sm sm:text-base font-black text-red-500 tabular-nums">86</span>
         <span class="text-[10px] sm:text-xs font-bold text-slate-400">日</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AiDailyFeedback } from '~/composables/useAcademyMock'

defineProps<{
  feedback: AiDailyFeedback
}>()
</script>

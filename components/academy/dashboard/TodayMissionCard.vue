<template>
  <div class="bg-white rounded-2xl border border-emerald-100 shadow-xl shadow-emerald-500/10 p-4 md:p-6 relative overflow-hidden group">
    <!-- Subtle Background Pattern (Optional) -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none"></div>

    <div class="relative z-10">
      <!-- Header: Title & Progress -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 inline-block px-2 py-1 rounded mb-2">
            TODAY'S MISSION
          </h2>
          <div class="text-2xl md:text-3xl font-black text-slate-900 leading-snug">
            今日のメインタスク
            <span class="text-sm md:text-base font-bold text-slate-400 ml-1 md:ml-2 whitespace-nowrap">({{ mission.totalMinutes }}分)</span>
          </div>
        </div>
        <!-- Progress Dots -->
        <div class="flex gap-1.5">
          
        </div>
      </div>

      <!-- Current Step Detail -->
      <div class="mb-5 px-1">
        <h3 class="text-xl font-bold text-slate-900 leading-tight">
          <span class="text-[var(--brand)] mr-2">STEP {{ nextStepIndex + 1 }}</span>
          {{ currentStepTitle }}
        </h3>
      </div>

      <!-- AI Reason / Context -->
      <div class="mb-3 bg-slate-50 rounded-xl border border-slate-100 p-4 relative">
        <!-- Decoration -->
        <div class="absolute -top-2.5 left-4 px-2 bg-white text-[10px] font-black text-slate-400 border border-slate-100 rounded-full flex items-center gap-1">
           <Icon icon="ph:robot-fill" class="text-blue-500" />
           AIによる学習判断
        </div>
        <p class="text-sm font-medium text-slate-600 leading-relaxed whitespace-pre-line mt-1">
          {{ mission.reasonText }}
        </p>
      </div>

      <!-- CTA Button -->
      <button 
        class="w-full bg-[var(--brand)] hover:bg-[#188070] text-white font-black text-lg py-4 rounded-xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group/btn"
        @click="$emit('click-cta', mission.cta.to)"
      >
        <span>{{ mission.cta.label }}</span>
        <Icon icon="ph:arrow-right-bold" class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
      </button>

      <!-- Pre-Reward / Motivation -->
      <div class="mt-5 pt-2 px-1">
         <div class="text-xs font-black text-slate-700 mb-2 flex items-center gap-1.5">
           <Icon icon="ph:check-circle-fill" class="text-emerald-500" />
           完了すると...
         </div>
         <ul class="space-y-2">
           <li class="flex items-center gap-2 text-xs font-bold text-slate-500">
             <span class="text-base">🔥</span> 
             <span>連続学習記録が <span class="text-emerald-600 bg-emerald-50 px-1 rounded">1日更新 されます</span></span>
           </li>
           <li class="flex items-center gap-2 text-xs font-bold text-slate-500">
             <span class="text-base">📈</span> 
             <span>循環器系の理解度が <span class="text-emerald-600 bg-emerald-50 px-1 rounded">最新状態に更新 されます</span></span>
           </li>
         </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface MissionData {
  totalMinutes: number
  reasonText: string
  progress: {
    done: number
    total: number
  }
  cta: {
    label: string
    to: string
  }
}

defineProps<{
  mission: MissionData
  currentStepTitle: string
  nextStepIndex: number
}>()

defineEmits<{
  (e: 'click-cta', to: string): void
}>()
</script>

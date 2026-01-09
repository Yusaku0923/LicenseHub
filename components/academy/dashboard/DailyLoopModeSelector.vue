<template>
  <div class="flex justify-center gap-4 sm:gap-8 py-2">
    <button
      v-for="mode in modes"
      :key="mode.id"
      class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
      :class="[
        currentMode === mode.id
         ? (
             mode.id === 'mini' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40 ring-4 ring-blue-50' :
             mode.id === 'standard' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-50' :
             'bg-amber-500 text-white shadow-lg shadow-amber-500/40 ring-4 ring-amber-50'
           )
         : 'bg-white text-slate-400 border-2 border-slate-100 hover:border-slate-200'
      ]"
      @click="$emit('update:mode', mode.id)"
    >
      {{ mode.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
export type LearningMode = 'mini' | 'standard' | 'intensive'

defineProps<{
  currentMode: LearningMode
}>()

defineEmits<{
  (e: 'update:mode', mode: LearningMode): void
}>()

const modes = [
  { id: 'mini' as LearningMode, label: 'ミニ' },
  { id: 'standard' as LearningMode, label: '標準' },
  { id: 'intensive' as LearningMode, label: '集中' }
]
</script>

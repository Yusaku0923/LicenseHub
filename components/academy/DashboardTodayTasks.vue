<template>
  <div class="space-y-4">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-slate-50 bg-slate-50/30 p-4 transition-all hover:bg-white hover:shadow-md hover:shadow-slate-200/50 active:scale-[0.99]"
    >
      <div class="relative z-10 flex flex-1 items-start gap-4">
        <button
          class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all"
          :class="task.isCompleted 
            ? 'border-emerald-500 bg-emerald-500 text-white' 
            : 'border-slate-300 bg-white group-hover:border-emerald-400'"
          @click="$emit('complete', task.id)"
        >
          <svg v-if="task.isCompleted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3">
            <path fill-rule="evenodd" d="M16.704 4.176a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
          </svg>
        </button>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span 
              class="inline-flex rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider transition-colors"
              :class="typeStyles(task.type)"
            >
              {{ labelFor(task.type) }}
            </span>
            <span class="text-[10px] font-bold text-slate-400">
              {{ task.estimatedMinutes }}m
            </span>
          </div>
          <h3 
            class="mt-1 text-sm font-bold text-slate-800 transition-colors group-hover:text-emerald-700"
            :class="{ 'line-through opacity-40': task.isCompleted }"
          >
            {{ task.title }}
          </h3>
        </div>
      </div>

      <button
        type="button"
        class="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all"
        :class="
          task.isCompleted
            ? 'bg-slate-100 text-slate-400'
            : 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 group-hover:scale-105'
        "
        @click="$emit('start', task.id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="h-4 w-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="tasks.every(t => t.isCompleted)" class="rounded-3xl bg-emerald-50/50 p-6 text-center border border-emerald-100/50">
      <p class="text-sm font-bold text-emerald-800">🎉 All tasks completed!</p>
      <p class="mt-0.5 text-[10px] text-emerald-600 font-medium">Keep up the great work.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DailyTask } from '~/composables/useAcademyMock'

defineProps<{
  tasks: DailyTask[]
}>()

defineEmits<{
  (e: 'complete', taskId: string): void
  (e: 'start', taskId: string): void
}>()

const labelFor = (type: DailyTask['type']) => {
  if (type === 'lecture') return 'Lec'
  if (type === 'practice') return 'Prac'
  return 'Memo'
}

const typeStyles = (type: DailyTask['type']) => {
  if (type === 'lecture') return 'bg-blue-100/50 text-blue-600'
  if (type === 'practice') return 'bg-amber-100/50 text-amber-600'
  return 'bg-purple-100/50 text-purple-600'
}
</script>

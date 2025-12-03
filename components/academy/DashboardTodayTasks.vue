<template>
  <div class="rounded-3xl bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-sm ring-1 ring-emerald-100/60">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          今日の最優先
        </p>
        <h2 class="text-lg font-semibold text-slate-900">タスクを終わらせて進捗を前に</h2>
        <p class="text-sm text-slate-600">迷わず取り組める小さなステップを用意しました。</p>
      </div>
      <NuxtLink
        to="/academy/practice"
        class="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
      >
        すぐに学習を開始
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <div class="mt-5 space-y-3">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="flex items-start justify-between gap-3 rounded-2xl border border-emerald-100/70 bg-white/90 px-4 py-4 shadow-sm"
      >
        <div class="flex items-start gap-3">
          <button
            class="mt-1 h-5 w-5 rounded-full border-2 border-emerald-500 transition hover:scale-105"
            :class="task.isCompleted ? 'bg-emerald-500' : 'bg-white'"
            :aria-label="`完了: ${task.title}`"
            @click="$emit('complete', task.id)"
          />
          <div>
            <div class="flex items-center gap-2">
              <span class="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 capitalize">
                {{ labelFor(task.type) }}
              </span>
              <p class="text-sm font-semibold text-slate-900">
                {{ task.title }}
              </p>
            </div>
            <p class="mt-1 text-sm text-slate-600">
              {{ task.description }}
            </p>
            <p class="mt-1 text-xs text-slate-500">
              目安 {{ task.estimatedMinutes }}分
            </p>
          </div>
        </div>
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold transition shadow"
          :class="
            task.isCompleted
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
          "
          @click="$emit('start', task.id)"
        >
          <span aria-hidden="true">{{ task.isCompleted ? '✓' : '→' }}</span>
        </button>
      </div>
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
  if (type === 'lecture') return '講義'
  if (type === 'practice') return '演習'
  return '暗記'
}
</script>

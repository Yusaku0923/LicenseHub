<template>
  <section class="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm md:p-5">
    <header class="mb-3">
      <h3 class="text-sm font-semibold text-slate-900">
        試験までのカウントダウン
      </h3>
      <p class="text-xs text-slate-500">
        目標日を意識してペースを合わせましょう。
      </p>
    </header>

    <div class="flex items-center justify-between rounded-lg bg-emerald-50/70 px-4 py-3">
      <div>
        <p class="text-[11px] font-semibold text-emerald-800">
          残り日数
        </p>
        <p class="text-2xl font-bold text-emerald-900 tabular-nums">
          <span v-if="daysUntilExam !== null">{{ daysUntilExam }}</span>
          <span v-else class="text-slate-500">未設定</span>
        </p>
      </div>
      <p class="text-xs text-emerald-900">
        {{ examDate ? `試験日: ${examDate}` : '設定すると逆算計画が立てやすくなります' }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MeProfile } from '~/types/academy'

const props = defineProps<{
  profile: MeProfile | null
}>()

const examDate = computed(() => props.profile?.examDate ?? null)

const daysUntilExam = computed(() => {
  if (!examDate.value) return null
  const today = new Date()
  const exam = new Date(examDate.value)
  const diff = Math.ceil((exam.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24))
  return diff >= 0 ? diff : 0
})
</script>

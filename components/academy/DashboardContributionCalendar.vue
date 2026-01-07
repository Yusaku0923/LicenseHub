<template>
  <div class="space-y-6">
    <!-- Streak Header -->
    <div
      class="flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 p-4 ring-1 ring-orange-100"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500"
        >
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-orange-400">
            連続学習記録
          </p>
          <p class="text-xl font-black text-slate-900">{{ currentStreak }}日</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-xs font-bold text-slate-400">その調子！</p>
      </div>
    </div>

    <!-- 7 Day Timeline -->
    <div class="flex items-center justify-between px-2">
      <div
        v-for="(day, index) in last7Days"
        :key="day.date"
        class="flex flex-col items-center gap-2"
      >
        <div class="relative">
          <!-- Connection Line -->
          <div
            v-if="index < last7Days.length - 1"
            class="absolute left-full top-1/2 h-0.5 w-[calc(100%_+_1.5rem)] -translate-y-1/2 bg-slate-100"
            :class="{
              'bg-emerald-200':
                day.completed && last7Days[index + 1]?.completed,
            }"
            style="width: 200%; z-index: 0"
          ></div>

          <!-- Circle -->
          <div
            class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-white transition-all"
            :class="
              day.completed
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-slate-100 text-slate-300'
            "
          >
            <svg
              v-if="day.completed"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span v-else class="h-2 w-2 rounded-full bg-slate-300"></span>
          </div>
        </div>
        <span
          class="text-[10px] font-bold uppercase tracking-wider"
          :class="day.isToday ? 'text-emerald-600' : 'text-slate-400'"
        >
          {{ day.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { DailyContribution } from "~/composables/useAcademyMock";

const props = defineProps<{
  contributions: DailyContribution[];
}>();

const sorted = computed(() =>
  [...props.contributions].sort((a, b) => a.date.localeCompare(b.date))
);

const today = new Date();

// Helper to get last 7 days
const last7Days = computed(() => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = sorted.value.find((c) => c.date === dateStr);

    days.push({
      date: dateStr,
      label: d.toLocaleDateString("ja-JP", { weekday: "short" }),
      isToday: i === 0,
      completed: !!(entry && entry.score > 0),
    });
  }
  return days;
});

// Calculate simpler streak based on the last 7 days for display (or use the one from mock if passed down, but let's recalculate simply here or trust props)
// Actually improved logic: Iterate backwards from today
const currentStreak = computed(() => {
  let streak = 0;
  const reversed = [...sorted.value].reverse();
  // Check if today is completed, if so include it, if not, check yesterday
  // Simplified logic for demo: count continuous non-zero entries from end
  // Users streak logic usually permits "today not done yet" if yesterday was done?
  // For strict sync with the mock logic, we might just rely on the mock's property or recalculate properly.
  // Let's just count continuous days present in contributions array from yesterday/today.

  // Note: The prop passed 'contributions' might be incomplete history.
  // Ideally we should use the streak from `useAcademyMock` but that's not passed as prop here.
  // For now, let's just count visually visible streak in the data or rely on a standard algo.

  // Re-implementing simplified streak
  const todayStr = new Date().toISOString().slice(0, 10);
  let dateProps = new Date();

  // Check today
  let entry = sorted.value.find((c) => c.date === todayStr);
  if (entry && entry.score > 0) streak++;

  // Check past
  for (let i = 1; i < 100; i++) {
    dateProps.setDate(dateProps.getDate() - 1);
    const dStr = dateProps.toISOString().slice(0, 10);
    const e = sorted.value.find((c) => c.date === dStr);
    if (e && e.score > 0) streak++;
    else break;
  }
  return streak;
});
</script>

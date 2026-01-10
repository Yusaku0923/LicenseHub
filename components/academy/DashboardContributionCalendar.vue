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
          <Icon icon="ph:fire-fill" class="h-6 w-6" />
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

    <!-- 5 Day Timeline -->
    <div class="flex items-start px-4">
      <template v-for="(day, index) in displayDays" :key="day.date">
        <div class="flex flex-col items-center gap-3">
          <!-- Circle -->
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-white transition-all"
            :class="
              day.completed
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-slate-100 text-slate-300'
            "
          >
            <Icon v-if="day.completed" icon="ph:check-bold" class="h-5 w-5" />
            <span v-else class="h-2 w-2 rounded-full bg-slate-300"></span>
          </div>

          <!-- Date Label -->
          <div class="text-center flex flex-col items-center gap-0.5">
            <span class="text-[10px] font-bold text-slate-400 leading-none">{{ day.dateLabel }}</span>
            <span
              class="text-[10px] font-black uppercase tracking-wider"
              :class="day.isToday ? 'text-emerald-600' : 'text-slate-300'"
            >
              {{ day.weekLabel }}
            </span>
          </div>
        </div>

        <!-- Connection Line (between circles) -->
        <div
          v-if="index < displayDays.length - 1"
          class="mt-5 h-0.5 flex-1 bg-slate-100"
          :class="{
            'bg-emerald-200': day.completed && displayDays[index + 1]?.completed,
          }"
        />
      </template>
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

// Helper to get last 5 days
const displayDays = computed(() => {
  const days = [];
  for (let i = 4; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = sorted.value.find((c) => c.date === dateStr);

    days.push({
      date: dateStr,
      // M/D (e.g. 1/8)
      dateLabel: `${d.getMonth() + 1}/${d.getDate()}`,
      // Weekday (e.g. Mon)
      weekLabel: d.toLocaleDateString("en-US", { weekday: "short" }),
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

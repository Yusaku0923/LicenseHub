<template>
  <div class="mx-auto max-w-5xl space-y-12 pb-24">
    <!-- Header: Greeting & Status -->
    <header class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between px-2">
      <div>
        <p class="text-sm font-bold uppercase tracking-wider text-slate-500">
          {{ new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }}
        </p>
        <h1 class="mt-1 text-3xl font-black text-slate-900 md:text-5xl">
          Hello, User.
        </h1>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <p class="text-xs font-bold text-slate-400">Next Exam</p>
          <p class="text-lg font-bold text-slate-900">Oct 24, 2026</p>
        </div>
        <div class="h-10 w-px bg-slate-200"></div>
        <div class="text-right">
          <p class="text-xs font-bold text-slate-400">Tasks Left</p>
          <p class="text-lg font-bold text-emerald-600">{{ incompleteTasksCount }}</p>
        </div>
      </div>
    </header>

    <!-- Main Focus: The "One Thing to Do" -->
    <section>
      <div 
        class="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 shadow-2xl transition-all hover:shadow-emerald-900/20 md:p-12"
      >
        <!-- Background Decoration -->
        <div class="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
        <div class="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-[80px] transition-all duration-1000 group-hover:bg-emerald-500/20"></div>
        
        <div class="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div class="max-w-2xl space-y-6">
            <div class="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400 ring-1 ring-emerald-500/20">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Current Focus
            </div>
            
            <div>
              <h2 class="text-4xl font-black leading-tight text-white md:text-6xl">
                Chapter 3: <br class="hidden md:block" />
                <span class="text-emerald-400">Pharmacology Basics</span>
              </h2>
              <p class="mt-4 text-lg text-slate-400 md:text-xl md:leading-relaxed">
                You're on a streak! Complete this chapter to reach 45% overall mastery.
                The concepts here are crucial for the upcoming mock exam.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <button 
                class="flex h-14 items-center gap-3 rounded-2xl bg-emerald-500 px-8 text-base font-bold text-slate-900 transition-all hover:scale-105 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                @click="startFirstAction"
              >
                <span class="text-xl">▶</span>
                <span>Start Session</span>
              </button>
              <button class="flex h-14 items-center gap-3 rounded-2xl bg-white/5 px-8 text-base font-bold text-white transition-all hover:bg-white/10">
                <span>View Details</span>
              </button>
            </div>
          </div>

          <!-- Quick Progress Circle (Visual Indicator) -->
          <div class="hidden shrink-0 md:block">
             <div class="relative flex h-48 w-48 items-center justify-center rounded-full border-8 border-slate-800 bg-slate-900 shadow-2xl">
               <svg class="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" stroke-width="8" />
                 <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="8" stroke-dasharray="251.2" :stroke-dashoffset="251.2 * (1 - 0.45)" stroke-linecap="round" />
               </svg>
               <div class="text-center">
                 <span class="block text-3xl font-black text-white">45<span class="text-lg">%</span></span>
                 <span class="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Mastery</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Secondary Content: Organized in a clean 2-column layout -->
    <div class="grid gap-12 lg:grid-cols-2">
      <!-- Left: Today's Mission List -->
      <section class="space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold text-slate-900">Today's Missions</h3>
          <span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{{ incompleteTasksCount }} remaining</span>
        </div>
        <DashboardTodayTasks
          :tasks="todayTasks"
          @complete="completeTask"
          @start="startTask"
        />
      </section>

      <!-- Right: Analytics & Tools -->
      <section class="space-y-8">
        <!-- Minimal Stats Row -->
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-[2rem] bg-slate-50 p-6 transition-colors hover:bg-emerald-50/50">
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400">Weekly Study</p>
            <p class="mt-2 text-3xl font-black text-slate-900">{{ progressSummary.studiedMinutesThisWeek }}<span class="text-sm text-slate-400 ml-1">min</span></p>
          </div>
          <div class="rounded-[2rem] bg-slate-50 p-6 transition-colors hover:bg-emerald-50/50">
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400">Current Streak</p>
            <p class="mt-2 text-3xl font-black text-slate-900">{{ progressSummary.consecutiveDays }}<span class="text-sm text-slate-400 ml-1">days</span></p>
          </div>
        </div>

        <!-- Contribution (Simplified) -->
        <div class="space-y-4">
          <h4 class="text-lg font-bold text-slate-900">Consistency</h4>
          <DashboardContributionCalendar :contributions="contributionCalendar" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DashboardTodayTasks from '~/components/academy/DashboardTodayTasks.vue'
import DashboardContributionCalendar from '~/components/academy/DashboardContributionCalendar.vue'
import { useAcademyMock } from '~/composables/useAcademyMock'

definePageMeta({
  layout: 'academy',
})

const {
  progressSummary,
  todayTasks,
  contributionCalendar,
  incompleteTasksCount,
  completeTask,
} = useAcademyMock()

const startTask = (id: string) => {
  console.log('Start task:', id)
  navigateTo('/academy/practice')
}

const startFirstAction = () => {
  const first = todayTasks.value.find(t => !t.isCompleted)
  if (first) {
    startTask(first.id)
  } else {
    navigateTo('/academy/practice')
  }
}
</script>

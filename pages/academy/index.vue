<template>
  <div>
    
    <!-- Mobile Layout (Mission Style) -->
    <div class="lg:hidden">
      <DashboardTodayTasksSection />

      <!-- Progress Feedback Section (Mobile) -->
      <section class="mt-6 space-y-4">
        <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest px-2">学習進捗</h2>
        <div class="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
          <DashboardProgressFeedback :compact="true" />
        </div>
      </section>
    </div>

    <!-- PC Layout (2 Columns) -->
    <div class="hidden lg:grid lg:grid-cols-12 lg:gap-10">
      
      <!-- Progress Feedback Section (Full Width) -->
      <section class="lg:col-span-12 space-y-4">
        <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest px-2">学習進捗</h2>
        <div class="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <DashboardProgressFeedback />
        </div>
      </section>
      
      <div class="lg:col-span-8 space-y-10">
        <!-- Today's Tasks -->
        <DashboardTodayTasksSection />
      </div>

      <!-- Right Column (Stats & Info) - 4/12 -->
      <div class="lg:col-span-4 space-y-10">
        
        <!-- Learning Record (Contribution) -->
        <section class="space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest px-2">学習の記録</h2>
          <div class="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <div class="mb-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                  <div class="text-3xl font-black text-slate-900 tracking-tighter">12<span class="text-[10px] text-slate-300 ml-1 font-bold uppercase">Days</span></div>
                  <div class="h-6 w-[1px] bg-slate-100"></div>
                  <p class="text-[10px] font-bold text-slate-400 leading-tight">継続は力なり！</p>
              </div>
            </div>
            <div class="overflow-x-auto pb-1 custom-scrollbar">
              <DashboardContributionCalendar :contributions="contributionCalendar" color="#10b981" />
            </div>
          </div>
        </section>

        <!-- Learning Menu -->
        <section class="space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest px-2">学習メニュー</h2>
          <div class="grid grid-cols-1 gap-4">
             <NuxtLink
              v-for="menu in menus"
              :key="menu.to"
              :to="menu.to"
              class="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 transition-all hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-0.5"
            >
              <div class="flex items-center gap-4">
                 <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg transition-all group-hover:bg-slate-900 group-hover:text-white">
                  <Icon v-if="menu.title === '講義資料'" icon="ph:book-open-text-fill" class="w-5 h-5 text-blue-500 group-hover:text-white" />
                  <Icon v-else-if="menu.title === '過去問演習'" icon="ph:target-fill" class="w-5 h-5 text-emerald-500 group-hover:text-white" />
                  <Icon v-else icon="ph:lightbulb-fill" class="w-5 h-5 text-amber-500 group-hover:text-white" />
                </div>
                <div>
                  <h4 class="text-sm font-black text-slate-900 leading-tight">{{ menu.title }}</h4>
                  <p class="text-[10px] font-bold text-slate-400 opacity-80">{{ menu.description }}</p>
                </div>
              </div>
              <div class="text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                  <Icon icon="ph:arrow-right-bold" class="w-4 h-4" />
              </div>
            </NuxtLink>
          </div>
        </section>



      </div>
    </div>

    <!-- Original Mobile Section Content (Visible only on mobile) -->
    <div class="lg:hidden space-y-8 mt-8">
      <!-- 学習の記録 -->
      <section class="space-y-4">
        <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest px-2">学習の継続</h2>
        <div class="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center gap-5">
                <div class="text-4xl font-black text-slate-900 tracking-tighter">12<span class="text-[11px] text-slate-300 ml-1 font-bold uppercase tracking-[0.2em]">Days</span></div>
                <div class="h-8 w-[1px] bg-slate-100"></div>
                <p class="text-[11px] font-bold text-slate-400 leading-relaxed max-w-[200px]">素晴らしいです！コンスタントに学習を進められています。</p>
            </div>
          </div>
          <div class="overflow-x-auto pb-2 custom-scrollbar">
            <DashboardContributionCalendar :contributions="contributionCalendar" color="#10b981" />
          </div>
        </div>
      </section>

      <!-- メニュー一覧 -->
      <section class="space-y-4 pb-20">
        <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest px-2">学習メニュー</h2>
        <div class="grid gap-3">
          <NuxtLink
            v-for="menu in menus"
            :key="menu.to"
            :to="menu.to"
            class="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-5 transition-all hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-0.5"
          >
            <div class="flex items-center gap-5">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-xl transition-all group-hover:bg-slate-900 group-hover:text-white">
                <Icon v-if="menu.title === '講義資料'" icon="ph:book-open-text-fill" class="w-6 h-6 text-blue-500 group-hover:text-white" />
                <Icon v-else-if="menu.title === '過去問演習'" icon="ph:target-fill" class="w-6 h-6 text-emerald-500 group-hover:text-white" />
                <Icon v-else icon="ph:lightbulb-fill" class="w-6 h-6 text-amber-500 group-hover:text-white" />
              </div>
              <div>
                <h4 class="text-lg font-black text-slate-900">{{ menu.title }}</h4>
                <p class="text-[11px] font-bold text-slate-400 opacity-80">{{ menu.description }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-8">
                <div class="text-right">
                    <div class="text-2xl font-black text-slate-100 group-hover:text-slate-900 transition-colors">
                        {{ menu.stat }}<span class="text-[10px] ml-0.5 font-bold">{{ menu.unit }}</span>
                    </div>
                </div>
                <div class="text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                  <Icon icon="ph:arrow-right-bold" class="w-5 h-5" />
                </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// --- 1. Imports & Macros ---
import DashboardTodayTasksSection from '~/components/academy/dashboard/DashboardTodayTasksSection.vue'
import DashboardProgressFeedback from '~/components/academy/dashboard/DashboardProgressFeedback.vue'
import { useAcademyMock } from '~/composables/useAcademyMock'
import DashboardContributionCalendar from '~/components/academy/DashboardContributionCalendar.vue'

definePageMeta({
  layout: "academy",
})

// --- 2. State Management ---
const {
  contributionCalendar,
  lectureStats,
  practiceStats,
  flashcardStats,
} = useAcademyMock()

// --- 3. Computed Menus ---
const menus = computed(() => [
  {
    title: '講義資料',
    description: '体系的な知識のインプット',
    to: '/academy/learn/topics',
    stat: lectureStats.value.progressPercent,
    unit: '%'
  },
  {
    title: '過去問演習',
    description: 'AIによる実践アウトプット',
    to: '/academy/practice',
    stat: practiceStats.value.weeklyAnswered,
    unit: '問'
  },
  {
    title: '暗記カード',
    description: '隙間時間を活用した復習',
    to: '/academy/flashcards',
    stat: flashcardStats.value.dueCards,
    unit: '枚'
  }
])
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f1f5f9;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #e2e8f0;
}

.tracking-tighter {
  letter-spacing: -0.05em;
}
</style>

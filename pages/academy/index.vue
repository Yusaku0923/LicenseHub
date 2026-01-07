<template>
  <div class="mx-auto max-w-[850px] px-6 py-4 md:py-10">
    <!-- Header: Optimized & Soft -->
    <header class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 pb-10">
      <div class="flex items-center gap-3">
        <div class="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight">学習状況</h1>
      </div>

      <!-- Mode Selector: High Visibility & Accessibility -->
      <div class="flex rounded-2xl bg-slate-100 p-2 shadow-inner w-full md:w-auto overflow-hidden">
        <button
          v-for="m in modes"
          :key="m.id"
          @click="handleSelectMode(m.id)"
          class="relative flex-1 px-8 py-4 text-sm font-black transition-all duration-300 rounded-xl group"
          :class="selectedMode === m.id ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'"
        >
          <div
            v-if="selectedMode === m.id"
            class="absolute inset-0 rounded-xl bg-white shadow-xl shadow-emerald-600/10"
          ></div>
          <span class="relative z-10">{{ m.label }}</span>
        </button>
      </div>
    </header>

    <!-- 今日のメニュー: Responsive Horizontal Traffic Light -->
    <section class="mb-16 space-y-8">
      <div class="flex items-center justify-between px-2">
        <div class="flex items-center gap-2">
           <h2 class="text-lg font-black text-slate-800">今日のおすすめ</h2>
           <span class="px-2 py-0.5 rounded bg-emerald-50 text-[10px] font-black text-emerald-600 border border-emerald-100 uppercase tracking-tighter">AI最適化済み</span>
        </div>
        <div class="text-xs font-bold text-slate-500 px-4 py-1.5 bg-white rounded-full border border-slate-100 shadow-sm">
          目安: {{ totalMinutes }} 分
        </div>
      </div>

      <!-- 横並び固定エリア -->
      <div class="relative w-full bg-white rounded-[3rem] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] p-6 md:p-14 min-h-[380px] flex items-center">
        
        <!-- 横方向のスクロールコンテナ -->
        <div class="flex flex-row items-start justify-center gap-4 md:gap-14 w-full overflow-x-auto custom-scrollbar px-4">
          <TransitionGroup 
            name="task-slide" 
            tag="div" 
            class="flex flex-row gap-4 md:gap-14"
          >
            <button
              v-for="(task, index) in todayTasks"
              :key="task.id"
              class="group relative flex flex-col items-center outline-none shrink-0"
            >
              <!-- 円型ノード: アイコンなし・テキスト重視 -->
              <div 
                class="relative flex h-28 w-28 md:h-48 md:w-48 items-center justify-center rounded-full transition-all duration-500 shadow-lg group-hover:scale-105 active:scale-95 overflow-hidden"
                :class="{
                  'bg-blue-600 shadow-blue-200/50': task.type === 'lecture',
                  'bg-emerald-600 shadow-emerald-200/50': task.type === 'practice',
                  'bg-amber-500 shadow-amber-200/50': task.type === 'flashcard',
                }"
              >
                <div class="flex flex-col items-center text-center px-3 md:px-6 text-white">
                  <span class="text-[9px] md:text-[11px] font-black uppercase tracking-widest opacity-80 mb-0.5 md:mb-1">Step 0{{ index + 1 }}</span>
                  <h3 class="text-xs md:text-xl font-black leading-tight mb-1 md:mb-3">
                    {{ task.title }}
                  </h3>
                  <!-- 概要 (今日やることを入れる) -->
                  <p class="text-[8px] md:text-[11px] font-bold opacity-90 leading-tight md:leading-relaxed mb-1 md:mb-4 max-w-[85px] md:max-w-[140px] line-clamp-2">
                    {{ task.description }}
                  </p>
                  <div class="inline-flex px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/25 text-[8px] md:text-[11px] font-black tracking-widest">
                    {{ task.estimatedMinutes }}分
                  </div>
                </div>

                <!-- 光の筋 (プレミアム感) -->
                <div class="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%] pointer-events-none"></div>
              </div>

              <!-- 常時表示のボタン -->
              <div class="mt-6 flex h-8 md:h-11 items-center justify-center px-6 md:px-10 rounded-full bg-slate-900 text-[9px] md:text-[11px] font-black text-white shadow-md transition-all group-hover:bg-emerald-600 group-hover:shadow-lg group-hover:shadow-emerald-500/20 active:scale-95">
                 始める <span class="ml-1 opacity-60">→</span>
              </div>
            </button>
          </TransitionGroup>
        </div>

        <!-- 背景のライン -->
        <div class="absolute top-[38%] left-32 right-32 h-[1px] bg-slate-50 -z-10 hidden md:block"></div>
      </div>
    </section>

    <!-- その他セクション -->
    <div class="space-y-12">
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
                <span v-if="menu.title === '講義資料'">📖</span>
                <span v-else-if="menu.title === '過去問演習'">🎯</span>
                <span v-else>💡</span>
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
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7" />
                  </svg>
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
import { useDailyLearning, type LearningMode } from '~/composables/useDailyLearning'
import { useAcademyMock } from '~/composables/useAcademyMock'
import DashboardContributionCalendar from '~/components/academy/DashboardContributionCalendar.vue'

definePageMeta({
  layout: "academy",
})

// --- 2. State Management ---
const { selectedMode, todayTasks, totalMinutes, selectMode } = useDailyLearning()

const modes = [
  { id: 'mini' as LearningMode, label: 'ミニ' },
  { id: 'standard' as LearningMode, label: '標準' },
  { id: 'intensive' as LearningMode, label: '集中' }
]

const {
  contributionCalendar,
  lectureStats,
  practiceStats,
  flashcardStats,
} = useAcademyMock()

// ユーザーのアクション
function handleSelectMode(mode: LearningMode) {
  selectMode(mode)
}

// --- 3. Computed Menus ---
const menus = computed(() => [
  {
    title: '講義資料',
    description: '体系的な知識のインプット',
    to: '/academy/lecture',
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
.task-slide-enter-active,
.task-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.task-slide-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}
.task-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}
.task-slide-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

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

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 1;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>

<template>
  <div class="space-y-8">
    <AcademyPageHeader
        eyebrow="Course"
        title="東販 学習コース"
        subtitle="資格取得に向けた包括的な学習コースです。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition-all active:scale-95"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div class="space-y-8">
       <!-- Course Stats -->
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap gap-6 items-center">
        <div class="flex-1 min-w-[200px]">
             <div class="text-3xl font-black text-slate-900">25%</div>
             <div class="text-xs font-bold text-slate-400">コース全体の進捗</div>
             <div class="w-full bg-slate-100 rounded-full h-2 mt-2">
                 <div class="bg-blue-500 h-2 rounded-full w-1/4"></div>
             </div>
        </div>
        <div class="flex gap-8 border-l border-slate-100 pl-8">
            <div>
                <div class="text-2xl font-black text-slate-800">10</div>
                <div class="text-xs font-bold text-slate-400">Chapters</div>
            </div>
            <div>
                <div class="text-2xl font-black text-slate-800">50</div>
                <div class="text-xs font-bold text-slate-400">Sections</div>
            </div>
        </div>
      </div>

      <!-- Chapters List -->
      <div class="space-y-4">
        <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest px-2">章一覧</h2>
        <div class="grid gap-4">
          <div
            v-for="i in 10"
            :key="i"
            class="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                    <span class="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">Chapter {{ i }}</span>
                    <h3 class="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    章タイトルサンプル
                    </h3>
                </div>
                <p class="text-xs text-slate-400 mb-3">医薬品の適正使用と安全対策に関する基本的な知識を習得します。</p>
                
                <div class="flex items-center gap-3 w-full max-w-sm">
                   <div class="flex-1 bg-slate-50 rounded-full h-1.5">
                      <div class="bg-emerald-500 h-1.5 rounded-full" :style="{ width: `${Math.random() * 100}%` }"></div>
                   </div>
                   <span class="text-[10px] font-bold text-slate-400">12/20 Sec</span>
                </div>
              </div>
              
              <button class="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <Icon icon="ph:caret-right-bold" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AcademyPageHeader from '~/components/academy/common/AcademyPageHeader.vue'

definePageMeta({
  layout: "academy"
})
</script>


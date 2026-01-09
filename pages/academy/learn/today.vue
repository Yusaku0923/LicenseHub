<template>
  <div class="space-y-8">
    <AcademyPageHeader
      eyebrow="Today's Lesson"
      title="今日のレッスン"
      subtitle="最適な学習プランが生成されました。順番に進めていきましょう。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition-all active:scale-95"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div class="max-w-3xl mx-auto space-y-12">
        <!-- Main Timeline -->
        <div class="relative">
             <div class="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-100"></div>

             <div class="space-y-8">
                 <!-- Step 1: Lecture -->
                 <div class="relative flex gap-6">
                     <div class="relative z-10 shrink-0 w-14 h-14 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center shadow-sm">
                         <Icon icon="ph:book-open-text-fill" class="w-6 h-6 text-blue-500" />
                     </div>
                     <div class="flex-1 pt-1">
                         <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group">
                             <div class="flex justify-between items-start mb-4">
                                 <div>
                                     <span class="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded mb-2">STEP 1</span>
                                     <h3 class="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">医薬品の定義と分類</h3>
                                 </div>
                                 <span class="text-xs font-bold text-slate-400">15 min</span>
                             </div>
                             <p class="text-sm text-slate-500 mb-4">医薬品医療機器等法における医薬品の定義、および毒薬・劇薬の分類について学びます。</p>
                             <button class="w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-blue-500 hover:text-white transition-all">
                                 講義を読む
                             </button>
                         </div>
                     </div>
                 </div>

                 <!-- Step 2: Practice -->
                 <div class="relative flex gap-6">
                     <div class="relative z-10 shrink-0 w-14 h-14 rounded-full bg-white border-4 border-emerald-100 flex items-center justify-center shadow-sm">
                         <Icon icon="ph:pencil-circle-fill" class="w-6 h-6 text-emerald-500" />
                     </div>
                     <div class="flex-1 pt-1">
                         <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group">
                             <div class="flex justify-between items-start mb-4">
                                 <div>
                                     <span class="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded mb-2">STEP 2</span>
                                     <h3 class="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">理解度確認テスト</h3>
                                 </div>
                                 <span class="text-xs font-bold text-slate-400">10 min</span>
                             </div>
                             <p class="text-sm text-slate-500 mb-4">講義で学んだ内容をもとに、実戦形式の5問に挑戦します。</p>
                             <button class="w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-emerald-500 hover:text-white transition-all">
                                 問題を解く
                             </button>
                         </div>
                     </div>
                 </div>

                 <!-- Step 3: Flashcard -->
                <div class="relative flex gap-6">
                     <div class="relative z-10 shrink-0 w-14 h-14 rounded-full bg-white border-4 border-amber-100 flex items-center justify-center shadow-sm">
                         <Icon icon="ph:brain-fill" class="w-6 h-6 text-amber-500" />
                     </div>
                     <div class="flex-1 pt-1">
                         <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group">
                             <div class="flex justify-between items-start mb-4">
                                 <div>
                                     <span class="inline-block px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded mb-2">STEP 3</span>
                                     <h3 class="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">重要語句チェック</h3>
                                 </div>
                                 <span class="text-xs font-bold text-slate-400">5 min</span>
                             </div>
                             <p class="text-sm text-slate-500 mb-4">「毒薬」「劇薬」の違いなど、混同しやすい用語を整理します。</p>
                             <button class="w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-amber-500 hover:text-white transition-all">
                                 カードを確認
                             </button>
                         </div>
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

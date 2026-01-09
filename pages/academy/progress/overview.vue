<template>
  <div class="space-y-8">
    <AcademyPageHeader
      eyebrow="Analytics"
      title="詳細分析データ"
      subtitle="学習の進捗と傾向をグラフで確認。弱点を早期に発見しましょう。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition-all active:scale-95"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Weekly Activity -->
      <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 class="mb-6 flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest">
            <Icon icon="ph:chart-bar-fill" class="text-blue-500" />
            週間学習時間
        </h3>
        <div class="h-64 flex items-end justify-between gap-2 px-4">
            <div v-for="(day, index) in weeklyData" :key="index" class="w-full flex flex-col items-center gap-2 group">
                <div class="relative w-full bg-slate-50 rounded-t-lg overflow-hidden h-full flex items-end">
                    <div 
                        class="w-full bg-blue-500 rounded-t-lg transition-all duration-1000 group-hover:bg-blue-600"
                        :style="{ height: `${day.percent}%` }"
                    ></div>
                </div>
                <span class="text-xs font-bold text-slate-400">{{ day.label }}</span>
            </div>
        </div>
      </div>

      <!-- Domain Weakness -->
      <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 class="mb-6 flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest">
            <Icon icon="ph:warning-octagon-fill" class="text-rose-500" />
            分野別正答率（ワースト3）
        </h3>
        <div class="space-y-6">
            <div v-for="domain in weakDomains" :key="domain.name" class="space-y-2">
                <div class="flex justify-between text-sm font-bold">
                    <span class="text-slate-700">{{ domain.name }}</span>
                    <span class="text-rose-500">{{ domain.score }}%</span>
                </div>
                <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-rose-500 rounded-full" :style="{ width: `${domain.score}%` }"></div>
                </div>
                <p class="text-xs text-slate-400">{{ domain.advice }}</p>
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

const weeklyData = [
    { label: '月', percent: 40 },
    { label: '火', percent: 65 },
    { label: '水', percent: 30 },
    { label: '木', percent: 85 },
    { label: '金', percent: 50 },
    { label: '土', percent: 90 },
    { label: '日', percent: 20 },
]

const weakDomains = [
    { name: '法規・制度', score: 42, advice: '医薬品医療機器等法の定義を再確認しましょう。' },
    { name: '人体の働き', score: 55, advice: '神経系の作用機序を中心に復習が必要です。' },
    { name: '実務', score: 62, advice: '副作用報告の手順があやふやです。' },
]
</script>

<template>
  <section class="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm md:p-5">
    <header class="mb-3">
      <h3 class="text-sm font-semibold text-slate-900">
        クイックリンク
      </h3>
      <p class="text-xs text-slate-500">
        よく使うページへすぐ移動できます。
      </p>
    </header>

    <ul class="space-y-2 text-sm text-emerald-700">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-emerald-50"
        >
          <span class="font-medium">{{ link.label }}</span>
          <span class="text-xs text-emerald-600">→</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const links = [
  { to: '/academy/course/tohan', label: '教材一覧' },
  { to: '/academy/practice', label: '演習トップ' },
  { to: '/academy/flashcards/today', label: '今日の暗記カード' },
  { to: '/licenses/tohan/exam/schedule', label: '試験日程' },
]
</script>

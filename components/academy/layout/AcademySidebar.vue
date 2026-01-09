<!-- components/academy/layout/AcademySidebar.vue -->
<template>
  <aside
    class="flex h-full flex-col bg-white/95 px-4 py-5 ring-1 ring-slate-200/70 backdrop-blur"
  >
    <!-- ヘッダ -->
    <div class="mb-6 flex items-center justify-between gap-3">
      <NuxtLink to="/academy" class="flex items-center">
        <img
          src="/images/academy_logo.webp"
          alt="LicenceHub Academy"
          class="h-12 w-auto object-contain"
        />
      </NuxtLink>

      <button
        v-if="mobile"
        type="button"
        class="inline-flex items-center justify-center rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500 md:hidden"
        @click="$emit('close')"
      >
        閉じる
      </button>
    </div>

    <!-- ナビゲーション -->
    <nav class="flex-1 space-y-1 text-sm">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
        :class="
          isActive(item.to)
            ? 'bg-emerald-50 text-emerald-900 font-bold'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        "
      >
        <Icon :icon="item.icon" class="w-5 h-5 transition-colors" :class="isActive(item.to) ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <!-- フッタ（試験情報のサマリなどを後で入れても良い） -->
    <div class="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
      <p>登録販売者試験まで：<span class="font-semibold">◯◯日</span></p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  mobile?: boolean;
}>();

defineEmits<{
  (e: "close"): void;
}>();

const route = useRoute();

const navItems = [
  { label: "ダッシュボード", to: "/academy", icon: "ph:house-fill" },
  { label: "コース", to: "/academy/course/tohan", icon: "ph:flag-banner-fill" }, // Course Map
  { label: "今日のレッスン", to: "/academy/learn/today", icon: "ph:calendar-check-fill" }, // Updated
  { label: "演習", to: "/academy/learn/review", icon: "ph:pencil-circle-fill" }, // Updated
  { label: "暗記カード", to: "/academy/learn/review/flashcards", icon: "ph:brain-fill" }, // Updated
  { label: "資料ライブラリ", to: "/academy/learn/topics", icon: "ph:books-fill" }, // Updated
  { label: "学習データ", to: "/academy/progress/overview", icon: "ph:chart-line-up-fill" }, // Updated
  { label: "アカウント", to: "/academy/settings", icon: "ph:user-circle-fill" }, // Updated
];

const isActive = (path: string) =>
  computed(() => route.path === path || route.path.startsWith(path + "/")).value;
</script>

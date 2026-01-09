<template>
  <div class="fixed bottom-10 left-4 right-4 z-50 md:hidden">
    <nav
      class="flex items-center justify-around rounded-2xl bg-white/95 px-2 py-3 shadow-xl shadow-slate-200/50 backdrop-blur-md ring-1 ring-slate-100"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="group flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 transition-all"
        :class="
          isActive(item.to)
            ? 'text-emerald-600'
            : 'text-slate-400 hover:text-slate-600'
        "
      >
        <Icon
          :icon="item.icon"
          class="text-2xl transition-transform duration-200 group-active:scale-90"
          :class="isActive(item.to) ? 'scale-110' : ''"
        />
        <span class="text-[9px] font-bold">{{ item.label }}</span>

        <!-- Active indicator dot -->
        <span
          v-if="isActive(item.to)"
          class="absolute bottom-1 h-1 w-1 rounded-full bg-emerald-500"
        ></span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const navItems = [
  { label: "ホーム", to: "/academy", icon: "ph:house-fill" },
  { label: "コース", to: "/academy/course/tohan", icon: "ph:flag-banner-fill" },
  { label: "レッスン", to: "/academy/course/tohan/today", icon: "ph:calendar-check-fill" },
  { label: "演習", to: "/academy/practice", icon: "ph:pencil-circle-fill" },
  { label: "暗記", to: "/academy/flashcards", icon: "ph:brain-fill" },
];

const isActive = (path: string) => {
  // Exact match for home, startsWith for others
  if (path === "/academy") return route.path === "/academy";
  return route.path.startsWith(path);
};
</script>

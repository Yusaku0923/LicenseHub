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
        <span
          class="text-xl transition-transform duration-200 group-active:scale-90"
          :class="isActive(item.to) ? 'scale-110' : ''"
        >
          {{ item.icon }}
        </span>
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
  { label: "ホーム", to: "/academy", icon: "🏠" },
  { label: "コース", to: "/academy/course/tohan", icon: "📚" },
  { label: "レッスン", to: "/academy/course/tohan/today", icon: "🗓️" },
  { label: "演習", to: "/academy/practice", icon: "✏️" },
  { label: "暗記", to: "/academy/flashcards/today", icon: "🧠" }, // Changed label from '暗記カード' to '暗記' to fit mobile
];

const isActive = (path: string) => {
  // Exact match for home, startsWith for others
  if (path === "/academy") return route.path === "/academy";
  return route.path.startsWith(path);
};
</script>

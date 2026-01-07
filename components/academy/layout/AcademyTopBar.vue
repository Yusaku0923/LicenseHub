<!-- components/academy/layout/AcademyTopBar.vue -->
<template>
  <header
    class="relative z-50 flex items-center justify-between border-b border-slate-200/50 bg-white/40 px-4 py-3 backdrop-blur-md md:px-8 lg:px-12"
  >
    <!-- MOBILE VIEW: Single Line -->
    <div class="flex w-full items-center justify-between md:hidden">
      <!-- Logo -->
      <img
        src="/images/academy_logo.webp"
        alt="LicenceHub Academy"
        class="h-5 w-auto object-contain"
      />
      <!-- Compact Info -->
      <div class="flex items-center text-[10px] font-bold text-slate-600">
        <span class="text-emerald-700">Nakayama</span>
        <span class="mx-1.5 text-slate-300">|</span>
        <span>10/24試験</span>
        <span class="mx-1.5 text-slate-300">|</span>
        <span>残{{ incompleteTasksCount }}</span>
      </div>
    </div>

    <!-- DESKTOP VIEW: Structured -->
    <div class="hidden w-full items-center justify-between md:flex">
      <!-- Left Group: Greeting & Status -->
      <div class="flex items-end gap-8">
        <!-- Date & Greeting -->
        <div class="text-left">
          <p
            class="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500"
          >
            {{
              new Date().toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "short",
              })
            }}
          </p>
          <h2 class="text-2xl font-black text-slate-900">
            こんにちは、<span class="text-emerald-600">Nakayama</span>さん
          </h2>
        </div>

        <!-- Status Box (Next Exam & Tasks) -->
        <div
          class="flex items-center justify-center gap-6 rounded-xl border border-slate-100/50 bg-white/50 px-4 py-2"
        >
          <div class="text-right">
            <p class="mb-0 text-[10px] font-bold text-slate-400">次回試験日</p>
            <p class="mb-0 text-sm font-black text-slate-900">2026/10/24</p>
          </div>
          <div class="h-6 w-px bg-slate-200"></div>
          <div class="text-right">
            <p class="mb-0 text-[10px] font-bold text-slate-400">残りのタスク</p>
            <p class="mb-0 text-sm font-black text-emerald-600">
              {{ incompleteTasksCount }}件
            </p>
          </div>
        </div>
      </div>

      <!-- Right Group: User Menu -->
      <div class="flex items-center gap-4">
        <div class="h-6 w-px bg-slate-200"></div>

        <div class="relative">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50"
            @click.stop="menuOpen = !menuOpen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="h-5 w-5 text-slate-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <Transition name="fade">
            <div
              v-if="menuOpen"
              class="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            >
              <div class="bg-slate-50 px-4 py-3 border-b border-slate-100">
                <p
                  class="text-[10px] font-black uppercase tracking-widest text-slate-400"
                >
                  Signed in as
                </p>
                <p class="mt-0.5 text-sm font-bold text-slate-900">
                  User Account
                </p>
              </div>
              <nav class="p-2">
                <NuxtLink
                  v-for="item in quickLinks"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-emerald-700"
                  @click="menuOpen = false"
                >
                  <span class="text-lg">{{ item.icon }}</span>
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </nav>
              <div class="border-t border-slate-100 p-2">
                <button
                  class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <span>🚪</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Avatar -->
        <div
          class="h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5 shadow-lg shadow-emerald-200/50"
        >
          <div
            class="flex h-full w-full items-center justify-center rounded-[10px] bg-white text-xs font-black text-emerald-700"
          >
            U
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useAcademyMock } from "~/composables/useAcademyMock";

defineEmits<{
  (e: "toggleSidebar"): void;
}>();

const { incompleteTasksCount } = useAcademyMock();

const menuOpen = ref(false);
const quickLinks = [
  { label: "My Page", to: "/academy/user", icon: "👤" },
  { label: "Profile Settings", to: "/academy/user/settings", icon: "🛠️" },
  { label: "Target & Goals", to: "/academy/user/exam", icon: "📅" },
  { label: "Subscriptions", to: "/academy/user/subscription", icon: "💳" },
];

const closeMenu = () => {
  menuOpen.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  if (!target.closest("header")) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>

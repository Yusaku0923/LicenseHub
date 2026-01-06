<!-- components/academy/layout/AcademyTopBar.vue -->
<template>
  <header
    class="flex items-center justify-between bg-white/40 px-8 py-4 backdrop-blur-md md:px-16 lg:px-24 border-b border-slate-200/50"
  >
    <div class="flex items-center gap-4">
      <!-- モバイルメニュー -->
      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm md:hidden"
        @click="$emit('toggleSidebar')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5 text-slate-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <div class="hidden flex-col md:flex">
        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
          Academy Portal
        </span>
        <span class="text-xs font-bold text-slate-400">
          LicenceHub / Next-Gen Learning
        </span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <!-- Search or Quick Action would go here -->
      <div class="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 md:flex">
        <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        System Online
      </div>

      <div class="h-6 w-px bg-slate-200 hidden md:block"></div>

      <button
        type="button"
        class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50"
        @click.stop="menuOpen = !menuOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5 text-slate-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        
        <!-- Dropdown Menu -->
        <Transition name="fade">
          <div
            v-if="menuOpen"
            class="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div class="bg-slate-50 px-4 py-3 border-b border-slate-100">
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Signed in as</p>
              <p class="mt-0.5 text-sm font-bold text-slate-900">User Account</p>
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
              <button class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50">
                <span>🚪</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </Transition>
      </button>

      <!-- Avatar placeholder for better visuals -->
      <div class="h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5 shadow-lg shadow-emerald-200/50">
        <div class="flex h-full w-full items-center justify-center rounded-[10px] bg-white text-xs font-black text-emerald-700">
          U
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineEmits<{
  (e: 'toggleSidebar'): void
}>()

const menuOpen = ref(false)
const quickLinks = [
  { label: 'My Page', to: '/academy/user', icon: '👤' },
  { label: 'Profile Settings', to: '/academy/user/settings', icon: '🛠️' },
  { label: 'Target & Goals', to: '/academy/user/exam', icon: '📅' },
  { label: 'Subscriptions', to: '/academy/user/subscription', icon: '💳' },
]

const closeMenu = () => {
  menuOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null
  if (!target) return
  if (!target.closest('header')) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

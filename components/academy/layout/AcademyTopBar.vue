<!-- components/academy/layout/AcademyTopBar.vue -->
<template>
  <header
    class="flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur md:px-6"
  >
    <div class="flex items-center gap-3">
      <!-- モバイルメニュー -->
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md border border-slate-200 p-1.5 text-slate-600 md:hidden"
        @click="$emit('toggleSidebar')"
      >
        <span class="sr-only">メニューを開く</span>
        <!-- 簡易ハンバーガー -->
        <span class="block h-0.5 w-5 bg-slate-700"></span>
        <span class="mt-1 block h-0.5 w-5 bg-slate-700"></span>
        <span class="mt-1 block h-0.5 w-5 bg-slate-700"></span>
      </button>

      <div class="flex flex-col">
        <span class="text-xs font-medium uppercase tracking-wide text-emerald-600">
          Study Dashboard
        </span>
        <span class="text-sm font-semibold text-slate-900">
          LicenceHub Academy
        </span>
      </div>
    </div>

    <div class="relative flex items-center gap-3">
      <!-- 試験カウントダウンなど（後で API と接続） -->
      <div class="hidden text-xs text-slate-600 sm:block">
        次回試験まで <span class="font-semibold text-emerald-700">◯◯日</span>
      </div>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 text-slate-600"
        @click.stop="menuOpen = !menuOpen"
      >
        <span class="sr-only">メニューを開く</span>
        <span class="block h-0.5 w-5 bg-slate-700"></span>
        <span class="mt-1 block h-0.5 w-5 bg-slate-700"></span>
        <span class="mt-1 block h-0.5 w-5 bg-slate-700"></span>
      </button>

      <!-- アバター（仮） -->
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white"
      >
        U
      </div>

      <!-- 右上ドロワー -->
      <Transition name="fade">
        <div
          v-if="menuOpen"
          class="absolute right-0 top-12 z-30 w-56 rounded-xl border border-slate-200 bg-white shadow-lg"
        >
          <div class="border-b border-slate-100 px-3 py-2 text-xs text-slate-500">
            クイックアクセス
          </div>
          <nav class="py-2 text-sm">
            <NuxtLink
              v-for="item in quickLinks"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50"
              @click="menuOpen = false"
            >
              <span>{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </NuxtLink>
          </nav>
        </div>
      </Transition>
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
  { label: 'マイページ', to: '/academy/user', icon: '👤' },
  { label: 'プロフィール設定', to: '/academy/user/settings', icon: '🛠️' },
  { label: '試験・目標', to: '/academy/user/exam', icon: '📅' },
  { label: 'サブスクリプション', to: '/academy/user/subscription', icon: '💳' },
  { label: '演習トップ', to: '/academy/practice', icon: '✏️' },
  { label: '暗記カード', to: '/academy/flashcards/today', icon: '🧠' },
]

const closeMenu = () => {
  menuOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null
  if (!target) return
  // if click outside any header child, close menu
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

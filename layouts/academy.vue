<!-- layouts/academy.vue -->
<template>
    <div class="min-h-screen bg-gradient-to-b from-emerald-50 to-slate-50">
      <div class="flex h-screen overflow-hidden text-slate-900">
        <!-- 左サイドバー -->
        <AcademySidebar class="hidden md:block" />
  
        <!-- 右側メイン -->
        <div class="flex flex-1 flex-col">
          <!-- 上部バー -->
          <AcademyTopBar @toggleSidebar="sidebarOpen = !sidebarOpen" />
  
          <!-- コンテンツ（ここだけ縦スクロール） -->
          <main class="flex-1 overflow-y-auto">
            <div class="mx-auto w-full max-w-5xl px-4 py-6 md:px-6 md:py-8">
              <slot />
            </div>
          </main>
        </div>
      </div>
  
      <!-- モバイルサイドバーはそのまま -->
      <Transition name="fade">
        <div
          v-if="sidebarOpen"
          class="fixed inset-0 z-40 flex md:hidden"
          @click.self="sidebarOpen = false"
        >
          <AcademySidebar
            class="h-full w-72 shadow-xl"
            mobile
            @close="sidebarOpen = false"
          />
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import AcademySidebar from '~/components/academy/layout/AcademySidebar.vue'
  import AcademyTopBar from '~/components/academy/layout/AcademyTopBar.vue'
  
  const sidebarOpen = ref(false)
useHead({
  // noindex, nofollow
  meta: [
    {
      name: 'robots',
      content: 'noindex,nofollow',
    },
  ],
})
</script>
 

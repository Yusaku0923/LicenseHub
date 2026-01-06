<!-- layouts/academy.vue -->
<template>
    <div class="min-h-screen bg-gradient-to-b from-emerald-50 to-slate-50">
      <div class="flex h-screen overflow-hidden text-slate-900">
        <!-- 左サイドバー -->
        <AcademySidebar class="hidden w-72 shrink-0 border-r border-slate-200 md:block" />
  
        <!-- 右側メイン -->
        <div class="flex flex-1 flex-col overflow-hidden">
          <!-- 上部バー -->
          <AcademyTopBar @toggleSidebar="sidebarOpen = !sidebarOpen" />
  
          <!-- コンテンツ（ここだけ縦スクロール） -->
          <main class="flex-1 overflow-y-auto bg-slate-50/80">
            <div class="mx-auto max-w-7xl px-8 py-10 md:px-16 lg:px-24">
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

  // このレイアウト下のすべてのページをnoindex, nofollowに設定
  useSeoMeta({
    robots: 'noindex,nofollow',
  })
</script>
 

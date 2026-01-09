<!-- layouts/academy.vue -->
<template>
  <div class="min-h-screen">
    <div class="flex h-screen overflow-hidden text-slate-900">
      <!-- 左サイドバー -->
      <AcademySidebar
        class="hidden w-72 shrink-0 border-r border-slate-200 md:block"
      />

      <!-- 右側メイン -->
      <div class="flex flex-1 flex-col overflow-hidden">
        <!-- 上部バー -->
        <AcademyTopBar @toggleSidebar="sidebarOpen = !sidebarOpen" />

        <!-- コンテンツ（ここだけ縦スクロール） -->
        <main class="flex-1 overflow-y-auto flex flex-col">
          <div class="mx-auto max-w-[1200px] w-full flex-1 px-4 py-4 md:py-10">
            <slot />
          </div>
          <AcademyFooter />
        </main>
      </div>
    </div>

    <!-- モバイル用ボトムナビゲーション -->
    <AcademyBottomNav />

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
import { ref } from "vue";
import AcademySidebar from "~/components/academy/layout/AcademySidebar.vue";
import AcademyTopBar from "~/components/academy/layout/AcademyTopBar.vue";
import AcademyBottomNav from "~/components/academy/layout/AcademyBottomNav.vue";
import AcademyFooter from "~/components/academy/layout/AcademyFooter.vue";

const sidebarOpen = ref(false);

// このレイアウト下のすべてのページをnoindex, nofollowに設定
useSeoMeta({
  robots: "noindex,nofollow",
});
</script>

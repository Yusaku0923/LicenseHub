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
  
      <div class="flex items-center gap-3">
        <!-- 試験カウントダウンなど（後で API と接続） -->
        <div class="hidden text-xs text-slate-600 sm:block">
          次回試験まで <span class="font-semibold text-emerald-700">◯◯日</span>
        </div>
  
        <!-- アバター（仮） -->
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white"
        >
          U
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  defineEmits<{
    (e: 'toggleSidebar'): void
  }>()
  </script>
  
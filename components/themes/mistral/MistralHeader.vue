<template>
    <header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- left: logo / title -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <NuxtImg
            v-if="config.logo"
            :src="config.logo"
            class="h-10 w-10 rounded-full border border-slate-100 group-hover:opacity-80 transition"
            alt="logo"
          />
          <span class="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition">
            {{ blogName }}
          </span>
        </NuxtLink>
  
        <!-- right: nav (desktop) -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <NuxtLink
            v-for="item in menu"
            :key="item.path"
            :to="item.path"
            class="hover:text-emerald-700 transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
          <NuxtLink to="/about" class="hover:text-emerald-700">
            運営者情報
          </NuxtLink>
        </nav>
  
        <!-- mobile button -->
        <button
          class="md:hidden p-2 text-slate-700 hover:text-emerald-700 transition"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!mobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
  
      <!-- mobile menu -->
      <transition name="fade">
        <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-slate-100">
          <div class="px-4 py-4 flex flex-col space-y-3">
            <NuxtLink
              v-for="item in menu"
              :key="item.path"
              :to="item.path"
              class="text-slate-700 hover:text-emerald-700 text-sm font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              {{ item.name }}
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-slate-700 hover:text-emerald-700 text-sm font-medium"
              @click="mobileMenuOpen = false"
            >
              運営者情報
            </NuxtLink>
          </div>
        </div>
      </transition>
    </header>
  </template>
  
  <script setup lang="ts">
  const config = useAppConfig()
  const menu =
    config.menu ||
    [
      { name: '受験対策', path: '/exam' },
      { name: '教材比較', path: '/materials' },
      { name: '仕事・転職', path: '/work' },
      { name: '記事一覧', path: '/articles' }
    ]
  const blogName = config.name || '登録販売者ナビ'
  const mobileMenuOpen = ref(false)
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  
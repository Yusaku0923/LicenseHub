<template>
    <header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 md:pl-0 md:pr-6 lg:pr-8 h-16 flex items-center justify-between">
        <!-- left: logo / title -->
        <NuxtLink to="/" class="flex items-center gap-3 group" :aria-label="logoAlt">
          <img
            :src="logoSrc"
            :alt="logoAlt"
            class="h-12 w-auto group-hover:opacity-80 transition"
            width="160"
            height="48"
            sizes="(max-width: 768px) 120px, 160px"
            loading="eager"
            decoding="async"
          />
        </NuxtLink>
  
        <!-- right: nav (desktop) -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <NuxtLink
            v-for="item in menu"
            :key="item.path"
            :to="item.path"
            class="hover:text-indigo-700 transition-colors"
          >
            {{ item.name }}
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
          </div>
        </div>
      </transition>
    </header>
  </template>
  
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '#imports'

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
    },
  ],
})

const config = useAppConfig()
const fallbackLogo = '/images/logo.svg'
const blogName = computed(() => config.name || '登録販売者ナビ')
const logoSrc = computed(() => config.logo || fallbackLogo)
const logoAlt = computed(() => config.logoAlt || blogName.value)

const menu =
    [
      { name: '受験対策', path: '/licenses/tohan/exam' },
      { name: '教材比較', path: '/licenses/tohan/materials' },
      { name: '仕事・転職', path: '/licenses/tohan/work' },
      { name: '記事一覧', path: '/licenses/tohan/articles' }
    ]
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

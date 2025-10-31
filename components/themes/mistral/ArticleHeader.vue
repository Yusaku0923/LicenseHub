<template>
    <div class="text-center mb-8">
      <!-- タイトル -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight mb-4">
        {{ article.title }}
      </h1>
  
      <!-- メタ情報 -->
      <div class="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500">
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ formatDate(article.date) }}
        </div>
  
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ article.readingTime.text }}
        </div>
  
        <div v-if="author" class="flex items-center gap-2">
          <NuxtImg
            :src="author.avatar"
            loading="lazy"
            :alt="`Avatar of ${author.name}`"
            class="w-6 h-6 rounded-full border border-slate-100"
          />
          <span class="font-medium">{{ author.name }}</span>
        </div>
      </div>
  
      <!-- A8導線エリア（後で挿入用） -->
      <div class="mt-6">
        <!-- この領域に A8 バナーや CTA ボタンを動的に差し込み可能 -->
        <!-- 例：
        <AffiliateBanner
          program="三幸医療カレッジ"
          description="最短合格を目指すなら通信講座"
          link="https://px.a8.net/svt/ejp?a8mat=..."
        />
        -->
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    article: any
  }>()
  
  const author = findAuthor(props.article.author)
  </script>
  
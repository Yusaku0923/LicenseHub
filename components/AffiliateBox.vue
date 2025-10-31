<template>
  <div class="my-10">
    <!-- 見出し（任意） -->
    <h3 v-if="title" class="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-1">
      {{ title }}
    </h3>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="border border-emerald-100 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200"
      >
        <div class="flex flex-col items-center text-center">
          <!-- 画像 -->
          <NuxtImg
            v-if="item.img"
            :src="item.img"
            :alt="item.program"
            class="w-20 h-20 rounded-md object-cover mb-3 border border-emerald-100"
          />

          <!-- 案件名 -->
          <h4 class="text-slate-900 font-semibold text-sm mb-1">
            {{ item.program }}
          </h4>

          <!-- 説明文 -->
          <p class="text-slate-600 text-xs leading-snug mb-3">
            {{ item.description }}
          </p>

          <!-- CTAボタン -->
          <a
            :href="item.link"
            rel="sponsored nofollow noopener"
            target="_blank"
            class="inline-block px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition"
          >
            詳細を見る
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** セクションタイトル */
  title?: string
  /** 案件リスト */
  items: {
    program: string
    description: string
    link: string
    img?: string
  }[]
}>()
</script>

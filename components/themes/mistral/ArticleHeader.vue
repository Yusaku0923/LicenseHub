<template>
  <div class="mb-8">
    <div class="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
      <!-- 日付ブロック -->
      <div
        v-if="article.date"
        class="flex items-center gap-2 text-xs text-slate-500 md:flex-col md:items-center md:justify-center md:pr-6 md:border-r md:border-slate-200 md:select-none"
      >
        <!-- スマホ：日付ピル -->
        <span class="inline-flex md:hidden items-center rounded-full bg-slate-100 px-2 py-0.5 font-medium">
          {{ jpDate }}
        </span>

        <!-- PC：年 + 月日を縦並び -->
        <div class="hidden md:block text-[11px] md:text-xs text-center">
          {{ year }}
        </div>
        <div class="hidden md:block text-slate-800 font-bold text-2xl md:text-3xl leading-none text-center">
          {{ month }}/{{ day }}
        </div>
      </div>

      <!-- タイトル + メタ -->
      <div class="flex-1 min-w-0">
        <h1
          class="text-[color:var(--heading)] font-extrabold leading-tight mb-2 text-2xl sm:text-3xl md:text-4xl"
        >
          {{ article.title }}
        </h1>
        
        <!-- カテゴリ / タグ -->
        <div class="flex flex-wrap items-center gap-2 md:gap-3 text-xs mt-1">
          <span
            v-for="cat in categories"
            :key="`cat-${cat}`"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-white"
          >
            {{ cat }}
          </span>

          <NuxtLink
            v-for="tag in (article.tags || [])"
            :key="`tag-${tag}`"
            :to="`/tags/${tag}`"
            class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  article: any
}>()

const date = computed(() => new Date(props.article?.date || Date.now()))
const year = computed(() => date.value.getFullYear())
const month = computed(() => String(date.value.getMonth() + 1))
const day = computed(() => String(date.value.getDate()))
const jpDate = computed(() => `${year.value}年${month.value}月${day.value}日`)

const categories = computed<string[]>(() => {
  const a = props.article || {}
  if (Array.isArray(a.categories)) return a.categories
  if (typeof a.category === 'string') return [a.category]
  return []
})
</script>

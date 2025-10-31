<template>
  <div class="mb-8">
    <div class="flex items-start gap-4 md:gap-6">
      <!-- 左: 日付ブロック -->
      <div v-if="article.date" class="pr-4 md:pr-6 border-r border-slate-200 select-none">
        <div class="text-slate-500 text-[11px] md:text-xs text-center">
          {{ year }}
        </div>
        <div class="text-slate-800 font-bold text-2xl md:text-3xl leading-none text-center">
          {{ month }}/{{ day }}
        </div>
      </div>

      <!-- 右: タイトル + メタ -->
      <div class="flex-1 min-w-0">
        <h1 class="text-[color:var(--heading)] font-extrabold leading-tight mb-2 text-2xl sm:text-3xl md:text-4xl">
          {{ article.title }}
        </h1>

        <!-- バッジ + 公開日 -->
        <div class="flex flex-wrap items-center gap-2 md:gap-3 text-xs">
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

          <!-- <span class="inline-flex items-center gap-1 text-slate-500 ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ jpDate }}
          </span> -->
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
  
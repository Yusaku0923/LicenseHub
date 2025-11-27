<template>
  <div class="mb-8">
    <div class="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
      <!-- 日付ブロック -->
      <div
        v-if="updateDate"
        class="flex items-center gap-2 text-xs text-slate-500 md:flex-col md:items-center md:justify-center md:pr-6 md:border-r md:border-slate-200 md:select-none"
      >
        <!-- スマホ：日付ピル -->
        <div class="inline-flex md:hidden flex-col gap-1">
          <span class="items-center rounded-full bg-slate-100 px-2 py-0.5 font-medium">
            {{ jpUpdateDate }}
          </span>
          <span v-if="hasCreated" class="text-[10px] text-slate-400 text-center">
            作成: {{ jpCreatedDate }}
          </span>
        </div>

        <!-- PC：年 + 月日を縦並び -->
        <div class="hidden md:block text-[11px] md:text-xs text-center">
          {{ updateYear }}
        </div>
        <div class="hidden md:block text-slate-800 font-bold text-2xl md:text-3xl leading-none text-center">
          {{ updateMonth }}/{{ updateDay }}
        </div>
        <div v-if="hasCreated" class="hidden md:block text-[10px] text-slate-400 mt-1 text-center">
          作成: {{ jpCreatedDate }}
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
          <!-- <span
            v-for="cat in categories"
            :key="`cat-${cat}`"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-white"
          >
            {{ cat }}
          </span> -->

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

// 更新日：dateを使用（大きく表示）
const updateDate = computed(() => {
  const dateValue = props.article?.date
  return dateValue ? new Date(dateValue) : null
})
const updateYear = computed(() => updateDate.value?.getFullYear())
const updateMonth = computed(() => updateDate.value ? String(updateDate.value.getMonth() + 1) : '')
const updateDay = computed(() => updateDate.value ? String(updateDate.value.getDate()) : '')
const jpUpdateDate = computed(() => {
  if (!updateDate.value) return ''
  return `${updateYear.value}年${updateMonth.value}月${updateDay.value}日`
})

// 作成日：createdを使用（小さく下に表示）
const createdDate = computed(() => {
  const created = props.article?.created
  return created ? new Date(created) : null
})
const hasCreated = computed(() => !!createdDate.value)
const createdYear = computed(() => createdDate.value?.getFullYear())
const createdMonth = computed(() => createdDate.value ? String(createdDate.value.getMonth() + 1) : '')
const createdDay = computed(() => createdDate.value ? String(createdDate.value.getDate()) : '')
const jpCreatedDate = computed(() => {
  if (!createdDate.value) return ''
  return `${createdYear.value}年${createdMonth.value}月${createdDay.value}日`
})

const categories = computed<string[]>(() => {
  const a = props.article || {}
  if (Array.isArray(a.categories)) return a.categories
  if (typeof a.category === 'string') return [a.category]
  return []
})
</script>

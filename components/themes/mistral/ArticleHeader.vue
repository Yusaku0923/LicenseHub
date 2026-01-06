<template>
  <div class="mb-10">
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
      <!-- 日付ブロック -->
      <div
        v-if="updateDate"
        class="flex items-center gap-3 text-xs text-slate-500 md:flex-col md:items-center md:justify-center md:pr-8 md:border-r md:border-slate-200 md:select-none"
      >
        <!-- スマホ：日付 -->
        <div class="inline-flex md:hidden flex-col gap-1">
          <span class="items-center font-bold text-slate-700">
            {{ jpUpdateDate }}
          </span>
          <span v-if="hasCreated" class="text-[10px] text-slate-400">
            作成: {{ jpCreatedDate }}
          </span>
        </div>

        <!-- PC：年 + 月日を縦並び -->
        <div class="hidden md:block text-[11px] md:text-sm font-bold text-slate-400 tracking-wider">
          {{ updateYear }}
        </div>
        <div class="hidden md:block text-brand font-black text-3xl md:text-4xl leading-none text-center py-1">
          {{ updateMonth }}/{{ updateDay }}
        </div>
        <div v-if="hasCreated" class="hidden md:block text-[10px] text-slate-400 mt-1 font-medium text-center">
          作成日:<br />{{ jpCreatedDate }}
        </div>
      </div>

      <!-- タイトル + メタ -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-3">
          <span class="inline-flex items-center px-2 py-0.5 rounded bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-wider">
            Article
          </span>
          <div class="flex-1 h-[1px] bg-slate-100"></div>
        </div>
        
        <h1
          class="text-[color:var(--heading)] font-black leading-[1.3] mb-4 text-2xl sm:text-3xl md:text-4xl tracking-tight"
        >
          {{ article.title }}
        </h1>
        
        <!-- カテゴリ / タグ -->
        <div class="flex flex-wrap items-center gap-2 md:gap-3 text-xs mt-2">
          <NuxtLink
            v-for="tag in (article.tags || [])"
            :key="`tag-${tag}`"
            :to="`/tags/${tag}`"
            class="license-pill text-[10px] px-3 py-1 hover:bg-brand hover:text-white transition-all shadow-sm border border-brand/5"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  article: any
}>()

// 更新日：dateを使用（大きく表示）
const updateDate = computed(() => {
  const dateValue = props.article?.date
  return dateValue ? new Date(dateValue) : null
})
const updateYear = computed(() => updateDate.value?.getFullYear())
const updateMonth = computed(() => updateDate.value ? String(updateDate.value.getMonth() + 1).padStart(2, '0') : '')
const updateDay = computed(() => updateDate.value ? String(updateDate.value.getDate()).padStart(2, '0') : '')
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
const createdMonth = computed(() => createdDate.value ? String(createdDate.value.getMonth() + 1).padStart(2, '0') : '')
const createdDay = computed(() => createdDate.value ? String(createdDate.value.getDate()).padStart(2, '0') : '')
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

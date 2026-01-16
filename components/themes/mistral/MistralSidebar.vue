<template>
  <div class="space-y-8 lg:sticky lg:top-28 lg:self-start">
    <!-- おすすめ記事セクション -->
    <div class="card--premium p-6">
      <h3 class="text-base font-bold mb-4 flex items-center gap-2">
        <Icon icon="mdi:star-outline" class="text-brand text-xl" />
        おすすめの記事
      </h3>
      <div class="space-y-4">
        <NuxtLink
          v-for="post in recommendedPosts"
          :key="post._path"
          :to="post._path"
          class="group flex gap-3 items-start"
        >
          <div class="w-16 h-12 flex-shrink-0 rounded-md overflow-hidden bg-slate-100 border border-[rgba(15,23,42,0.05)]">
            <img
              :src="post.cover ? '/images/' + post.cover : '/images/cover.webp'"
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <p class="text-[13px] font-bold text-[color:var(--heading)] line-clamp-2 group-hover:text-brand transition-colors leading-snug">
            {{ post.title }}
          </p>
        </NuxtLink>
      </div>
    </div>

    <!-- A8バナー置き場 -->
    <div class="aff-box p-6 border border-[rgba(34,156,142,0.15)] bg-[rgba(34,156,142,0.02)] rounded-2xl">
      <p class="text-brand font-bold text-sm mb-1 uppercase tracking-wider">Promotion</p>
      <p class="text-[color:var(--heading)] font-bold text-base mb-3 leading-snug">
        効率的に合格を目指すなら<br />通信講座がおすすめ
      </p>
      <div class="space-y-3">
        <AffiliateBanner type="studying" />
        <AffiliateBanner type="onsuku" />
        <AffiliateBanner type="sanko" />
      </div>
    </div>

    <!-- タグセクション -->
    <div v-if="displayTags.length > 0" class="card--premium p-6">
      <h3 class="text-sm font-bold mb-4 flex items-center gap-2">
        <Icon icon="mdi:tag-outline" class="text-brand" />
        注目のキーワード
      </h3>
      <div class="flex flex-wrap gap-2">
        <NuxtLink 
          v-for="tag in displayTags" 
          :key="tag" 
          :to="`/tags/${tag}`" 
          class="license-pill text-[10px] py-1 px-3 hover:bg-brand hover:text-white transition-all cursor-pointer"
        >
          {{ tag }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LICENSE_HUB_PHASE1_TAGS } from '~/data/tags'

interface Props {
  tags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  tags: () => [],
})

// 固定表示する記事のパス
const pinnedPaths = [
  '/licenses/tohan/exam/overview',
  '/licenses/tohan/exam/how-to-study',
  '/licenses/tohan/materials/compare',
  '/licenses/tohan/work/salary',
  '/licenses/tohan/exam/pass-rate'
]

// 固定記事を取得
const { data: recommendedPostsData } = await useAsyncData('recommended-posts', () => {
  return queryContent()
    .only(['title', '_path', 'cover', 'date'])
    .where({ _path: { $in: pinnedPaths } })
    .find()
})

// 指定した順序で並び替え
const recommendedPosts = computed(() => {
  if (!recommendedPostsData.value) return []
  return pinnedPaths
    .map(path => recommendedPostsData.value.find(p => p._path === path))
    .filter((p): p is NonNullable<typeof p> => !!p)
})

const displayTags = computed(() => {
  const merged = new Set<string>()

  LICENSE_HUB_PHASE1_TAGS.forEach((tag) => merged.add(tag))
  props.tags
    .filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0)
    .forEach((tag) => merged.add(tag))

  return Array.from(merged)
})
</script>

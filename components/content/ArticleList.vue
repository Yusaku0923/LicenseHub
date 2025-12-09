<template>
  <div class="article-list">
    <ContentList :query="query">
      <template #not-found>
        <p class="text-[color:var(--text-muted)] py-8">記事が見つかりませんでした。</p>
      </template>
      
      <template #default="{ list }">
        <div v-if="list && list.length > 0" class="space-y-4">
          <article
            v-for="article in list"
            :key="article._path"
            class="article-card"
          >
            <a 
              :href="article._path" 
              class="block p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-[color:var(--heading)] mb-2 hover:text-slate-600">
                    {{ article.title }}
                  </h3>
                  <p v-if="article.description" class="text-sm text-[color:var(--text-muted)] mb-2 line-clamp-2">
                    {{ article.description }}
                  </p>
                  <div class="flex items-center gap-3 text-xs text-[color:var(--text-muted)]">
                    <span v-if="article.date">
                      {{ formatDate(article.date) }}
                    </span>
                    <span v-if="article.tags && article.tags.length > 0" class="flex gap-2">
                      <span
                        v-for="tag in article.tags.slice(0, 3)"
                        :key="tag"
                        class="bg-slate-100 rounded-full px-2 py-0.5 text-xs"
                      >
                        {{ tag }}
                      </span>
                    </span>
                  </div>
                </div>
                <span class="text-slate-400 text-xl font-bold flex-shrink-0">→</span>
              </div>
            </a>
          </article>
        </div>
        <p v-else class="text-[color:var(--text-muted)] py-8">記事が見つかりませんでした。</p>
      </template>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  prefix?: string
  tag?: string
  category?: string
  limit?: number
}>()

const query = computed(() => {
  const prefix = props.prefix || '/licenses/tohan/articles'
  
  const where: any[] = [
    { draft: { $ne: true } },
    { listed: { $ne: false } },
    { _file: { $ne: 'index.md' } }, // index.mdファイルを除外
    { _path: { $ne: prefix } } // ディレクトリパス自体も除外（index.mdのパスはディレクトリと同じになる場合がある）
  ]
  
  if (props.tag) {
    where.push({ tags: { $in: [props.tag] } })
  }
  
  if (props.category) {
    where.push({ category: props.category })
  }
  
  return {
    path: prefix,
    where,
    sort: [{ date: -1 }],
    limit: props.limit || 20
  }
})

function formatDate(date: string | Date): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.article-card {
  transition: transform 0.2s;
}

.article-card:hover {
  transform: translateY(-2px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>


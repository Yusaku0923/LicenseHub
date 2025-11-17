<script setup lang="ts">
import MistralHeader from '~/components/themes/mistral/MistralHeader.vue'
import MistralFooter from '~/components/themes/mistral/MistralFooter.vue'
import MistralHomeLayout from '~/components/content/MistralHomeLayout.vue'
import MistralSidebar from '~/components/themes/mistral/MistralSidebar.vue'
import MistralBreadcrumbs from '~/components/themes/mistral/MistralBreadcrumbs.vue'

const props = defineProps<{ doc: any }>()

const formatDate = (date?: string) => {
  if (!date) return ''
  try {
    const d = new Date(date)
    return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
  } catch {
    return date ?? ''
  }
}

const resolveCoverSrc = (cover?: string) => {
  if (!cover) return ''
  if (cover.startsWith('http') || cover.startsWith('/')) return cover
  return `/images/${cover.replace(/^\/?images\//, '')}`
}

/** 直下のみ取得するクエリ（index.md 除外・公開判定） */
const listQuery = (doc: any) => {
  if (!doc?._path) return {}
  const escaped = doc._path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const directChild = new RegExp(`^${escaped}/[^/]+$`)
  return {
    where: {
      _path: { $regex: directChild },
      _file: { $ne: 'index.md' },
      $and: [
        { $or: [{ listed: { $exists: false } }, { listed: { $ne: false } }] },
        { $or: [{ draft: { $exists: false } }, { draft: { $ne: true } }] }
      ]
    },
    sort: [{ date: -1 }]
  }
}
</script>

<template>
  <MistralHeader />

  <MistralHomeLayout>
    <template #posts>
      <div class="px-4 mt-6 md:px-0">
        <MistralBreadcrumbs :doc="props.doc" />
      </div>

      <div v-if="props.doc" class="pt-6 pb-10 px-4 md:px-0">
        <!-- セクション用ミニHero -->
        <section class="hero-section relative overflow-hidden">
          <img
            src="/images/hub_mv.webp"
            alt="Section Hero Background"
            class="absolute inset-0 z-0 w-full h-full object-cover"
            loading="eager"
          />
          <div class="relative z-10">
            <h1 class="text-2xl md:text-3xl font-bold text-[color:var(--heading)] mb-2 hover:text-[color:var(--brand)] transition-colors">
              {{ props.doc.title }}
            </h1>
            <p v-if="props.doc.description" class="text-sm md:text-[15px] text-[color:var(--heading)]">
              {{ props.doc.description }}
            </p>

            <div v-if="props.doc.body" class="hub-content mt-3 text-sm text-[color:var(--heading)]">
              <ContentRenderer :value="props.doc" class="prose max-w-none" />
            </div>
          </div>
        </section>

        <!-- 子記事一覧（このディレクトリ直下のみ） -->
        <section>
          <h2 class="text-lg font-bold text-[color:var(--heading)] mb-4">
            関連記事一覧
          </h2>
          <ContentList :query="listQuery(props.doc)">
            <template #default="{ list }">
              <div v-if="list && list.length > 0" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <NuxtLink
                  v-for="item in list"
                  :key="item._path"
                  :to="item._path"
                  class="group bg-white rounded-xl border border-[rgba(15,23,42,0.02)] shadow-sm overflow-hidden flex flex-col transition"
                >
                  <div v-if="item.cover" class="h-36 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                    <img
                      :src="resolveCoverSrc(item.cover)"
                      :alt="item.title"
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div v-else class="h-36 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                    no image
                  </div>

                  <div class="p-4 flex flex-col gap-3 flex-1">
                    <div v-if="item.tags && item.tags.length" class="flex flex-wrap gap-1">
                      <p
                        v-for="(tag, index) in item.tags.slice(1, 4)"
                        :key="`${item._path}-tag-${index}`"
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(50,93,206,0.08)] text-[0.6rem] text-[color:var(--brand)] font-semibold"
                      >
                        {{ tag }}
                      </p>
                    </div>
                    <p
                      v-else-if="item.category"
                      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(50,93,206,0.08)] text-[0.6rem] text-[color:var(--brand)] font-semibold w-fit"
                    >
                      {{ item.category }}
                    </p>
                    <p class="font-semibold text-[color:var(--heading)] leading-snug line-clamp-2 group-hover:text-[color:var(--brand)] transition-colors">
                      {{ item.title }}
                    </p>
                    <p v-if="item.description" class="text-xs text-[color:var(--text-muted)] leading-snug line-clamp-3">
                      {{ item.description }}
                    </p>
                    <p v-if="item.date" class="text-xs text-[color:var(--text-muted)] mt-auto">
                      {{ formatDate(item.date) }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </template>

            <template #not-found>
              <div class="text-center text-[color:var(--text-muted)] py-8 text-sm">
                記事がまだありません
              </div>
            </template>
          </ContentList>
        </section>
      </div>
    </template>

    <template #sidebar>
      <MistralSidebar />
    </template>
  </MistralHomeLayout>

  <MistralFooter />
</template>

<style scoped lang="scss">
.hero-section {
  @apply rounded-2xl border border-[rgba(50,93,206,0.14)] bg-gradient-to-br from-[rgba(50,93,206,0.06)] via-white to-[rgba(133,196,255,0.08)] px-6 py-5 md:px-8 md:py-6 mb-6;
}

:deep(h2 a) {
  @apply no-underline;
}

:deep(h3 a) {
  @apply no-underline;
}

h1:hover {
  @apply text-[color:var(--heading)] transition-colors;
}

:deep(.hub-content li a:hover) {
  @apply text-[color:var(--surface)] transition-colors;
}

:deep(h2 a:hover) {
  @apply text-[color:var(--heading)] transition-colors;
}
:deep(h3 a:hover) {
  @apply text-[color:var(--heading)] transition-colors;
}


</style>

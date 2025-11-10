<template>
  <nav
    aria-label="Breadcrumb"
    class="text-sm text-[color:var(--text-muted)] overflow-hidden"
  >
    <ol
      class="flex items-center flex-nowrap gap-1 overflow-hidden text-ellipsis whitespace-nowrap"
    >
      <li class="breadcrumb-item flex-shrink-0">
        <NuxtLink to="/" class="hover:underline">ホーム</NuxtLink>
      </li>

      <li
        v-for="(item, idx) in trail"
        :key="item.to"
        class="breadcrumb-item flex-shrink min-w-0"
      >
        <span class="mx-1 text-slate-300">/</span>

        <NuxtLink
          v-if="idx < trail.length - 1"
          :to="item.to"
          class="hover:underline text-ellipsis overflow-hidden inline-block align-middle max-w-[120px] md:max-w-none"
        >
          {{ item.label }}
        </NuxtLink>

        <span
          v-else
          class="text-[color:var(--heading)] text-ellipsis overflow-hidden inline-block align-middle max-w-[200px] md:max-w-none"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface DocLike {
  title?: string
  _path?: string
}

const props = defineProps<{ doc?: DocLike }>()
const route = useRoute()

function humanize(segment: string): string {
  const labelMap: Record<string, string> = { tohan: '登録販売者' }
  if (labelMap[segment]) return labelMap[segment]
  return segment.replace(/[-_]/g, ' ')
}

const trail = computed(() => {
  const items: Array<{ label: string; to: string }> = []
  const allSegs = route.path.split('/').filter(Boolean)
  // パンくずから除外するセグメント
  const excludedSegments = ['licenses', 'materials', 'articles', 'work', 'exam']
  
  // 除外されないセグメントのみをフィルタリング
  const filteredSegs = allSegs.filter(seg => !excludedSegments.includes(seg))
  
  filteredSegs.forEach((seg, idx) => {
    // 除外されないセグメントのみでパスを構築
    const pathSegs = filteredSegs.slice(0, idx + 1)
    const actualPath = '/' + pathSegs.join('/')
    const isLast = idx === filteredSegs.length - 1
    const label = isLast ? (props.doc?.title || humanize(seg)) : humanize(seg)
    items.push({ label, to: actualPath })
  })
  return items
})
</script>
<style scoped>
/* パンくずのリンクは全体スタイルをリセット */
nav[aria-label="Breadcrumb"] a {
  color: inherit;
  text-decoration: none;
  text-underline-offset: 2px;
}

/* hover 時だけ、細めの下線を出す */
nav[aria-label="Breadcrumb"] a:hover {
  text-decoration-line: underline;
  text-decoration-thickness: 1px; /* or `from-font` でもOK */
}
</style>
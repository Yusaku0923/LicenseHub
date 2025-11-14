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
  const labelMap: Record<string, string> = { 
    tohan: '登録販売者',
    exam: '受験対策',
    materials: '教材比較',
    work: '仕事・転職',
    articles: '記事一覧'
  }
  if (labelMap[segment]) return labelMap[segment]
  return segment.replace(/[-_]/g, ' ')
}

const trail = computed(() => {
  const items: Array<{ label: string; to: string }> = []
  const allSegs = route.path.split('/').filter(Boolean)
  // ハブページとして表示するセグメント（日本語ラベルに変換）
  const hubSegments = ['exam', 'materials', 'work', 'articles']
  // パンくずから除外するセグメント
  const excludedSegments = ['licenses']
  
  // パス構築用のセグメント（すべて含める）
  const pathSegments: string[] = []
  
  allSegs.forEach((seg, idx) => {
    // パスは常に完全なパスを使用
    pathSegments.push(seg)
    const actualPath = '/' + pathSegments.join('/')
    const isLast = idx === allSegs.length - 1
    
    // 除外セグメントは表示しない
    if (excludedSegments.includes(seg)) {
      return
    }
    
    // ハブセグメントの場合は日本語ラベルに変換して表示
    if (hubSegments.includes(seg)) {
      const label = isLast ? (props.doc?.title || humanize(seg)) : humanize(seg)
      items.push({ label, to: actualPath })
      return
    }
    
    // その他のセグメントも表示
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
nav[aria-label="Breadcrumb"] a:hover {
  @apply text-[var(--brand)] transition-colors;
}
</style>
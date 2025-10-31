<template>
  <nav aria-label="Breadcrumb" class="text-sm text-[color:var(--text-muted)]">
    <ol class="flex flex-wrap items-center gap-2">
      <li>
        <NuxtLink to="/" class="hover:underline">ホーム</NuxtLink>
      </li>
      <li v-for="(item, idx) in trail" :key="item.to" class="flex items-center gap-2">
        <span class="text-slate-300">/</span>
        <NuxtLink
          v-if="idx < trail.length - 1"
          :to="item.to"
          class="hover:underline"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="text-[color:var(--heading)]">{{ item.label }}</span>
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
  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

const segments = computed(() => route.path.split('/').filter(Boolean))

const trail = computed(() => {
  const items: Array<{ label: string; to: string }> = []
  let acc = ''
  const segs = segments.value
  segs.forEach((seg, idx) => {
    acc += '/' + seg
    const isLast = idx === segs.length - 1
    const label = isLast ? (props.doc?.title || humanize(seg)) : humanize(seg)
    items.push({ label, to: acc })
  })
  return items
})
</script>

<style scoped>
</style>



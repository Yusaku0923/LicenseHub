<script setup lang="ts">
interface LinkItem {
  label: string
  href: string
  description?: string
}
const props = defineProps<{
  title?: string
  items: LinkItem[]
}>()
</script>

<template>
  <section class="mt-10 p-5 rounded-xl border bg-gray-50">
    <h2 class="text-base md:text-lg font-semibold mb-3">
      {{ title || '次にチェックしておきたいページ' }}
    </h2>
    <ul class="space-y-2 text-sm">
      <li v-for="item in items" :key="item.href">
        <NuxtLink :to="item.href" class="font-medium underline">
          {{ item.label }}
        </NuxtLink>
        <span v-if="item.description" class="ml-1 text-gray-600">
          - {{ item.description }}
        </span>
      </li>
    </ul>
  </section>
</template>

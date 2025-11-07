<!-- components/license/InsightRow.vue -->
<script setup lang="ts">
const props = defineProps<{
  title: string
  body: string
}>()
</script>

<template>
  <section class="mb-6 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/60">
    <h3 class="text-sm font-semibold mb-1">
      {{ title }}
    </h3>
    <p class="text-xs md:text-sm text-gray-700 leading-relaxed">
      {{ body }}
    </p>
  </section>
</template>

<script setup lang="ts">
interface Props {
  items: string[]
}
const props = defineProps<Props>()
</script>

<template>
  <section class="mb-6 p-4 rounded-lg bg-gray-50 text-sm leading-relaxed">
    <ul class="space-y-1">
      <li v-for="(item, i) in items" :key="i">
        ✅ {{ item }}
      </li>
    </ul>
  </section>
</template>

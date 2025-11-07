<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  badge?: string
  estReadingMinutes?: number
}
const props = defineProps<Props>()
</script>

<template>
  <section class="mb-8 border-b pb-6">
    <div class="flex items-center gap-2 mb-3">
      <span v-if="badge" class="rounded-full px-3 py-1 text-xs bg-gray-100">
        {{ badge }}
      </span>
      <span v-if="estReadingMinutes" class="text-xs text-gray-500">
        約 {{ estReadingMinutes }} 分で読み終わります
      </span>
    </div>
    <h1 class="text-2xl md:text-3xl font-semibold mb-2">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="text-sm md:text-base text-gray-600">
      {{ subtitle }}
    </p>
  </section>
</template>

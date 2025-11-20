<!-- components/academy/common/AcademyPageHeader.vue -->
<template>
    <header
      class="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p
          v-if="eyebrow"
          class="text-xs font-medium uppercase tracking-wide text-emerald-600"
        >
          {{ eyebrow }}
        </p>
        <h1 class="text-2xl font-semibold text-slate-900">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="mt-1 text-sm text-slate-600">
          {{ subtitle }}
        </p>
      </div>
  
      <div class="flex flex-wrap items-center gap-2">
        <slot />
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    title: string
    subtitle?: string
    eyebrow?: string
  }>()
  </script>
  
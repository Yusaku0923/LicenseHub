<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" :class="className">
    <g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <!-- 本体 -->
      <rect x="16" y="12" width="32" height="40" rx="4" />
      <!-- 左側スパイラル部分 -->
      <path d="M20 16h-3" />
      <path d="M20 22h-3" />
      <path d="M20 28h-3" />
      <path d="M20 34h-3" />
      <!-- 行 -->
      <path d="M24 22h16" />
      <path d="M24 28h16" />
      <path d="M24 34h16" />
      <path d="M24 40h12" />
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>


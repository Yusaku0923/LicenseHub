<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" :class="className">
    <g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <!-- フタ -->
      <rect x="20" y="10" width="24" height="6" rx="2" />
      <path d="M23 10V8h18v2" />
      <!-- 首 -->
      <rect x="22" y="16" width="20" height="6" rx="2" />
      <!-- 本体 -->
      <rect x="18" y="22" width="28" height="28" rx="6" />
      <!-- ラベル枠 -->
      <rect x="22" y="30" width="20" height="14" rx="3" />
    </g>
    <!-- ハートマーク（中だけ塗りつぶし） -->
    <path
      d="M32 34.5c-0.8-1.2-2.4-2-3.9-1.5-1.3.5-2.1 1.6-2.1 3 0 1.7 1.3 3 3.3 4.7L32 42l2.7-1.3c2-1.7 3.3-3 3.3-4.7 0-1.4-.8-2.5-2.1-3-1.5-.5-3.1.3-3.9 1.5z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>


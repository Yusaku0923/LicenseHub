<!-- components/affiliate/AffiliateLinksTohanMaterials.vue -->
<template>
    <div class="mt-6">
      <ul class="space-y-2">
        <li v-for="link in links" :key="link.id">
          <a
            :href="link.href"
            rel="nofollow sponsored"
            target="_blank"
            class="inline-flex items-center gap-1 font-semibold text-[color:var(--brand)] hover:underline"
          >
            <span v-if="link.icon">{{ link.icon }}</span>
            <span>{{ link.label }}</span>
          </a>
        </li>
      </ul>
  
      <!-- A8 トラッキングピクセル（非表示） -->
      <div class="hidden">
        <img
          v-for="link in links"
          :key="link.id + '-pixel'"
          :src="link.pixel"
          width="1"
          height="1"
          border="0"
          alt=""
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const links = [
    {
      id: 'sanko',
      icon: '🏫',
      label: '三幸医療カレッジ公式サイト',
      href: 'https://px.a8.net/svt/ejp?a8mat=45GGT7+B5VM42+4N9Y+5YRHE',
      pixel: 'https://www11.a8.net/0.gif?a8mat=45GGT7+B5VM42+4N9Y+5YRHE',
    },
    {
      id: 'smart',
      icon: '💻',
      label: 'SMART合格講座公式サイト',
      href: 'https://px.a8.net/svt/ejp?a8mat=45GGT7+B72HBM+4LOQ+5YJRM',
      pixel: 'https://www14.a8.net/0.gif?a8mat=45GGT7+B72HBM+4LOQ+5YJRM',
    },
    {
      id: 'onsuku',
      icon: '📱',
      label: 'オンスク.JP公式サイト（ウケホーダイ）',
      href: 'https://px.a8.net/svt/ejp?a8mat=45GGT7+B7NWXE+408S+60WN6',
      pixel: 'https://www11.a8.net/0.gif?a8mat=45GGT7+B7NWXE+408S+60WN6',
    },
  ]
  </script>
  
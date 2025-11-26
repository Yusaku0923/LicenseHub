<template>
  <div class="space-y-10">
    <h1 class="text-2xl font-semibold text-slate-800">カスタムチャート デモ</h1>

    <CustomChart
      title="都道府県別 比較（Bar）"
      chart-type="bar"
      :labels="['北海道','東京','大阪','福岡']"
      :datasets="[
        { label: '受験者数', data: [120, 240, 180, 140], color: '#2563eb' },
        { label: '合格者数', data: [72, 150, 110, 90], color: '#10b981' }
      ]"
    />

    <CustomChart
      title="得点推移（Line）"
      chart-type="line"
      :labels="['1回目','2回目','3回目','4回目','5回目']"
      :datasets="[
        { label: '平均点', data: [48, 56, 61, 68, 74], color: '#2563eb' },
        { label: '目標ライン', data: [60, 60, 60, 60, 60], color: '#f59e0b' }
      ]"
    />

    <CustomChart
      title="セクション構成（Doughnut）"
      chart-type="doughnut"
      :labels="['法規','薬理','実務','生薬']"
      :datasets="[
        { label: '配分', data: [25, 35, 30, 10], color: '#2563eb' },
        { label: 'dummy', data: [], color: '#10b981' }
      ]"
    />

    <CustomChart
      title="学習バランス（Radar）"
      chart-type="radar"
      :labels="['理解度','定着度','スピード','正確性','復習頻度']"
      :datasets="[
        { label: '現在', data: [60, 55, 65, 58, 62], color: '#2563eb' },
        { label: '目標', data: [80, 80, 75, 80, 78], color: '#10b981' }
      ]"
    />

    <CustomChart
      title="科目ごとの構成比（Stacked Bar）"
      chart-type="stackedBar"
      :labels="['科目A','科目B','科目C']"
      :datasets="[
        { label: '基礎', data: [20, 25, 15], color: '#2563eb' },
        { label: '応用', data: [15, 10, 20], color: '#10b981' },
        { label: '実務', data: [10, 12, 8], color: '#f59e0b' }
      ]"
    />

    <CustomChart
      title="得点分布（Scatter）"
      chart-type="scatter"
      :datasets="[
        { label: '受験者', data: [{ x: 42, y: 38 }, { x: 55, y: 50 }, { x: 68, y: 62 }, { x: 75, y: 70 }, { x: 82, y: 78 }], color: '#2563eb' }
      ]"
      :max-value="100"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

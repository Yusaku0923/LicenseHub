<template>
  <div class="space-y-8">
    <AcademyPageHeader
      eyebrow="Account"
      title="アカウント設定"
      subtitle="登録情報の確認・変更や学習プランの調整が行えます。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition-all active:scale-95"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <!-- Subscription -->
        <NuxtLink to="/academy/user/subscription" class="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all hover:-translate-y-1">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon icon="ph:crown-fill" class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-black text-slate-900 mb-2">利用プラン・決済</h3>
            <p class="text-sm text-slate-500 mb-4">現在のプラン：プレミアムプラン<br>次回更新日：2026/02/01</p>
            <span class="text-sm font-bold text-emerald-600 group-hover:translate-x-1 inline-block transition-transform">詳細を見る →</span>
        </NuxtLink>

        <!-- Exam Settings -->
        <NuxtLink to="/academy/user/exam" class="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all hover:-translate-y-1">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon icon="ph:graduation-cap-fill" class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-black text-slate-900 mb-2">受験設定</h3>
            <p class="text-sm text-slate-500 mb-4">目標試験日：2026年8月<br>受験エリア：関東・甲信越</p>
            <span class="text-sm font-bold text-blue-600 group-hover:translate-x-1 inline-block transition-transform">設定を変更 →</span>
        </NuxtLink>

        <!-- General Settings -->
        <NuxtLink to="/academy/user/settings" class="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-500/10 hover:border-slate-200 transition-all hover:-translate-y-1">
            <div class="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon icon="ph:gear-fill" class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-black text-slate-900 mb-2">一般設定</h3>
            <p class="text-sm text-slate-500 mb-4">メールアドレス変更<br>パスワード変更</p>
            <span class="text-sm font-bold text-slate-600 group-hover:translate-x-1 inline-block transition-transform">設定へ →</span>
        </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import AcademyPageHeader from '~/components/academy/common/AcademyPageHeader.vue'

definePageMeta({
  layout: "academy"
})
</script>

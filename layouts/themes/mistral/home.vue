<template>
    <MistralHeader />
  
    <MistralHomeLayout>
      <!-- メインコンテンツ -->
      <template #posts>
        <!-- ① Hero -->
        <section
          class="rounded-2xl bg-[rgba(50,93,206,0.08)] border border-[rgba(50,93,206,0.05)] p-6 md:p-10 flex flex-col gap-6 md:flex-row md:items-center mb-10"
        >
          <div class="flex-1">
            <h1 class="text-3xl md:text-4xl font-bold text-[color:var(--heading)] mb-4 leading-tight">
              登録販売者の勉強・合格・仕事探しをまとめたガイド
            </h1>
            <p class="text-[15px] md:text-lg text-[color:var(--text-muted)] mb-5">
              試験対策・教材比較・現場での働き方まで、登録販売者に関する情報を発信しています。
            </p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink to="/exam" class="btn-primary">受験対策をみる</NuxtLink>
              <NuxtLink to="/materials" class="btn-secondary">教材を比較する</NuxtLink>
            </div>
          </div>
        </section>
  
        <!-- ② カテゴリクイックリンク -->
        <section class="grid gap-4 md:grid-cols-3 mb-12">
          <NuxtLink
            v-for="item in quickLinks"
            :key="item.to"
            :to="item.to"
            class="bg-white rounded-xl border border-[rgba(15,23,42,0.03)] shadow-sm p-4 flex items-center gap-3 hover:border-[rgba(50,93,206,0.35)] transition"
          >
            <div
              class="w-10 h-10 rounded-full bg-[rgba(50,93,206,0.08)] flex items-center justify-center text-[color:var(--brand)] text-lg"
            >
              {{ item.icon }}
            </div>
            <div>
              <p class="font-semibold text-[color:var(--heading)]">{{ item.title }}</p>
              <p class="text-xs text-[color:var(--text-muted)]">{{ item.desc }}</p>
            </div>
          </NuxtLink>
        </section>
  
        <!-- ③ 新着記事（ここに元の Mistral のコンポーネントを入れてもいい） -->
        <section class="mb-12">
          <div class="flex items-center justify-between mb-4">
            <h2 class="section-title mb-0">新着記事</h2>
            <NuxtLink to="/articles" class="text-sm text-[color:var(--brand)] hover:underline">もっと見る</NuxtLink>
          </div>
  
          <!-- 今はモック、後でMistralLimitedListOfPostsに差し替え -->
          <div class="grid gap-6 md:grid-cols-3">
            <article
              v-for="(post, i) in latestPosts"
              :key="i"
              class="bg-white rounded-xl border border-[rgba(15,23,42,0.02)] shadow-sm overflow-hidden flex flex-col"
            >
              <div class="h-32 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                {{ post.cover ? 'thumbnail' : 'no image' }}
              </div>
              <div class="p-4 flex flex-col gap-3 flex-1">
                <p
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(50,93,206,0.08)] text-[0.6rem] text-[color:var(--brand)] font-semibold w-fit"
                >
                  {{ post.category || 'お知らせ' }}
                </p>
                <NuxtLink :to="post._path" class="font-semibold text-[color:var(--heading)] leading-snug line-clamp-2">
                  {{ post.title }}
                </NuxtLink>
                <p class="text-xs text-[color:var(--text-muted)]">
                  {{ formatDate(post.date) }}
                </p>
              </div>
            </article>
          </div>
        </section>
  
        <!-- ④ カテゴリ別セクション -->
        <section class="space-y-12 mb-4">
          <div v-for="section in categorySections" :key="section.slug">
            <div class="flex items-center justify-between mb-4">
              <h2 class="section-title mb-0">{{ section.title }}</h2>
              <NuxtLink :to="section.to" class="text-sm text-[color:var(--brand)] hover:underline">もっと見る</NuxtLink>
            </div>
            <div class="grid gap-6 md:grid-cols-3">
              <article
                v-for="(post, i) in section.items"
                :key="i"
                class="bg-white rounded-xl border border-[rgba(15,23,42,0.02)] shadow-sm p-4"
              >
                <p class="text-xs text-[color:var(--text-muted)] mb-1">{{ formatDate(post.date) }}</p>
                <NuxtLink :to="post._path" class="font-semibold text-[color:var(--heading)] leading-snug line-clamp-2">
                  {{ post.title }}
                </NuxtLink>
              </article>
            </div>
          </div>
        </section>
      </template>
  
      <!-- サイドバー -->
      <template #sidebar>
        <MistralSidebar :tags="tags" />
      </template>
    </MistralHomeLayout>
  
    <MistralFooter />
  </template>
  
  <script setup lang="ts">
  import MistralHeader from '~/components/themes/mistral/MistralHeader.vue'
  import MistralFooter from '~/components/themes/mistral/MistralFooter.vue'
  import MistralHomeLayout from '~/components/content/MistralHomeLayout.vue'
  import MistralSidebar from '~/components/themes/mistral/MistralSidebar.vue'
  
  const quickLinks = [
    { to: '/exam', title: '受験対策', desc: '合格に必要な範囲を整理', icon: '📘' },
    { to: '/materials', title: '教材・講座比較', desc: '通信講座・独学テキスト', icon: '📚' },
    { to: '/work', title: '仕事・転職', desc: 'ドラッグストア・調剤薬局', icon: '💼' },
  ]
  
  // いったんモック。後で content から取得に差し替え
  const latestPosts = [
    { title: '【2025年版】登録販売者試験の出題傾向と対策', date: '2025-10-25', category: '受験対策', _path: '/posts/sample-1' },
    { title: '主婦・パートでの勉強時間の目安', date: '2025-10-24', category: '受験対策', _path: '/posts/sample-2' },
    { title: 'ユーキャンとフォーサイトの比較', date: '2025-10-23', category: '教材・講座', _path: '/posts/sample-3' },
  ]
  
  const categorySections = [
    {
      slug: 'exam',
      title: '受験対策',
      to: '/exam',
      items: latestPosts,
    },
    {
      slug: 'materials',
      title: '教材・通信講座',
      to: '/materials',
      items: latestPosts,
    },
    {
      slug: 'work',
      title: '仕事・転職',
      to: '/work',
      items: latestPosts,
    },
  ]
  
  const tags = ['試験情報', '合格体験記', '独学', 'テキスト', 'ドラッグストア', '調剤薬局']
  
  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
  }
  </script>
  
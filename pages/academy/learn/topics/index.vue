<template>
  <div class="space-y-8">
    <AcademyPageHeader
      eyebrow="Lecture Documents"
      title="講義資料ライブラリ"
      subtitle="体系的な知識をインプット。隙間時間に読み進めましょう。"
    >
      <NuxtLink
        to="/academy"
        class="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition-all active:scale-95"
      >
        ダッシュボードに戻る
      </NuxtLink>
    </AcademyPageHeader>

    <div class="space-y-4">
      <div
        v-for="(chapter, chapterTitle) in groupedLectures"
        :key="chapterTitle"
        class="space-y-4"
      >
        <h3
          class="ml-2 text-lg font-bold text-slate-900 flex items-center gap-2"
        >
          <span class="block h-6 w-1 rounded-full bg-indigo-500"></span>
          {{ chapterTitle }}
        </h3>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="lecture in chapter"
            :key="lecture.id"
            :to="`/academy/learn/topics/${lecture.slug}`"
            class="group relative flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 hover:ring-indigo-500/20"
          >
            <div class="mb-4 flex items-start justify-between">
              <div
                class="rounded-2xl bg-indigo-50 p-3 text-indigo-500 transition-colors group-hover:bg-indigo-500 group-hover:text-white"
              >
                <Icon icon="ph:book-open-text-fill" class="w-6 h-6" />
              </div>
              <span
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500"
              >
                {{ lecture.estimatedMinutes }}分
              </span>
            </div>

            <div class="flex-1">
              <h4
                class="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2"
              >
                {{ lecture.title }}
              </h4>
              <p class="mt-2 text-sm text-slate-500 line-clamp-3">
                {{ lecture.content }}
              </p>
            </div>

            <div class="mt-6 flex items-center justify-end">
              <span
                class="text-sm font-bold text-indigo-500 group-hover:translate-x-1 transition-transform"
              >
                読む →
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AcademyPageHeader from "~/components/academy/common/AcademyPageHeader.vue";
import {
  useAcademyMock,
  type LectureSection,
} from "~/composables/useAcademyMock";

definePageMeta({
  layout: "academy",
});

const { lectureSections } = useAcademyMock();

// Group lectures by chapter title
const groupedLectures = computed(() => {
  const groups: Record<string, LectureSection[]> = {};
  lectureSections.value.forEach((lecture) => {
    if (!groups[lecture.chapterTitle]) {
      groups[lecture.chapterTitle] = [];
    }
    groups[lecture.chapterTitle].push(lecture);
  });
  return groups;
});
</script>

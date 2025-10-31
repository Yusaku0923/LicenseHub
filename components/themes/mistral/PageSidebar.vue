<template>
    <aside class="lg:sticky top-28 pt-5 -mt-5 text-sm space-y-6">
      <!-- PC: 目次 -->
      <div v-if="toc.length > 0" class="hidden lg:block bg-white border border-slate-200 rounded-xl p-4">
        <p class="pb-3 mb-3 border-b border-slate-200 text-sm font-semibold text-slate-900">
          この記事の内容
        </p>
        <ul class="space-y-1">
          <li
            v-for="item in toc"
            :key="item.id"
            :class="[
              item.depth === 2 ? 'font-medium text-slate-700' : 'text-slate-500',
              item.depth === 3 ? 'ml-3 text-xs' : ''
            ]"
          >
            <a
              :href="'#' + item.id"
              class="hover:text-emerald-700 transition-colors"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
  
      <!-- PC: 今後のCTAや広告をここに足す -->
      <div class="hidden lg:block space-y-3">
        <!-- 例：講座CTAを後で挿入 -->
        <!-- <CourseCta /> -->
      </div>
  
      <!-- SP: ドロップダウン式の目次（右固定をやめる） -->
      <div v-if="toc.length > 0" class="lg:hidden">
        <FilterDropdown>
          <template #title>目次</template>
          <template #options>
            <ul class="p-4 space-y-2">
              <li
                v-for="item in toc"
                :key="item.id"
                :class="item.depth === 3 ? 'ml-3 text-xs text-slate-500' : 'text-slate-700'"
              >
                <a
                  :href="'#' + item.id"
                  class="hover:text-emerald-700 transition-colors"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </template>
        </FilterDropdown>
      </div>
    </aside>
  </template>
  
  <script setup lang="ts">
  import FilterDropdown from '~/components/themes/mistral/Dropdown.vue'
  
  defineProps<{
    toc: Array<{
      id: string
      text: string
      depth: number
    }>
  }>()
  </script>
  
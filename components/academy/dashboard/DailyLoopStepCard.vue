<template>
  <div 
    class="relative group cursor-pointer transition-all duration-300"
    :class="horizontal ? 'pt-10 pb-2 px-2 flex-1 text-center' : 'pl-8 py-2'"
    @click="$emit('click')"
  >
    <!-- Timeline Line (Vertical) -->
    <div 
      v-if="!horizontal"
      class="absolute left-[11px] top-0 bottom-0 w-[2px]"
      :class="isLast ? 'bg-gradient-to-b from-slate-200 to-transparent bottom-1/2' : 'bg-slate-200'"
    ></div>

    <!-- Timeline Line (Horizontal) - REMOVED per user request -->

    <!-- Node Icon -->
    <div 
      class="absolute rounded-full border-2 flex items-center justify-center z-10 bg-white transition-all duration-300 transform"
      :class="[
        horizontal ? 'top-0 left-1/2 -translate-x-1/2' : 'left-0 top-1/2 -translate-y-1/2',
        'h-6 w-6',
        isCompleted 
          ? 'border-emerald-500 bg-emerald-50 text-emerald-600' 
          : isActive 
            ? 'border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]' 
            : 'border-slate-300 text-slate-300'
      ]"
    >
      <Icon v-if="isCompleted" icon="ph:check-bold" class="w-4 h-4" />
      <span v-else-if="isActive" class="h-2 w-2 rounded-full bg-emerald-500"></span>
      <span v-else class="text-[10px] font-bold text-slate-400">{{ stepNumber }}</span>
    </div>

    <!-- Card Content -->
    <div 
      class="relative bg-white rounded-xl border p-4 transition-all duration-300 h-full flex flex-col overflow-hidden"
      :class="[
        isActive 
          ? 'border-emerald-500 ring-4 ring-emerald-50 shadow-xl shadow-emerald-500/10' + (horizontal ? ' -translate-y-1' : ' translate-x-1')
          : 'border-slate-100 shadow-sm hover:border-emerald-50 hover:shadow-md'
      ]"
    >
      <!-- Background Icon Watermark -->
      <div 
        class="absolute -right-4 -bottom-4 text-8xl opacity-5 pointer-events-none transition-colors duration-300"
        :class="[
           type === 'lecture' ? 'text-blue-500' :
           type === 'practice' ? 'text-emerald-500' :
           'text-amber-500'
        ]"
      >
        <Icon 
          :icon="
            type === 'lecture' ? 'ph:book-open-text-duotone' :
            type === 'practice' ? 'ph:pencil-circle-duotone' :
            'ph:cards-duotone'
          " 
        />
      </div>

      <div class="relative z-10 flex items-center justify-between mb-3" :class="{ 'flex-col gap-2 items-start': horizontal }">
        <div class="flex items-center gap-2">
          <span 
            class="text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded"
            :class="[
              color === 'blue' ? 'bg-blue-50 text-blue-600' :
              color === 'green' ? 'bg-emerald-50 text-emerald-600' :
              'bg-amber-50 text-amber-600'
            ]"
          >
            STEP 0{{ stepNumber }}
          </span>
          <span class="text-xs font-bold text-slate-400">{{ time }}</span>
        </div>
        
        <!-- Status Badge -->
        <span v-if="isCompleted" class="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1" :class="{ 'self-end': horizontal }">
          <Icon icon="ph:check-bold" /> COMPLETED
        </span>
      </div>

      <div class="relative z-10">
        <h3 class="text-lg font-black text-slate-900 mb-1" :class="{ 'text-left': horizontal }">
          {{ title }}
        </h3>
        <p class="text-xs font-bold text-slate-500 leading-relaxed" :class="{ 'text-left': horizontal }">
          {{ subtitle }}
        </p>
      </div>

      <!-- Action Button -->
      <div 
         v-if="!isCompleted" 
         class="relative z-10 mt-auto pt-4 flex transition-all duration-300 w-full"
         :class="horizontal ? 'justify-center' : 'justify-end'"
      >
        <button 
          class="rounded-full transition-all duration-300 flex items-center justify-center relative group/btn"
          :class="[
             horizontal ? 'w-14 h-14' : 'w-full py-2.5 rounded-lg font-bold text-sm gap-2',
             isActive 
               ? (
                 type === 'lecture' ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 ring-1 ring-white/20 inset' :
                 type === 'practice' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 ring-1 ring-white/20 inset' :
                 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/40 hover:shadow-amber-500/60 ring-1 ring-white/20 inset'
               )
               : 'bg-slate-50 text-slate-300 hover:bg-slate-100 shadow-inner'
          ]"
        >
          <span v-if="!horizontal">{{ isActive ? '始める' : '開始する' }}</span>
          
          <!-- Icon with slight scale on hover -->
          <Icon 
             :icon="isActive ? 'ph:play-fill' : 'ph:lock-key-fill'" 
             :class="[
                horizontal ? 'w-7 h-7' : 'w-4 h-4',
                isActive ? 'group-hover/btn:scale-110 transition-transform' : ''
             ]" 
          />
          
          <!-- Ping animation (Pulse ring) for purely active items to draw attention -->
          <span v-if="isActive && horizontal" class="absolute -inset-1 rounded-full border-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-ping transition-all"
             :class="type === 'lecture' ? 'border-blue-500' : type === 'practice' ? 'border-emerald-500' : 'border-amber-500'"
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stepNumber: number
  title: string
  subtitle: string
  time: string
  color: 'blue' | 'green' | 'yellow'
  type: 'lecture' | 'practice' | 'flashcard'
  isActive?: boolean
  isCompleted?: boolean
  isLast?: boolean
  isFirst?: boolean
  horizontal?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

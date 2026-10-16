<script setup lang="ts">
import {ref} from 'vue'
import {Image as ImageIcon} from 'lucide-vue-next'
defineProps<{src:string;alt:string;wide?:boolean}>()
const loaded=ref(false),failed=ref(false)
</script>
<template><div class="relative overflow-hidden bg-gradient-to-br from-[#e9effb] via-[#f5f8ff] to-[#dfe8f7]" :class="wide?'aspect-[16/9]':'aspect-[4/3]'">
  <img v-if="!failed" :src="src" :alt="alt" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition duration-500" :class="loaded?'opacity-100':'opacity-0'" @load="loaded=true" @error="failed=true"/>
  <div v-if="!loaded||failed" class="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[#94a5bd]"><ImageIcon :size="40" :stroke-width="1.3"/><span class="text-xs font-bold tracking-[.22em] uppercase">{{alt}}</span><span class="text-[11px]">IMAGE COMING SOON</span></div>
</div></template>

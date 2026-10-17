<script setup lang="ts">
import {computed,ref} from 'vue'
import {useRoute} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {ArrowUpRight,X,ChevronLeft,ChevronRight} from 'lucide-vue-next'
import {projects,imagePath} from '../data/projects'
import ProjectImage from '../components/ProjectImage.vue'
import ProjectCard from '../components/ProjectCard.vue'

const route=useRoute()
const {t}=useI18n()
const project=computed(()=>projects.find(p=>p.id===route.params.id))
const index=ref<number|null>(null)
const other=computed(()=>projects.filter(p=>p.id!==route.params.id))
const lang=computed(()=>String(route.params.lang))
const contactPath=computed(()=>{
  const category=project.value?.category
  if(category==='website') return `/${lang.value}/contact/?type=0`
  if(category==='system') return `/${lang.value}/contact/?type=1`
  return `/${lang.value}/contact/`
})

function step(direction:number){
  if(project.value&&index.value!==null) index.value=(index.value+direction+project.value.images.length)%project.value.images.length
}
function stem(file:string){return file.replace(/\.webp$/,'')}
function featureText(file:string,field:'title'|'body'|'value'){
  return t(`projects.${String(route.params.id)}.features.${stem(file)}.${field}`)
}
</script>
<template>
  <div v-if="project">
    <section class="bg-ink text-white py-20 md:py-28">
      <div class="wrap">
        <p class="eyebrow !text-[#a2b9ff] mb-5">{{t('portfolio.'+project.category)}} / RYSEN PORTFOLIO</p>
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-[-.055em]">{{t('projects.'+project.id+'.title')}}</h1>
        <p class="text-[#b4c2d9] mt-6 text-lg max-w-2xl">{{t('projects.'+project.id+'.summary')}}</p>
        <p class="text-[#8ea0bb] mt-4 text-sm">{{t('portfolio.audience')}} · {{t('projects.'+project.id+'.audience')}}</p>
        <a :href="project.url" target="_blank" rel="noopener noreferrer" class="btn btn-primary mt-9">{{t('portfolio.visit')}} <ArrowUpRight :size="18"/></a>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p class="eyebrow mb-4">01 / {{t('portfolio.background')}}</p>
            <h2 class="text-2xl font-extrabold">{{t('portfolio.background')}}</h2>
            <p class="muted mt-5 leading-8">{{t('projects.'+project.id+'.background')}}</p>
          </div>
          <ProjectImage :src="imagePath(project.id,project.images[0],lang)" :alt="featureText(project.images[0],'title')" wide/>
        </div>
        <div class="mt-20 max-w-3xl">
          <p class="eyebrow mb-4">02 / {{t('portfolio.solution')}}</p>
          <h2 class="text-2xl font-extrabold">{{t('portfolio.solution')}}</h2>
          <div class="mt-8 space-y-6">
            <div><p class="text-sm font-bold">{{t('portfolio.need')}}</p><p class="muted mt-2 leading-8">{{t('projects.'+project.id+'.need')}}</p></div>
            <div><p class="text-sm font-bold">{{t('portfolio.approach')}}</p><p class="muted mt-2 leading-8">{{t('projects.'+project.id+'.approach')}}</p></div>
            <div><p class="text-sm font-bold">{{t('portfolio.effect')}}</p><p class="muted mt-2 leading-8">{{t('projects.'+project.id+'.effect')}}</p></div>
          </div>
        </div>
        <div class="mt-20">
          <p class="eyebrow mb-4">03 / {{t('portfolio.features')}}</p>
          <h2 class="text-3xl font-extrabold mb-9">{{t('portfolio.features')}}</h2>
          <div class="grid gap-8" :class="project.id==='rysen-works'?'grid-cols-1':'md:grid-cols-2'">
            <article v-for="(file,i) in project.images" :key="file" class="card">
              <button class="block w-full text-left" :aria-label="featureText(file,'title')" @click="index=i">
                <ProjectImage :src="imagePath(project.id,file,lang)" :alt="featureText(file,'title')" wide/>
              </button>
              <div class="px-5 py-5 md:px-6">
                <h3 class="text-lg font-extrabold">{{featureText(file,'title')}}</h3>
                <p class="muted text-sm leading-7 mt-3">{{featureText(file,'body')}}</p>
                <p class="text-sm leading-7 mt-3"><span class="font-bold">{{t('portfolio.featureUse')}}</span> {{featureText(file,'value')}}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <section class="section bg-paper">
      <div class="wrap max-w-3xl">
        <p class="eyebrow mb-4">04 / {{t('portfolio.value')}}</p>
        <h2 class="text-2xl font-extrabold">{{t('portfolio.value')}}</h2>
        <p class="muted mt-5 leading-8">{{t('projects.'+project.id+'.value')}}</p>
        <div class="mt-16 border-t border-[#e4e9f1] pt-12">
          <p class="eyebrow mb-4">05 / {{t('portfolio.inquiry')}}</p>
          <h2 class="text-2xl font-extrabold">{{t('portfolio.inquiry')}}</h2>
          <p class="muted mt-5 leading-8">{{t('projects.'+project.id+'.cta')}}</p>
          <RouterLink :to="contactPath" class="btn btn-primary mt-8">{{t('portfolio.inquiry')}} <ArrowUpRight :size="18"/></RouterLink>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <h2 class="section-title mb-10">{{t('portfolio.next')}}</h2>
        <div class="grid md:grid-cols-2 gap-6"><ProjectCard v-for="item in other" :key="item.id" :project="item"/></div>
      </div>
    </section>
    <div v-if="index!==null" class="fixed inset-0 bg-[#060b18]/95 z-[100] flex items-center justify-center p-5" role="dialog" aria-modal="true" @click.self="index=null">
      <button class="absolute top-5 right-5 text-white p-3" aria-label="Close" @click="index=null"><X/></button>
      <button class="absolute left-2 md:left-8 text-white p-2" aria-label="Previous" @click="step(-1)"><ChevronLeft :size="32"/></button>
      <div class="w-full max-w-5xl mx-12">
        <ProjectImage :src="imagePath(project.id,project.images[index],lang)" :alt="featureText(project.images[index],'title')" wide/>
        <p class="text-white/70 text-center mt-4">{{index+1}} / {{project.images.length}} · {{featureText(project.images[index],'title')}}</p>
      </div>
      <button class="absolute right-2 md:right-8 text-white p-2" aria-label="Next" @click="step(1)"><ChevronRight :size="32"/></button>
    </div>
  </div>
  <section v-else class="section wrap"><h1>Project not found</h1><RouterLink to="/ko/portfolio/" class="text-accent">Portfolio →</RouterLink></section>
</template>

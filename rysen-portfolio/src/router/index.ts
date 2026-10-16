import {createRouter,createWebHistory} from 'vue-router'
import Home from '../views/HomeView.vue'
import Portfolio from '../views/PortfolioView.vue'
import Project from '../views/ProjectView.vue'
import Services from '../views/ServicesView.vue'
import About from '../views/AboutView.vue'
import Contact from '../views/ContactView.vue'
const languages=['ko','en','zh']
export const router=createRouter({history:createWebHistory(import.meta.env.BASE_URL),routes:[{path:'/',redirect:()=>`/${localStorage.getItem('rysen-lang')||'ko'}/`},{path:'/:lang(ko|en|zh)/',component:Home},{path:'/:lang(ko|en|zh)/services/',component:Services},{path:'/:lang(ko|en|zh)/portfolio/',component:Portfolio},{path:'/:lang(ko|en|zh)/projects/:id/',component:Project},{path:'/:lang(ko|en|zh)/about/',component:About},{path:'/:lang(ko|en|zh)/contact/',component:Contact},{path:'/:pathMatch(.*)*',redirect:'/ko/'}],scrollBehavior(){return {top:0}}})
router.beforeEach(to=>{const lang=String(to.params.lang||'ko');if(languages.includes(lang)){localStorage.setItem('rysen-lang',lang);document.documentElement.lang=lang}})

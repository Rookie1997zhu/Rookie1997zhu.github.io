import {createApp,watch} from 'vue'
import {createI18n} from 'vue-i18n'
import App from './App.vue'
import {router} from './router'
import ko from './locales/ko.json'
import en from './locales/en.json'
import zh from './locales/zh.json'
import './styles/main.css'
const i18n=createI18n({legacy:false,locale:'ko',fallbackLocale:'ko',messages:{ko,en,zh}})
watch(()=>router.currentRoute.value.params.lang,lang=>{if(typeof lang==='string'&&['ko','en','zh'].includes(lang))i18n.global.locale.value=lang as 'ko'|'en'|'zh'},{immediate:true})
createApp(App).use(i18n).use(router).mount('#app')

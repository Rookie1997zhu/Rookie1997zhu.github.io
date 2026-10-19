export type Category = 'website'|'system'|'cms'
export type Project = {id:string;category:Category;url:string;year?:string;tags:string[];images:string[];featured:boolean}
export const projects:Project[]=[
{id:'rysen-works',category:'system',url:'https://www.rysenworks.com/',tags:['Orders','Inventory','Schedule','Approvals'],images:['cover.webp','orders.webp','schedule.webp','inventory.webp','approvals.webp','files.webp','documents.webp','arrivals.webp','customer.webp','language.webp'],featured:true},
{id:'ssuker',category:'website',url:'https://www.ssuker.co.kr/',tags:['Corporate Website','Responsive','Brand'],images:['cover.webp','home.webp','mobile.webp'],featured:true},
{id:'massconnected',category:'cms',url:'https://www.massconnected.com/',tags:['RFQ','Marketplace','Blog'],images:['cover.webp','homepage.webp','rfq.webp','estimate.webp','dieline.webp','shop.webp','buyer.webp','factory.webp','blog.webp'],featured:true},
{id:'odeokgu',category:'website',url:'https://www.xn--2e0b25i8pimogprf1ev44j.com/',tags:['Customizer','Goods','Editor'],images:['cover.webp','text.webp','package.webp','options.webp','guide.webp','result.webp'],featured:true}
]
export const imagePath=(id:string,file:string,lang?:string)=>{
  const root=`${import.meta.env.BASE_URL}images/projects/${id}/`
  if(id==='rysen-works') return `${root}${lang==='ko'?'ko':'zh'}/${file}`
  if(id==='massconnected') return `${root}${lang==='en'||lang==='zh'?lang:'ko'}/${file}`
  return `${root}${file}`
}

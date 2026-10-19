import fs from 'node:fs';import path from 'node:path';
// Static route entrypoints for GitHub Pages: each URL receives a real HTML file.
// Content is hydrated client-side; this is NOT server-side rendering.
const dist=path.resolve('dist');const template=fs.readFileSync(path.join(dist,'index.html'),'utf8');const base=process.env.VITE_BASE_PATH||'/rysen-portfolio/';const langs=['ko','en','zh'];const pages=['','services','portfolio','about','contact',...['rysen-works','ssuker','massconnected','odeokgu'].map(id=>'projects/'+id)];const site=(process.env.SITE_URL||`https://YOUR_USERNAME.github.io${base}`).replace(/\/$/,'');
const labels={ko:'RYSEN | 웹사이트 제작 및 프로젝트 포트폴리오',en:'RYSEN | Web Solutions & Portfolio',zh:'RYSEN | 网站开发服务与作品集'};
const descriptions={ko:'RYSEN의 기업 홈페이지, 맞춤형 업무 시스템, 콘텐츠 웹사이트 프로젝트를 살펴보세요.',en:'Explore corporate websites, custom business systems, and content websites by RYSEN.',zh:'了解 RYSEN 的企业官网、定制业务系统与内容管理网站项目。'};
const entries=[];
for(const lang of langs)for(const page of pages){const relative=`${lang}/${page?`${page}/`:''}`;const canonical=`${site}/${relative}`;let html=template.replace('<html lang="ko">',`<html lang="${lang}">`).replace(/<title>[^<]*<\/title>/,`<title>${labels[lang]}</title><meta name="description" content="${descriptions[lang]}"/><link rel="canonical" href="${canonical}"/><meta property="og:title" content="${labels[lang]}"/><meta property="og:description" content="${descriptions[lang]}"/><meta property="og:type" content="website"/><meta property="og:url" content="${canonical}"/>`);const alternates=langs.map(l=>`<link rel="alternate" hreflang="${l==='zh'?'zh-CN':l==='ko'?'ko-KR':'en'}" href="${site}/${l}/${page?`${page}/`:''}"/>`).join('');html=html.replace('</head>',`${alternates}</head>`);const folder=path.join(dist,relative);fs.mkdirSync(folder,{recursive:true});fs.writeFileSync(path.join(folder,'index.html'),html);entries.push(canonical)}
fs.writeFileSync(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map(url=>`<url><loc>${url.replaceAll('&','&amp;')}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
// 404 fallback for unknown routes, redirecting through the client router.
fs.copyFileSync(path.join(dist,'index.html'),path.join(dist,'404.html'));
console.log(`Created ${entries.length} static route HTML files. Configure SITE_URL for correct canonical links.`)

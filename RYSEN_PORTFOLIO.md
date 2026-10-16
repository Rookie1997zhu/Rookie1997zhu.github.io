# RYSEN PORTFOLIO 网站开发方案

## 1. 项目目标

以 **RYSEN** 公司品牌面向韩国企业客户展示网站开发与定制业务系统能力，使用真实案例促进业务咨询。独立网站，纯前端开发，通过 GitHub Pages 发布。

## 2. 技术栈

| 模块 | 方案 |
| --- | --- |
| 前端 | Vue 3 + Composition API + TypeScript |
| 构建 | Vite |
| 样式 | Tailwind CSS |
| 路由 | Vue Router 4 |
| 多语言 | Vue I18n：韩语（默认）、英语、中文 |
| 图标 | Lucide Vue Next |
| 内容 | 本地 TypeScript 项目配置与 JSON 翻译文件 |
| 部署 | GitHub Pages + GitHub Actions |
| 后端 / 数据库 | 暂不使用 |

## 3. 网站信息架构

- 首页：品牌定位、服务介绍、精选项目、开发流程、咨询入口。
- Services：企业官网、定制业务系统、内容管理网站。
- Portfolio：全部项目、按类型筛选、项目卡片。
- Project Detail：项目背景、亮点、截图画廊、放大浏览、项目官网。
- About：RYSEN 公司及开发理念。
- Contact：项目类型、预算、联系人、邮箱、需求说明，生成邮件咨询。

## 4. 预置案例

1. **RYSEN WORKS**：企业业务管理系统，`https://www.rysenworks.com/`。
2. **SSUKER**：企业官网，`https://www.ssuker.co.kr/`。
3. **MASSCONNECTED**：企业官网及内容管理，`https://www.massconnected.com/`。

案例内容为初始说明，发布前需核对实际功能、开发归属及展示授权。

## 5. 设计规范

- 韩国商务风格，白色、深蓝、强调蓝、浅灰。
- 响应式桌面/平板/手机布局；优先展示大尺寸真实截图。
- 图片未上传时显示占位卡片。
- 项目卡片 Hover、轻量过渡、图片灯箱；兼顾无障碍和减少动画偏好。

## 6. 项目截图管理

截图由维护人员自行上传至 `public/images/projects/<项目ID>/`，在 `src/data/projects.ts` 中配置文件名。第一张图片作为封面。推荐 WebP 并控制体积。增加项目时同步补充三个语言文件与静态路由生成清单。

## 7. 国际化与 SEO

- 默认韩语，手动切换中文和英文；记忆用户选择，保留当前页面。
- 路由形式：`/ko/`、`/en/`、`/zh/`，项目详情如 `/ko/projects/rysen-works/`。
- 构建时生成各语言各路由的 HTML 入口、canonical、hreflang、sitemap 和 robots.txt。
- **限制**：首版为 Vue SPA 的静态 HTML 入口，并非正文完整预渲染；如未来重视自然搜索流量，升级 Vite SSG / Nuxt SSG。

## 8. 客户咨询

首版使用 `mailto:`：根据用户填写的信息生成邮件，由其邮件客户端发送。必须在 `src/data/site.ts` 设置真实公司邮箱。此方式无法保证提交成功，也不会在服务器存储记录；如需在线提交，可后续接入第三方表单服务，并完善隐私政策。

## 9. GitHub Pages 部署

- 使用 GitHub Actions 构建并发布。
- 设置仓库 `Settings → Pages → Source: GitHub Actions`。
- 默认部署在 `https://<用户名>.github.io/<仓库名>/`；构建时按仓库名设置 Vite base。
- 自定义域名需把 Vite base 改为 `/` 并更新 SITE_URL。
- 所有项目详情路由生成对应 HTML 文件，支持直接访问和刷新。

## 10. 开发与验收

1. Vue 3 工程初始化、三语路由、响应式导航。
2. 首页、服务页、公司介绍页。
3. 项目列表、分类筛选、项目详情。
4. 图片占位、上传路径、画廊及放大功能。
5. 联系表单与邮件入口。
6. SEO 元数据、多语言静态路由入口。
7. GitHub Actions 发布与移动端测试。

验收重点：三语切换正常、图片缺失不破版、项目筛选正确、详情链接刷新不 404、邮件入口有明确提示、GitHub Pages 资源路径正确。

## 11. 交付内容

- Vue 3 + TypeScript 源码 ZIP
- 中文 README（运行、截图上传、增加项目、部署、常见问题）
- 中英韩语言文件与三个项目配置
- GitHub Actions 部署工作流
- 本 Markdown 开发方案

**说明**：静态部署不包含后台、数据库或真正的服务端邮件接收。上线前需补充真实截图与公司联系邮箱。

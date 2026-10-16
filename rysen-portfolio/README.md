# RYSEN PORTFOLIO — Vue 3 商业作品集

面向韩国企业客户的 RYSEN 网站开发服务与案例展示网站。纯前端、响应式、中英韩三语，适合 GitHub Pages。

## 技术栈

- Vue 3 + Composition API + TypeScript
- Vite 6 + Tailwind CSS 3
- Vue Router 4 + Vue I18n 10
- Lucide Vue Next
- GitHub Actions + GitHub Pages

无需后端、数据库或登录系统。

## 本地运行

要求 Node.js 20.19+ 或 22+。

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址。

生产构建：

```bash
npm run build
npm run preview
```

`dist/` 是构建输出。`npm run build` 会执行 TypeScript 检查、Vite 构建及多语言路由 HTML 入口生成。

## 必须修改的上线配置

1. **咨询邮箱**：编辑 `src/data/site.ts` 中的 `CONTACT_EMAIL`，改成真实公司邮箱。未设置时咨询按钮会提示配置，不会发送到虚构地址。
2. **GitHub 仓库名称**：默认 `/rysen-portfolio/`。Actions 自动根据仓库名设置 `VITE_BASE_PATH`；本地需要测试其他路径时自行设置此环境变量。
3. **网站域名**：Actions 根据 GitHub 用户和仓库名设置 `SITE_URL`，用于 canonical、hreflang 和 sitemap。绑定自定义域名后，请修改 workflow 中 `VITE_BASE_PATH: /` 和 `SITE_URL: https://你的域名/`，并在 GitHub Pages 设置中绑定域名。
4. **项目内容与展示授权**：项目文案为初始示例，发布前请核对实际功能、开发职责及可公开展示的内容。

## GitHub Pages 部署步骤

1. 在 GitHub 创建一个公开仓库，例如 `rysen-portfolio`。
2. 将本项目所有文件推送到 `main` 分支。**注意必须包含 `.github/workflows/deploy.yml`**。
3. 仓库进入 `Settings → Pages → Build and deployment`，将 Source 设置为 **GitHub Actions**。
4. 打开 `Actions`，等待 `Deploy RYSEN Portfolio` 构建完成。
5. 用户站点仓库名必须是 `用户名.github.io`，访问 `https://你的用户名.github.io/ko/`。只打开 `https://你的用户名.github.io/` 且仓库不是这个名字时，GitHub 会显示没有 Pages 站点。
6. 测试 `/en/`、`/zh/`、作品详情页、刷新及手机端显示。

每次推送到 `main`，GitHub Actions 会自动构建和发布。不要上传 `node_modules` 或 `dist`。

## 添加、替换项目截图

截图统一存放在：

```text
public/images/projects/
  ssuker/
    cover.webp
    home.webp
    mobile.webp
  rysen-works/
    cover.webp
    dashboard.webp
    inventory.webp
  massconnected/
    cover.webp
    homepage.webp
    blog.webp
```

**这些图片目前故意留空。** 页面会显示精美占位图，而不是损坏图片。

建议封面图 1600×1200 或 1600×900，单张 WebP 尽量压缩到 500KB 以下。上传文件时保持配置中的文件名一致；如果文件名不同，编辑 `src/data/projects.ts` 中对应项目的 `images` 数组。第一个文件为项目封面。图片上传后无需修改组件。

## 添加新作品

1. 在 `src/data/projects.ts` 的 `projects` 数组添加一项，设置唯一 `id`、类别、项目网址、图片文件名、标签。
2. 在 `src/locales/ko.json`、`en.json`、`zh.json` 的 `projects` 对象下添加同一 ID 的 `title`、`summary`、`background`、`solution`。
3. 将图片放入 `public/images/projects/你的项目ID/`。
4. **重要**：在 `scripts/prerender.mjs` 的项目 ID 数组添加新 ID，确保生成对应的 GitHub Pages 静态入口。
5. 提交 GitHub，等待自动部署。

## 国际化

- 默认韩语；支持英语、中文。
- 所有主要界面文案在 `src/locales/`。
- 切换语言保留当前路由，并通过 localStorage 保存偏好。
- 每个语言和详情页构建独立 HTML 入口，附带 canonical、hreflang、描述标签及 sitemap。

**SEO 限制**：这是 Vue SPA，构建生成的是可直达的 HTML 外壳和页面元数据，并非完整 SSR/SSG 内容预渲染。部分搜索引擎可能需要执行 JavaScript 才能读取正文。如果以后 SEO 是主要获客渠道，建议升级 Vite SSG 或 Nuxt 静态生成。

## 咨询功能

`ContactView.vue` 生成 `mailto:` 链接并打开用户本地邮件程序。此操作**不保证邮件发送成功**，也不会保存客户资料。必须先配置 `CONTACT_EMAIL`。如需网页内直接提交和自动通知，应后续接入 Formspree、Getform 等第三方表单服务，并补充隐私政策和防垃圾提交措施。

## 常见问题

- **部署后页面空白**：检查 `VITE_BASE_PATH` 是否与 GitHub 仓库名匹配。
- **刷新项目详情出现 404**：确认 Actions 已执行 `scripts/prerender.mjs`，并检查 `dist/ko/projects/项目ID/index.html`。
- **图片不显示**：检查 `public/images/projects/` 路径、文件名大小写及 WebP 格式。
- **联系按钮提示配置**：在 `src/data/site.ts` 设置真实邮箱。
- **绑定自定义域名后资源 404**：将 `VITE_BASE_PATH` 改为 `/` 并重新部署。

## 项目边界

本项目为可部署的纯前端商业作品集首版；不包含后台、数据库、线上收款、真实表单接收服务。图片与公司联系方式需要你自行补充。

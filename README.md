# ShellVault

面向 Linux 初学者、开发者与部署实践的交互式学习网站。目标不是堆砌命令，而是帮助使用者从第一次进入终端，逐步完成项目部署、服务管理和故障排查。

## 在线功能

- 7 阶段 Linux 学习路线与浏览器本地进度
- 90+ 常用命令，按目录、文件、文本、权限、进程、网络等主题分类
- 命令全文搜索、难度筛选、收藏和一键复制
- 首次登录、静态网页、Node.js、FastAPI、Spring Boot、Nginx、Docker Compose、PostgreSQL 备份恢复等部署流程
- 安全的浏览器模拟终端
- Linux 基础知识自测
- 深色 / 浅色主题与响应式界面
- 无框架、无构建依赖，可直接静态部署

## 本地运行

```bash
# 方法一：Python
python3 -m http.server 8080

# 方法二：Node.js
npx serve .
```

打开 `http://localhost:8080`。

也可以直接双击 `index.html`，但使用本地 HTTP 服务更接近真实部署环境。

## 项目结构

```text
ShellVault/
├── index.html              # 页面结构
├── styles.css              # 设计系统与响应式布局
├── commands.js             # 命令、路线、部署场景与测验数据
├── app.js                  # 搜索、收藏、进度、终端模拟等交互
├── favicon.svg
├── manifest.webmanifest
├── netlify.toml
└── README.md
```

## Netlify 部署

项目是纯静态站点，发布目录为仓库根目录：

```toml
[build]
  publish = "."
```

连接 GitHub 仓库后，Netlify 可以在每次推送到默认分支时自动发布。

## 内容使用原则

- 不理解的命令不要直接在生产服务器执行。
- 对 `sudo`、`rm`、`chmod`、`chown`、`rsync --delete`、防火墙和数据库恢复操作保持谨慎。
- 修改前备份，发布前准备回滚，故障时先观察日志和状态。
- 不要把密码、Token、私钥或生产环境配置提交到 Git 仓库。

## License

[MIT](./LICENSE)

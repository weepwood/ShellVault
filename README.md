# ShellVault

面向 Linux 初学者、开发者与部署实践的交互式学习网站。目标不是堆砌命令，而是帮助使用者从第一次进入终端，逐步完成项目部署、服务管理和故障排查。

## 主要内容

- 7 阶段 Linux 学习路线与浏览器本地进度
- 90+ 常用命令，覆盖目录、文件、文本、权限、进程、网络、软件包、磁盘、压缩、SSH、系统信息和 Shell
- 命令全文搜索、难度筛选、收藏和一键复制
- 首次登录、静态网站、Node.js、FastAPI、Spring Boot、Nginx、Docker Compose、PostgreSQL 备份恢复等部署流程
- 浏览器安全模拟终端与 Linux 基础自测
- 深色 / 浅色主题与移动端响应式布局

## 本地运行

仓库中的 `.bootstrap/part-*` 是完整项目源码的校验归档。根目录网页入口可以直接载入它，也可以执行脚本校验 SHA-256 并展开为普通源码文件：

```bash
git clone https://github.com/weepwood/ShellVault.git
cd ShellVault
bash scripts/extract-source.sh
python3 -m http.server 8080
```

然后打开 `http://localhost:8080`。

## 学习建议

1. 先完成终端、路径和文件操作，再学习权限、进程与网络。
2. 把每条命令放进真实任务中练习，不以记忆参数数量为目标。
3. 对 `sudo`、`rm`、`chmod`、`chown`、`rsync --delete`、防火墙和数据库恢复保持谨慎。
4. 修改生产环境前先备份、记录现状并准备回滚。
5. 故障排查遵循：服务状态 → 日志 → 监听端口 → 本机请求 → 反向代理 → 系统资源。

## 技术说明

项目是纯静态网站，不依赖后端、数据库或构建工具，可部署到 Netlify、GitHub Pages、Nginx 等静态托管平台。

## License

MIT

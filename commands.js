window.SHELLVAULT_DATA = {
  categories: [
    ["navigation", "目录导航"], ["files", "文件操作"], ["text", "文本处理"], ["permissions", "用户权限"],
    ["process", "进程服务"], ["network", "网络诊断"], ["package", "软件安装"], ["archive", "压缩传输"],
    ["disk", "磁盘资源"], ["dev", "开发工具"], ["security", "安全防火墙"], ["system", "系统信息"]
  ],
  roadmap: [
    { title: "终端与目录", desc: "先理解提示符、路径、当前目录和帮助系统。", items: ["pwd / ls / cd", "绝对与相对路径", "man / --help"] },
    { title: "文件与文本", desc: "创建、复制、移动、查看文件，并用管道组合命令。", items: ["touch / cp / mv / rm", "cat / less / tail", "grep / sort / wc"] },
    { title: "用户与权限", desc: "理解 root、sudo、用户组和 rwx 权限模型。", items: ["id / whoami", "chmod / chown", "sudo 最小权限"] },
    { title: "进程与服务", desc: "定位进程、查看资源、管理 systemd 服务。", items: ["ps / top / kill", "systemctl", "journalctl"] },
    { title: "网络与端口", desc: "理解 IP、DNS、端口、HTTP 和网络路径。", items: ["ip / ss", "ping / curl", "dig / traceroute"] },
    { title: "安装与部署", desc: "安装运行环境，配置应用服务和反向代理。", items: ["apt / dnf", "Git 拉取代码", "Nginx + systemd"] },
    { title: "排障与运维", desc: "根据日志和指标定位问题，建立备份与回滚意识。", items: ["df / free", "日志排查", "备份与恢复"] }
  ],
  commands: [
    {c:"navigation", n:"pwd", t:"显示当前目录", d:"打印当前工作目录的绝对路径。", s:"pwd", e:"pwd", l:"入门", r:"safe", tags:["路径","定位"]},
    {c:"navigation", n:"ls", t:"列出目录内容", d:"查看文件和目录；常用 -l 详情、-a 隐藏文件、-h 易读大小。", s:"ls [选项] [路径]", e:"ls -lah /var/log", l:"入门", r:"safe", tags:["目录","文件"]},
    {c:"navigation", n:"cd", t:"切换目录", d:"进入指定目录；~ 是家目录，.. 是上一级，- 返回上一次目录。", s:"cd [目录]", e:"cd /srv/my-app", l:"入门", r:"safe", tags:["路径","目录"]},
    {c:"navigation", n:"tree", t:"树状查看目录", d:"以层级结构展示目录，适合理解项目结构。通常需要单独安装。", s:"tree [选项] [路径]", e:"tree -L 2 -a", l:"常用", r:"safe", tags:["目录","结构"]},
    {c:"navigation", n:"find", t:"按条件查找文件", d:"可按名称、类型、大小、时间与权限查找，是服务器排查常用工具。", s:"find <路径> <条件>", e:"find /var/log -type f -name '*.log' -mtime -7", l:"常用", r:"safe", tags:["搜索","文件"]},
    {c:"navigation", n:"which", t:"定位可执行文件", d:"显示当前 PATH 中命令对应的可执行文件位置。", s:"which <命令>", e:"which python3", l:"入门", r:"safe", tags:["PATH","命令"]},
    {c:"navigation", n:"whereis", t:"查找程序相关路径", d:"查找程序二进制、源码和 man 手册位置。", s:"whereis <命令>", e:"whereis nginx", l:"常用", r:"safe", tags:["命令","路径"]},
    {c:"navigation", n:"man", t:"查看命令手册", d:"阅读命令的正式手册；按 / 搜索，n 下一个，q 退出。", s:"man <命令>", e:"man systemctl", l:"入门", r:"safe", tags:["帮助","手册"]},

    {c:"files", n:"touch", t:"创建空文件或更新时间", d:"文件不存在时创建；存在时更新访问与修改时间。", s:"touch <文件>", e:"touch .env.example", l:"入门", r:"safe", tags:["创建","文件"]},
    {c:"files", n:"mkdir", t:"创建目录", d:"使用 -p 可递归创建多级目录，并在目录已存在时不报错。", s:"mkdir [选项] <目录>", e:"mkdir -p /srv/my-app/releases", l:"入门", r:"safe", tags:["创建","目录"]},
    {c:"files", n:"cp", t:"复制文件或目录", d:"复制文件；复制目录需要 -r，保留属性常用 -a。", s:"cp [选项] <源> <目标>", e:"cp -a config config.backup", l:"入门", r:"caution", note:"覆盖同名文件前不会总是提示，可使用 -i 交互确认。", tags:["复制","备份"]},
    {c:"files", n:"mv", t:"移动或重命名", d:"同一文件系统内移动通常很快，也用于重命名文件。", s:"mv <源> <目标>", e:"mv app.jar app-previous.jar", l:"入门", r:"caution", note:"目标存在时可能被覆盖，重要文件先确认。", tags:["移动","重命名"]},
    {c:"files", n:"rm", t:"删除文件或目录", d:"删除文件；-r 递归目录，-f 强制。删除通常无法从回收站恢复。", s:"rm [选项] <路径>", e:"rm -i old-config.yml", l:"入门", r:"danger", note:"谨慎使用 rm -rf。先用 pwd 和 ls 确认路径，不要复制不理解的删除命令。", tags:["删除","风险"]},
    {c:"files", n:"ln", t:"创建链接", d:"-s 创建符号链接，常用于 current 指向当前发布版本。", s:"ln -s <目标> <链接名>", e:"ln -sfn /srv/app/releases/20260718 /srv/app/current", l:"进阶", r:"caution", tags:["软链接","发布"]},
    {c:"files", n:"file", t:"识别文件类型", d:"根据文件内容而不是扩展名判断类型。", s:"file <文件>", e:"file ./my-app", l:"常用", r:"safe", tags:["识别","二进制"]},
    {c:"files", n:"stat", t:"查看文件元数据", d:"显示大小、inode、权限、所有者和时间戳。", s:"stat <文件>", e:"stat /etc/nginx/nginx.conf", l:"常用", r:"safe", tags:["元数据","权限"]},

    {c:"text", n:"cat", t:"输出或拼接文件", d:"快速查看较短文本，也可合并多个文件到标准输出。", s:"cat <文件...>", e:"cat /etc/os-release", l:"入门", r:"safe", tags:["查看","文本"]},
    {c:"text", n:"less", t:"分页查看长文本", d:"适合查看大文件；支持搜索且不会一次性把整个文件铺满终端。", s:"less <文件>", e:"less /var/log/nginx/error.log", l:"入门", r:"safe", tags:["日志","查看"]},
    {c:"text", n:"head", t:"查看文件开头", d:"默认显示前 10 行，使用 -n 指定行数。", s:"head [-n 行数] <文件>", e:"head -n 30 application.log", l:"入门", r:"safe", tags:["文本","查看"]},
    {c:"text", n:"tail", t:"查看文件末尾与实时日志", d:"-f 持续跟踪追加内容，Ctrl+C 退出。", s:"tail [选项] <文件>", e:"tail -n 100 -f application.log", l:"入门", r:"safe", tags:["日志","实时"]},
    {c:"text", n:"grep", t:"按文本模式过滤", d:"在文件或管道结果中搜索；-i 忽略大小写，-r 递归，-n 显示行号。", s:"grep [选项] <模式> [文件]", e:"grep -Rni 'database' ./config", l:"常用", r:"safe", tags:["搜索","过滤"]},
    {c:"text", n:"sed", t:"流式替换与编辑", d:"对文本进行替换、删除和抽取；部署脚本中常用于修改配置。", s:"sed [选项] '表达式' <文件>", e:"sed -n '20,40p' nginx.conf", l:"进阶", r:"caution", note:"使用 -i 会直接修改文件，先不加 -i 预览或先备份。", tags:["替换","脚本"]},
    {c:"text", n:"awk", t:"按字段处理文本", d:"适合处理列式输出、日志和简单统计。", s:"awk '程序' [文件]", e:"awk '{print $1, $7}' access.log | sort | uniq -c", l:"进阶", r:"safe", tags:["字段","统计"]},
    {c:"text", n:"sort", t:"排序文本行", d:"支持数字、逆序和按字段排序，常与 uniq 配合。", s:"sort [选项] [文件]", e:"sort -nr usage.txt | head", l:"常用", r:"safe", tags:["排序","管道"]},
    {c:"text", n:"uniq", t:"去除或统计相邻重复行", d:"通常先 sort 再 uniq；-c 统计出现次数。", s:"uniq [选项]", e:"sort ip.txt | uniq -c | sort -nr", l:"常用", r:"safe", tags:["去重","统计"]},
    {c:"text", n:"wc", t:"统计行数、单词和字节", d:"-l 统计行数，常用于计算结果数量。", s:"wc [选项] [文件]", e:"find . -type f | wc -l", l:"入门", r:"safe", tags:["统计","管道"]},
    {c:"text", n:"cut", t:"按分隔符提取字段", d:"适合结构简单、分隔符稳定的文本。", s:"cut -d<分隔符> -f<字段>", e:"cut -d: -f1 /etc/passwd", l:"常用", r:"safe", tags:["字段","文本"]},
    {c:"text", n:"tee", t:"输出到屏幕并写入文件", d:"从标准输入读取，同时显示并保存；配合 sudo 写系统文件很实用。", s:"命令 | tee [选项] <文件>", e:"echo 'server_name example.com;' | sudo tee /tmp/site.conf", l:"常用", r:"caution", tags:["管道","写入"]},
    {c:"text", n:"xargs", t:"把输入转换为命令参数", d:"将管道传来的项目批量交给另一个命令。", s:"... | xargs <命令>", e:"find . -name '*.tmp' -print0 | xargs -0 rm -i", l:"进阶", r:"caution", note:"结合删除命令前先把 rm 替换成 echo 检查参数。", tags:["批处理","管道"]},

    {c:"permissions", n:"whoami", t:"查看当前用户名", d:"确认当前终端以哪个用户身份运行。", s:"whoami", e:"whoami", l:"入门", r:"safe", tags:["用户","身份"]},
    {c:"permissions", n:"id", t:"查看用户与组信息", d:"显示 UID、GID 及所属用户组。", s:"id [用户名]", e:"id www-data", l:"入门", r:"safe", tags:["用户","用户组"]},
    {c:"permissions", n:"sudo", t:"以提升权限执行命令", d:"按策略以其他用户（通常 root）执行单条命令。", s:"sudo <命令>", e:"sudo systemctl restart nginx", l:"入门", r:"caution", note:"sudo 不是“让命令一定成功”，不要给不理解的脚本 root 权限。", tags:["root","权限"]},
    {c:"permissions", n:"chmod", t:"修改文件权限", d:"改变读 r、写 w、执行 x 权限；可使用 755、640 等数字模式。", s:"chmod <模式> <文件>", e:"chmod 750 deploy.sh", l:"常用", r:"caution", note:"避免 chmod 777。权限过宽会扩大安全风险。", tags:["rwx","权限"]},
    {c:"permissions", n:"chown", t:"修改所有者和用户组", d:"常用于把部署目录交给应用用户。", s:"chown [选项] 用户:组 <路径>", e:"sudo chown -R deploy:deploy /srv/my-app", l:"常用", r:"caution", note:"递归修改系统目录前务必确认路径。", tags:["所有者","用户组"]},
    {c:"permissions", n:"umask", t:"查看或设置默认权限掩码", d:"影响新建文件和目录的默认权限。", s:"umask [掩码]", e:"umask 027", l:"进阶", r:"caution", tags:["默认权限","安全"]},
    {c:"permissions", n:"useradd / adduser", t:"创建系统用户", d:"为应用创建独立用户，减少服务被攻破后的影响范围。", s:"sudo adduser <用户名>", e:"sudo adduser --system --group myapp", l:"进阶", r:"caution", tags:["用户","服务"]},
    {c:"permissions", n:"passwd", t:"设置或修改密码", d:"修改当前用户或指定用户密码。", s:"passwd [用户名]", e:"sudo passwd deploy", l:"常用", r:"caution", tags:["密码","用户"]},

    {c:"process", n:"ps", t:"查看进程快照", d:"ps aux 显示系统进程，常与 grep 配合定位应用。", s:"ps [选项]", e:"ps aux | grep '[j]ava'", l:"入门", r:"safe", tags:["进程","排查"]},
    {c:"process", n:"top / htop", t:"实时查看系统资源", d:"查看 CPU、内存、负载与进程；htop 界面更友好，通常需安装。", s:"top", e:"top -o %MEM", l:"入门", r:"safe", tags:["CPU","内存"]},
    {c:"process", n:"pgrep", t:"按名称查找进程", d:"直接输出匹配进程 PID，可显示完整命令行。", s:"pgrep [选项] <模式>", e:"pgrep -af 'uvicorn|gunicorn'", l:"常用", r:"safe", tags:["PID","搜索"]},
    {c:"process", n:"kill", t:"向进程发送信号", d:"默认发送 TERM，让程序有机会清理退出；KILL 应作为最后手段。", s:"kill [-信号] <PID>", e:"kill -TERM 2481", l:"常用", r:"caution", note:"优先 TERM，确认无响应后再考虑 kill -KILL。", tags:["信号","停止"]},
    {c:"process", n:"pkill", t:"按名称向进程发送信号", d:"可快速停止匹配进程，但匹配范围比 PID 更容易误伤。", s:"pkill [选项] <模式>", e:"pkill -TERM -f 'my-app.jar'", l:"进阶", r:"danger", note:"先用 pgrep -af 检查匹配结果。", tags:["进程","停止"]},
    {c:"process", n:"systemctl", t:"管理 systemd 服务", d:"启动、停止、重启、查看状态和设置开机自启。", s:"systemctl <动作> <服务>", e:"sudo systemctl enable --now my-app", l:"常用", r:"caution", tags:["systemd","服务"]},
    {c:"process", n:"journalctl", t:"查看 systemd 日志", d:"按服务、时间和优先级查询日志；-f 实时跟踪。", s:"journalctl [选项]", e:"journalctl -u my-app --since '30 min ago' -f", l:"常用", r:"safe", tags:["日志","systemd"]},
    {c:"process", n:"nohup", t:"让命令退出终端后继续运行", d:"适合临时任务，不建议代替 systemd 管理正式服务。", s:"nohup <命令> >log 2>&1 &", e:"nohup python3 worker.py >worker.log 2>&1 &", l:"常用", r:"caution", tags:["后台","临时"]},
    {c:"process", n:"nice / renice", t:"调整进程调度优先级", d:"通过 nice 值影响 CPU 调度优先级，数值越大优先级越低。", s:"nice -n <值> <命令>", e:"nice -n 10 ./batch-job", l:"进阶", r:"caution", tags:["CPU","优先级"]},

    {c:"network", n:"ip", t:"查看和配置网络接口", d:"现代 Linux 网络工具，常用 addr、route、link 子命令。", s:"ip <对象> <动作>", e:"ip -br addr && ip route", l:"常用", r:"safe", tags:["IP","路由"]},
    {c:"network", n:"ss", t:"查看端口和连接", d:"查看监听端口、TCP/UDP 连接及对应进程。", s:"ss [选项]", e:"sudo ss -lntup", l:"常用", r:"safe", tags:["端口","监听"]},
    {c:"network", n:"ping", t:"测试网络可达性与延迟", d:"发送 ICMP 请求；被防火墙禁止时失败不代表 HTTP 一定不可达。", s:"ping [选项] <主机>", e:"ping -c 4 1.1.1.1", l:"入门", r:"safe", tags:["连通性","延迟"]},
    {c:"network", n:"curl", t:"发送 HTTP 请求与下载", d:"用于接口调试、健康检查、查看响应头和网络细节。", s:"curl [选项] <URL>", e:"curl -fsS http://127.0.0.1:8080/health", l:"常用", r:"safe", tags:["HTTP","接口"]},
    {c:"network", n:"wget", t:"下载文件或镜像网页", d:"擅长稳定下载、断点续传和递归抓取。", s:"wget [选项] <URL>", e:"wget -c https://example.com/app.tar.gz", l:"常用", r:"safe", tags:["下载","文件"]},
    {c:"network", n:"dig", t:"查询 DNS", d:"查看域名解析结果、指定 DNS 服务器和记录类型。", s:"dig [选项] <域名> [类型]", e:"dig +short example.com A", l:"常用", r:"safe", tags:["DNS","域名"]},
    {c:"network", n:"traceroute / tracepath", t:"追踪网络路径", d:"显示到目标主机经过的路由节点，帮助定位跨网络问题。", s:"tracepath <主机>", e:"tracepath example.com", l:"进阶", r:"safe", tags:["路由","网络"]},
    {c:"network", n:"nc", t:"测试 TCP/UDP 端口", d:"Netcat 可监听、连接和传输数据；常用于快速测试端口。", s:"nc [选项] <主机> <端口>", e:"nc -vz 127.0.0.1 5432", l:"常用", r:"caution", tags:["端口","TCP"]},
    {c:"network", n:"lsof", t:"查看进程打开的文件与端口", d:"在 Linux 中网络套接字也是文件，可按端口反查进程。", s:"lsof [选项]", e:"sudo lsof -iTCP:8080 -sTCP:LISTEN", l:"常用", r:"safe", tags:["端口","进程"]},
    {c:"network", n:"ssh", t:"安全远程登录", d:"通过加密连接远程服务器；推荐使用密钥并限制 root 登录。", s:"ssh [选项] 用户@主机", e:"ssh -i ~/.ssh/deploy_key deploy@server.example.com", l:"入门", r:"caution", tags:["远程","密钥"]},
    {c:"network", n:"scp", t:"通过 SSH 复制文件", d:"适合简单文件传输；大量或增量同步更推荐 rsync。", s:"scp [选项] <源> <目标>", e:"scp app.tar.gz deploy@server:/tmp/", l:"常用", r:"caution", tags:["传输","SSH"]},
    {c:"network", n:"rsync", t:"高效增量同步", d:"只传输变化部分，可保留权限，适合部署与备份。", s:"rsync [选项] <源> <目标>", e:"rsync -avz --delete dist/ deploy@server:/srv/site/", l:"进阶", r:"danger", note:"--delete 会删除目标端多余文件。先加 --dry-run 检查。", tags:["同步","部署"]},

    {c:"package", n:"apt", t:"Debian / Ubuntu 软件包管理", d:"更新索引、安装、升级和删除软件包。", s:"sudo apt <动作> [包名]", e:"sudo apt update && sudo apt install -y nginx", l:"入门", r:"caution", tags:["Ubuntu","安装"]},
    {c:"package", n:"dnf", t:"Fedora / RHEL 系软件包管理", d:"在 Fedora、Rocky Linux、AlmaLinux 等系统管理 RPM 软件包。", s:"sudo dnf <动作> [包名]", e:"sudo dnf install -y nginx", l:"常用", r:"caution", tags:["RHEL","安装"]},
    {c:"package", n:"dpkg", t:"管理本地 deb 软件包", d:"查询、安装和检查 Debian 软件包，依赖处理通常交给 apt。", s:"dpkg [选项]", e:"dpkg -l | grep nginx", l:"进阶", r:"caution", tags:["deb","软件包"]},
    {c:"package", n:"snap", t:"管理 Snap 应用", d:"安装自包含软件包；服务器部署前需考虑自动更新与磁盘占用。", s:"sudo snap <动作> <包>", e:"snap list", l:"进阶", r:"caution", tags:["软件包","Ubuntu"]},

    {c:"archive", n:"tar", t:"打包与解包", d:"常用 -c 创建、-x 解包、-z gzip、-J xz、-f 指定文件。", s:"tar [选项] <归档> [文件]", e:"tar -czf app-backup.tar.gz app/", l:"常用", r:"caution", tags:["压缩","备份"]},
    {c:"archive", n:"zip / unzip", t:"ZIP 压缩与解压", d:"跨平台常见格式；递归压缩目录使用 zip -r。", s:"zip -r <文件.zip> <目录>", e:"unzip release.zip -d release", l:"入门", r:"caution", tags:["压缩","跨平台"]},
    {c:"archive", n:"gzip / gunzip", t:"压缩单个文件", d:"gzip 默认替换原文件，可用 -k 保留原文件。", s:"gzip [选项] <文件>", e:"gzip -k access.log", l:"常用", r:"caution", tags:["压缩","日志"]},
    {c:"archive", n:"sha256sum", t:"计算文件校验值", d:"验证下载文件或发布产物是否完整、是否被篡改。", s:"sha256sum <文件>", e:"sha256sum app.tar.gz", l:"常用", r:"safe", tags:["校验","安全"]},

    {c:"disk", n:"df", t:"查看文件系统磁盘空间", d:"-h 使用易读单位，-i 查看 inode；磁盘未满但 inode 满也无法新建文件。", s:"df [选项]", e:"df -hT && df -ih", l:"入门", r:"safe", tags:["磁盘","inode"]},
    {c:"disk", n:"du", t:"统计目录和文件占用", d:"定位哪个目录占用磁盘，常配合 sort。", s:"du [选项] <路径>", e:"sudo du -xhd1 /var | sort -h", l:"常用", r:"safe", tags:["磁盘","目录"]},
    {c:"disk", n:"free", t:"查看内存与交换空间", d:"available 比 free 更能反映可供新进程使用的内存。", s:"free [选项]", e:"free -h", l:"入门", r:"safe", tags:["内存","swap"]},
    {c:"disk", n:"lsblk", t:"查看块设备", d:"显示磁盘、分区、挂载点和文件系统关系。", s:"lsblk [选项]", e:"lsblk -f", l:"常用", r:"safe", tags:["磁盘","分区"]},
    {c:"disk", n:"mount / umount", t:"挂载与卸载文件系统", d:"把设备或远程文件系统接入目录树。", s:"mount <设备> <目录>", e:"sudo mount /dev/sdb1 /mnt/data", l:"进阶", r:"danger", note:"卸载前确认没有进程占用；错误挂载配置可能影响开机。", tags:["挂载","磁盘"]},
    {c:"disk", n:"iostat", t:"查看磁盘 I/O 性能", d:"观察设备吞吐、等待时间和利用率，通常由 sysstat 提供。", s:"iostat [选项]", e:"iostat -xz 1", l:"进阶", r:"safe", tags:["IO","性能"]},

    {c:"dev", n:"git", t:"版本控制与代码同步", d:"拉取代码、创建分支、查看差异和发布版本。生产部署建议固定提交或标签。", s:"git <子命令>", e:"git pull --ff-only origin main", l:"常用", r:"caution", tags:["代码","部署"]},
    {c:"dev", n:"env / printenv", t:"查看环境变量", d:"排查 PATH、代理、数据库连接等环境配置。", s:"printenv [变量名]", e:"printenv PATH", l:"入门", r:"safe", tags:["环境变量","配置"]},
    {c:"dev", n:"export", t:"设置当前 Shell 环境变量", d:"仅对当前 Shell 及其子进程有效，持久化需写入配置文件或服务配置。", s:"export NAME=value", e:"export APP_ENV=production", l:"入门", r:"caution", tags:["环境变量","Shell"]},
    {c:"dev", n:"source", t:"在当前 Shell 加载脚本", d:"常用于重新加载配置或激活虚拟环境。", s:"source <文件>", e:"source .venv/bin/activate", l:"常用", r:"caution", note:"source 会在当前终端执行脚本，只加载可信文件。", tags:["Shell","配置"]},
    {c:"dev", n:"bash", t:"运行 Bash 脚本", d:"可执行脚本或进入新的 Bash；调试常用 -x。", s:"bash [选项] <脚本>", e:"bash -n deploy.sh && bash -x deploy.sh", l:"常用", r:"caution", tags:["脚本","调试"]},
    {c:"dev", n:"python3 -m venv", t:"创建 Python 虚拟环境", d:"隔离项目依赖，避免污染系统 Python。", s:"python3 -m venv <目录>", e:"python3 -m venv .venv", l:"常用", r:"safe", tags:["Python","依赖"]},
    {c:"dev", n:"npm / pnpm", t:"Node.js 依赖与脚本管理", d:"安装依赖、运行构建与启动脚本；CI 中优先使用锁文件对应的确定性安装。", s:"npm <命令>", e:"npm ci && npm run build", l:"常用", r:"caution", tags:["Node.js","构建"]},
    {c:"dev", n:"docker", t:"管理容器", d:"构建镜像、运行容器、查看日志和进入容器。", s:"docker <子命令>", e:"docker compose up -d --build", l:"进阶", r:"caution", tags:["容器","部署"]},

    {c:"security", n:"ufw", t:"简化防火墙管理", d:"Ubuntu 常用前端；放行 SSH 后再启用，避免把自己锁在服务器外。", s:"sudo ufw <动作>", e:"sudo ufw allow OpenSSH && sudo ufw enable", l:"常用", r:"danger", note:"远程服务器启用前先放行当前 SSH 端口，并保留已有会话测试。", tags:["防火墙","Ubuntu"]},
    {c:"security", n:"firewall-cmd", t:"管理 firewalld", d:"RHEL 系常用防火墙命令，区分临时配置和永久配置。", s:"sudo firewall-cmd [选项]", e:"sudo firewall-cmd --permanent --add-service=http && sudo firewall-cmd --reload", l:"进阶", r:"danger", note:"修改远程访问规则前确认 SSH 仍被允许。", tags:["防火墙","RHEL"]},
    {c:"security", n:"ssh-keygen", t:"生成 SSH 密钥", d:"生成公私钥对，用于免密码登录和自动部署。", s:"ssh-keygen [选项]", e:"ssh-keygen -t ed25519 -C 'deploy-key'", l:"常用", r:"caution", note:"私钥不得上传到仓库或发送给他人。", tags:["SSH","密钥"]},
    {c:"security", n:"openssl", t:"证书与加密工具箱", d:"检查 TLS 证书、生成随机值和计算摘要。", s:"openssl <子命令>", e:"openssl s_client -connect example.com:443 -servername example.com", l:"进阶", r:"safe", tags:["TLS","证书"]},

    {c:"system", n:"uname", t:"查看内核与架构", d:"-a 输出完整信息，-m 查看 CPU 架构。", s:"uname [选项]", e:"uname -a && uname -m", l:"入门", r:"safe", tags:["内核","架构"]},
    {c:"system", n:"hostnamectl", t:"查看主机和系统信息", d:"显示主机名、操作系统、内核和虚拟化信息，也可设置主机名。", s:"hostnamectl [子命令]", e:"hostnamectl", l:"常用", r:"caution", tags:["主机名","系统"]},
    {c:"system", n:"uptime", t:"查看运行时间与负载", d:"显示系统运行时长和 1、5、15 分钟平均负载。", s:"uptime", e:"uptime", l:"入门", r:"safe", tags:["负载","运行时间"]},
    {c:"system", n:"date", t:"查看或格式化时间", d:"日志分析和脚本命名常用；修改时间应交给时间同步服务。", s:"date [格式]", e:"date '+%F %T %Z'", l:"入门", r:"safe", tags:["时间","脚本"]},
    {c:"system", n:"timedatectl", t:"查看时区与时间同步", d:"检查时区、NTP 状态并设置时区。", s:"timedatectl [子命令]", e:"timedatectl status", l:"常用", r:"caution", tags:["时区","NTP"]},
    {c:"system", n:"dmesg", t:"查看内核消息", d:"排查磁盘、网卡、驱动、OOM 和硬件异常。", s:"dmesg [选项]", e:"sudo dmesg -T | tail -n 80", l:"进阶", r:"safe", tags:["内核","硬件"]},
    {c:"system", n:"history", t:"查看 Shell 历史命令", d:"帮助复盘操作；注意历史中可能出现敏感参数。", s:"history [数量]", e:"history 30", l:"入门", r:"caution", note:"避免在命令行参数中直接写密码、Token 等敏感信息。", tags:["Shell","审计"]},
    {c:"system", n:"crontab", t:"配置周期任务", d:"为当前用户编辑定时任务；复杂服务更适合 systemd timer。", s:"crontab [选项]", e:"crontab -e", l:"进阶", r:"caution", note:"使用绝对路径并重定向日志，避免环境差异导致任务静默失败。", tags:["定时任务","自动化"]}
  ],
  recipes: [
    {id:"first-login", title:"首次登录服务器", summary:"建立普通用户、SSH 密钥、防火墙与基础工具。", prereq:["一台 Ubuntu / Debian 服务器","当前拥有可用的管理员登录方式"], note:"保持当前 SSH 会话不要关闭，另开新终端验证新用户能正常登录后，再调整 root 登录策略。", steps:[
      ["更新系统索引","先获取最新软件包信息并安装安全更新。","sudo apt update\nsudo apt upgrade -y"],
      ["创建部署用户","应用和日常操作不应长期直接使用 root。","sudo adduser deploy\nsudo usermod -aG sudo deploy"],
      ["安装基础工具","准备 Git、网络、编辑器与进程观察工具。","sudo apt install -y git curl wget vim htop tree unzip ca-certificates"],
      ["配置 SSH 密钥","在本机生成密钥后，把公钥复制到服务器。","ssh-keygen -t ed25519\nssh-copy-id deploy@SERVER_IP"],
      ["启用基础防火墙","先放行 SSH，再启用 UFW。","sudo ufw allow OpenSSH\nsudo ufw enable\nsudo ufw status verbose"]
    ]},
    {id:"static", title:"部署静态网页", summary:"构建前端、上传产物并由 Nginx 提供服务。", prereq:["已安装 Node.js 与 Nginx","域名已解析到服务器（可选）"], note:"不要把 node_modules 上传到服务器。静态项目通常只需部署构建产物，例如 dist/。", steps:[
      ["构建项目","使用锁文件保证依赖版本一致。","npm ci\nnpm run build"],
      ["创建站点目录","将目录所有权交给部署用户。","sudo mkdir -p /srv/www/my-site\nsudo chown -R $USER:$USER /srv/www/my-site"],
      ["同步构建产物","先 dry-run，再执行带 --delete 的同步。","rsync -av --dry-run --delete dist/ deploy@SERVER:/srv/www/my-site/\nrsync -av --delete dist/ deploy@SERVER:/srv/www/my-site/"],
      ["配置 Nginx","root 指向静态产物目录，SPA 需要回退到 index.html。","server {\n  listen 80;\n  server_name example.com;\n  root /srv/www/my-site;\n  index index.html;\n  location / { try_files $uri $uri/ /index.html; }\n}"],
      ["检查并重载","配置检测通过后再平滑重载。","sudo nginx -t\nsudo systemctl reload nginx\ncurl -I http://127.0.0.1"]
    ]},
    {id:"node", title:"部署 Node.js 服务", summary:"安装依赖、构建项目并交给 systemd 守护。", prereq:["服务器已安装合适版本的 Node.js","项目包含 package-lock.json"], note:"生产环境避免直接使用 npm run dev。应用应监听 127.0.0.1，由 Nginx 对外提供 HTTP/HTTPS。", steps:[
      ["拉取固定版本","可部署标签或确认后的提交，而不是盲目跟随分支。","cd /srv/my-node-app\ngit fetch --all --tags\ngit checkout v1.2.0"],
      ["安装与构建","使用 npm ci 严格按照锁文件安装。","npm ci --omit=dev\nnpm run build"],
      ["创建 systemd 服务","把 EnvironmentFile 放在仓库外，避免提交密钥。","sudo editor /etc/systemd/system/my-node-app.service\n# ExecStart=/usr/bin/node /srv/my-node-app/dist/server.js\n# User=deploy\n# EnvironmentFile=/etc/my-node-app.env"],
      ["启动并开机自启","修改 unit 文件后必须 daemon-reload。","sudo systemctl daemon-reload\nsudo systemctl enable --now my-node-app"],
      ["验证与查看日志","先测试本机端口，再接入 Nginx。","systemctl status my-node-app --no-pager\njournalctl -u my-node-app -n 100 --no-pager\ncurl -fsS http://127.0.0.1:3000/health"]
    ]},
    {id:"python", title:"部署 FastAPI / Python", summary:"使用虚拟环境、Gunicorn/Uvicorn 与 systemd。", prereq:["已安装 python3-venv 与构建依赖","项目有 requirements.txt 或 pyproject.toml"], note:"不要直接使用开发模式的 uvicorn --reload 运行生产服务。", steps:[
      ["创建虚拟环境","每个项目隔离 Python 依赖。","cd /srv/my-api\npython3 -m venv .venv\nsource .venv/bin/activate"],
      ["安装依赖","升级 pip 后按项目依赖文件安装。","python -m pip install --upgrade pip\npip install -r requirements.txt\npip install gunicorn uvicorn"],
      ["本机测试","确认导入路径与健康检查正常。",".venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000\ncurl http://127.0.0.1:8000/health"],
      ["配置 systemd","用 Gunicorn 管理多个 Uvicorn worker。","# ExecStart=/srv/my-api/.venv/bin/gunicorn app.main:app \\\n#   -k uvicorn.workers.UvicornWorker -w 2 -b 127.0.0.1:8000"],
      ["启动服务","检查状态和日志。","sudo systemctl daemon-reload\nsudo systemctl enable --now my-api\njournalctl -u my-api -n 100 --no-pager"]
    ]},
    {id:"java", title:"部署 Spring Boot", summary:"发布 JAR、配置 Java 参数并由 systemd 管理。", prereq:["已安装项目要求的 JDK","已经生成可运行 JAR"], note:"内存参数要结合服务器容量设置，并为系统、Nginx、数据库等保留空间。", steps:[
      ["检查 Java 环境","确认架构和版本符合项目要求。","java -version\nuname -m"],
      ["准备发布目录","保留 releases，使用软链接快速切换版本。","mkdir -p /srv/my-app/releases/20260718\ncp my-app.jar /srv/my-app/releases/20260718/\nln -sfn /srv/my-app/releases/20260718 /srv/my-app/current"],
      ["配置服务","以普通用户运行，并配置重启策略。","# ExecStart=/usr/bin/java -Xms256m -Xmx1024m -jar /srv/my-app/current/my-app.jar\n# User=deploy\n# Restart=on-failure"],
      ["启动并检查","观察日志，确认端口监听。","sudo systemctl daemon-reload\nsudo systemctl restart my-app\njournalctl -u my-app -f"],
      ["回滚版本","切换软链接并重启即可回滚。","ln -sfn /srv/my-app/releases/PREVIOUS /srv/my-app/current\nsudo systemctl restart my-app"]
    ]},
    {id:"nginx", title:"Nginx 反向代理", summary:"把公网请求转发到本机应用，并保留必要请求头。", prereq:["应用已在 127.0.0.1:8080 正常运行","已安装 Nginx"], note:"先用 curl 测试上游服务，再排查 Nginx。502 通常表示 Nginx 无法连接上游或上游提前断开。", steps:[
      ["验证上游服务","绕过 Nginx 直接访问应用。","curl -v http://127.0.0.1:8080/health\nss -lntp | grep ':8080'"],
      ["创建站点配置","把请求转发到本机应用。","location / {\n  proxy_pass http://127.0.0.1:8080;\n  proxy_set_header Host $host;\n  proxy_set_header X-Real-IP $remote_addr;\n  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n  proxy_set_header X-Forwarded-Proto $scheme;\n}"],
      ["启用站点","Debian/Ubuntu 常用 sites-available 与 sites-enabled。","sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/my-app"],
      ["验证配置","只在语法检测成功后重载。","sudo nginx -t\nsudo systemctl reload nginx"],
      ["查看错误日志","根据请求时间定位错误。","sudo tail -n 100 -f /var/log/nginx/error.log"]
    ]},
    {id:"docker", title:"Docker Compose 部署", summary:"使用 Compose 管理应用与依赖服务。", prereq:["已安装 Docker Engine 与 Compose 插件","项目包含 compose.yaml"], note:"不要把数据库密码直接硬编码进 compose.yaml。使用 .env、Docker secrets 或平台密钥管理。", steps:[
      ["检查配置","解析并验证最终 Compose 配置。","docker compose config"],
      ["拉取或构建镜像","明确镜像标签，避免生产长期使用 latest。","docker compose pull\ndocker compose build --pull"],
      ["启动服务","后台启动并移除已不在配置中的旧容器。","docker compose up -d --remove-orphans"],
      ["查看状态与日志","确认容器健康状态和启动错误。","docker compose ps\ndocker compose logs --tail=100 -f"],
      ["更新与回滚","保留旧标签，切换镜像版本后重新启动。","docker compose pull\ndocker compose up -d\n# 回滚时恢复旧 IMAGE_TAG 后再次 up -d"]
    ]},
    {id:"backup", title:"PostgreSQL 备份恢复", summary:"建立可验证的逻辑备份与恢复流程。", prereq:["拥有数据库连接权限","磁盘空间足够且备份目录权限正确"], note:"只有实际做过恢复演练的备份才可信。恢复操作应先在测试库验证，避免覆盖生产数据。", steps:[
      ["创建自定义格式备份","自定义格式支持选择性恢复和并行恢复。","pg_dump -Fc -h 127.0.0.1 -U app_user -d app_db -f app_db_$(date +%F).dump"],
      ["校验备份文件","查看备份目录并计算哈希。","pg_restore -l app_db_2026-07-18.dump | head\nsha256sum app_db_2026-07-18.dump"],
      ["创建测试恢复库","不要直接覆盖生产库。","createdb -h 127.0.0.1 -U postgres app_db_restore_test"],
      ["执行恢复","并行度依据 CPU 和磁盘能力调整。","pg_restore -h 127.0.0.1 -U postgres -d app_db_restore_test -j 4 app_db_2026-07-18.dump"],
      ["验证结果","检查表、关键记录数和应用查询。","psql -h 127.0.0.1 -U postgres -d app_db_restore_test -c '\\dt'\npsql -h 127.0.0.1 -U postgres -d app_db_restore_test -c 'SELECT count(*) FROM important_table;' "]
    ]}
  ],
  quiz: [
    {q:"需要实时跟踪 systemd 服务 my-app 的日志，最合适的是？", o:["cat /var/log/my-app","journalctl -u my-app -f","ps aux -f","systemctl enable my-app"], a:1, x:"journalctl -u 指定服务，-f 持续跟踪新日志。"},
    {q:"服务器网页打不开，哪一个排查顺序更合理？", o:["先重装系统","先检查服务、日志、端口，再检查代理和防火墙","反复重启 Nginx","直接关闭全部防火墙"], a:1, x:"分层排查能快速缩小范围，也避免制造新问题。"},
    {q:"chmod 755 deploy.sh 中，755 表示什么？", o:["所有人都有写权限","所有者 rwx，组和其他用户 r-x","文件大小 755 字节","以 root 身份执行"], a:1, x:"7=rwx，5=r-x；分别对应所有者、用户组、其他用户。"},
    {q:"哪条命令能查看当前监听的 TCP 端口及对应进程？", o:["df -h","ss -lntp","free -h","ls -lah"], a:1, x:"ss -lntp：监听、数字端口、TCP、进程。"},
    {q:"为什么生产服务更适合 systemd，而不是 nohup？", o:["systemd 可以统一启动、重启、开机自启和日志管理","nohup 不支持任何程序","systemd 会自动修复代码 Bug","nohup 只能由 root 使用"], a:0, x:"systemd 提供生命周期、重启策略、权限和日志等服务管理能力。"},
    {q:"使用 rsync --delete 前最重要的操作是什么？", o:["先清空目标目录","使用 --dry-run 检查将要发生的变化","先执行 rm -rf","关闭 SSH"], a:1, x:"--delete 会删除目标端多余文件，dry-run 能提前发现路径或参数错误。"},
    {q:"free -h 中更值得关注的可用内存字段通常是？", o:["used","available","shared","total"], a:1, x:"Linux 会利用空闲内存做缓存，available 更接近新进程可使用的内存。"},
    {q:"Nginx 返回 502 时，第一步更应该检查什么？", o:["更换域名","直接重装 Nginx","上游应用是否运行并监听 proxy_pass 对应地址","删除全部日志"], a:2, x:"502 常见原因是上游服务未运行、端口错误、权限或连接提前关闭。"},
    {q:"下面哪种做法更符合最小权限原则？", o:["应用一直以 root 运行","给目录 chmod 777","为应用创建独立普通用户并只授予必要目录权限","把私钥放进 Git 仓库"], a:2, x:"独立用户能限制服务被攻破后的影响范围。"},
    {q:"备份是否可靠，最关键的验证是什么？", o:["文件名包含 backup","压缩包足够大","已经完成过恢复演练并验证数据","备份命令没有输出错误"], a:2, x:"能创建备份不代表能恢复；恢复演练才能验证链路、权限、版本和数据完整性。"}
  ]
};

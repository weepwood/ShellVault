(() => {
  const data = window.SHELLVAULT_DATA;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const storage = {
    get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  };

  let activeCategory = "all";
  let favorites = new Set(storage.get("sv-favorites", []));
  let roadmapDone = new Set(storage.get("sv-roadmap", []));
  let activeRecipe = data.recipes[0].id;
  let quizIndex = 0, quizScore = 0, quizLocked = false;

  const toast = (text) => {
    const el = $("#toast"); el.textContent = text; el.classList.add("show");
    clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 1300);
  };
  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); toast("已复制到剪贴板"); }
    catch { const t = document.createElement("textarea"); t.value = text; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); toast("已复制到剪贴板"); }
  };
  const escapeHtml = (s) => String(s).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));

  function initTheme() {
    const saved = storage.get("sv-theme", null);
    const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    $("#themeToggle").textContent = theme === "dark" ? "☀" : "☾";
    $("#themeToggle").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next; storage.set("sv-theme", next);
      $("#themeToggle").textContent = next === "dark" ? "☀" : "☾";
    });
  }

  function renderRoadmap() {
    $("#roadmapGrid").innerHTML = data.roadmap.map((item, index) => `
      <article class="roadmap-card ${roadmapDone.has(index) ? "done" : ""}" data-step="${index}" tabindex="0" role="checkbox" aria-checked="${roadmapDone.has(index)}">
        <span class="step">STEP ${String(index + 1).padStart(2, "0")}</span><span class="checkmark">✓</span>
        <h3>${item.title}</h3><p>${item.desc}</p><ul>${item.items.map(x => `<li>· ${x}</li>`).join("")}</ul>
      </article>`).join("");
    const update = () => {
      const n = roadmapDone.size; $("#progressText").textContent = `${n} / ${data.roadmap.length}`;
      $("#progressBar").style.width = `${n / data.roadmap.length * 100}%`;
      storage.set("sv-roadmap", [...roadmapDone]);
    };
    $$(".roadmap-card").forEach(card => {
      const toggle = () => { const i = Number(card.dataset.step); roadmapDone.has(i) ? roadmapDone.delete(i) : roadmapDone.add(i); renderRoadmap(); };
      card.addEventListener("click", toggle); card.addEventListener("keydown", e => { if (["Enter", " "].includes(e.key)) { e.preventDefault(); toggle(); } });
    });
    update();
  }

  function renderCategories() {
    const counts = Object.fromEntries(data.categories.map(([id]) => [id, data.commands.filter(x => x.c === id).length]));
    $("#categoryList").innerHTML = `<button class="category-button active" data-category="all"><span>全部命令</span><b>${data.commands.length}</b></button>` +
      data.categories.map(([id, name]) => `<button class="category-button" data-category="${id}"><span>${name}</span><b>${counts[id]}</b></button>`).join("");
    $$(".category-button").forEach(btn => btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category; $$(".category-button").forEach(x => x.classList.toggle("active", x === btn)); renderCommands();
    }));
  }

  function renderCommands() {
    const query = $("#commandSearch").value.trim().toLowerCase();
    const level = $("#levelFilter").value; const onlyFav = $("#favoriteOnly").checked;
    const filtered = data.commands.filter(cmd => {
      const text = [cmd.n, cmd.t, cmd.d, cmd.s, cmd.e, ...cmd.tags].join(" ").toLowerCase();
      return (activeCategory === "all" || cmd.c === activeCategory) && (level === "all" || cmd.l === level) && (!onlyFav || favorites.has(cmd.n)) && (!query || text.includes(query));
    });
    $("#resultCount").textContent = `${filtered.length} 条结果`;
    $("#emptyState").hidden = filtered.length > 0;
    $("#commandGrid").innerHTML = filtered.map(cmd => `
      <article class="command-card" data-risk="${cmd.r}">
        <div class="command-card-head"><div><h3>${escapeHtml(cmd.t)}</h3><p class="summary">${escapeHtml(cmd.d)}</p></div>
        <button class="favorite-button ${favorites.has(cmd.n) ? "active" : ""}" data-fav="${escapeHtml(cmd.n)}" title="收藏">★</button></div>
        <code class="command-code" data-copy="${escapeHtml(cmd.n)}">$ ${escapeHtml(cmd.n)}<button class="copy-mini" type="button">复制</button></code>
        <div class="command-details">
          <div class="detail-row"><span>语法</span><code data-copy="${escapeHtml(cmd.s)}">${escapeHtml(cmd.s)}</code></div>
          <div class="detail-row"><span>示例</span><code data-copy="${escapeHtml(cmd.e)}">${escapeHtml(cmd.e)}</code></div>
        </div>
        ${cmd.note ? `<div class="risk-note">注意：${escapeHtml(cmd.note)}</div>` : ""}
        <div class="tags"><span class="tag">${cmd.l}</span>${cmd.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
      </article>`).join("");
    $$("[data-copy]", $("#commandGrid")).forEach(el => el.addEventListener("click", e => { e.stopPropagation(); copy(el.dataset.copy); }));
    $$("[data-fav]", $("#commandGrid")).forEach(btn => btn.addEventListener("click", () => {
      const key = btn.dataset.fav; favorites.has(key) ? favorites.delete(key) : favorites.add(key); storage.set("sv-favorites", [...favorites]); renderCommands();
    }));
  }

  function renderRecipeTabs() {
    $("#recipeTabs").innerHTML = data.recipes.map(r => `<button class="recipe-tab ${r.id === activeRecipe ? "active" : ""}" data-recipe="${r.id}" role="tab">${r.title}</button>`).join("");
    $$(".recipe-tab").forEach(btn => btn.addEventListener("click", () => { activeRecipe = btn.dataset.recipe; renderRecipeTabs(); renderRecipe(); }));
  }
  function renderRecipe() {
    const r = data.recipes.find(x => x.id === activeRecipe);
    $("#recipeView").innerHTML = `<div class="recipe-info"><span class="eyebrow">${r.steps.length} steps</span><h3>${r.title}</h3><p>${r.summary}</p><strong>开始前确认</strong><ul>${r.prereq.map(x => `<li>${x}</li>`).join("")}</ul><div class="recipe-note">${r.note}</div></div>
      <div class="recipe-steps">${r.steps.map((s, i) => `<section class="recipe-step"><header><h4>${s[0]}</h4><span>${String(i + 1).padStart(2,"0")}</span></header><p>${s[1]}</p><pre class="recipe-code" data-copy="${escapeHtml(s[2])}">${escapeHtml(s[2])}<button class="copy-mini" type="button">复制</button></pre></section>`).join("")}</div>`;
    $$("[data-copy]", $("#recipeView")).forEach(el => el.addEventListener("click", () => copy(el.dataset.copy)));
  }

  const fs = {
    home: {
      type: "dir",
      children: {
        projects: {
          type: "dir",
          children: {
            shellvault: {
              type: "dir",
              children: {
                "README.md": { type: "file", content: "# ShellVault\nLinux learning project" },
                "deploy.sh": { type: "file", content: "#!/usr/bin/env bash\necho deploy" }
              }
            }
          }
        },
        notes: {
          type: "dir",
          children: {
            "linux.txt": { type: "file", content: "pwd ls cd cat grep systemctl" }
          }
        },
        ".profile": { type: "file", content: "export EDITOR=vim" }
      }
    }
  };
  let cwd = ["home"];
  const resolveNode = (parts) => parts.reduce((n, p) => n?.children?.[p], fs);
  const pathText = () => cwd.length === 1 ? "~" : `~/${cwd.slice(1).join("/")}`;
  function simPrint(text, cls="") { const p = document.createElement("p"); p.textContent = text; if(cls) p.className = cls; $("#simOutput").append(p); $("#simOutput").scrollTop = $("#simOutput").scrollHeight; }
  const challenges = [
    {title:"找到项目目录", text:"先查看当前目录内容，然后进入 projects 目录。", test:(cmd)=>cwd.join("/")==="home/projects"},
    {title:"进入 ShellVault", text:"进入 projects/shellvault，并查看里面有哪些文件。", test:(cmd)=>cwd.join("/")==="home/projects/shellvault" && cmd==="ls"},
    {title:"读取 README", text:"进入 ShellVault 项目并读取 README.md。", test:(cmd)=>cwd.join("/")==="home/projects/shellvault" && cmd.startsWith("cat README.md")},
    {title:"创建练习目录", text:"在当前目录创建名为 practice 的目录。", test:(cmd)=>cmd==="mkdir practice"},
    {title:"查看当前位置", text:"使用命令打印当前工作的绝对路径。", test:(cmd)=>cmd==="pwd"}
  ];
  let challengeIndex = 0;
  function setChallenge(i) { challengeIndex = i % challenges.length; const c = challenges[challengeIndex]; $("#challengeTitle").textContent=c.title; $("#challengeText").textContent=c.text; $("#challengeStatus").textContent="等待操作"; $("#challengeStatus").className="challenge-status"; }
  function runSim(input) {
    const args = input.trim().split(/\s+/); const cmd = args[0]; if(!cmd) return;
    simPrint(`${$("#simPrompt").textContent} ${input}`);
    const node = resolveNode(cwd);
    if(cmd === "help") simPrint("可用命令: pwd, ls, cd, cat, mkdir, touch, clear, whoami, help", "muted");
    else if(cmd === "pwd") simPrint("/" + cwd.join("/"));
    else if(cmd === "whoami") simPrint("student");
    else if(cmd === "clear") $("#simOutput").innerHTML="";
    else if(cmd === "ls") simPrint(Object.entries(node.children || {}).map(([n,v]) => v.type === "dir" ? `${n}/` : n).join("  "));
    else if(cmd === "cd") {
      const target=args[1] || "~"; let next;
      if(target === "~" || target === "/home") next=["home"];
      else if(target === "..") next=cwd.length>1?cwd.slice(0,-1):cwd;
      else if(target.startsWith("/")) next=target.split("/").filter(Boolean);
      else next=[...cwd,...target.split("/").filter(Boolean)];
      const targetNode=resolveNode(next); if(targetNode?.type === "dir") cwd=next; else simPrint(`cd: ${target}: 没有这个目录`, "error");
    } else if(cmd === "cat") {
      const f=node.children?.[args[1]]; if(f?.type === "file") simPrint(f.content); else simPrint(`cat: ${args[1]||""}: 没有这个文件`, "error");
    } else if(cmd === "mkdir") {
      if(!args[1]) simPrint("mkdir: 缺少目录名", "error"); else if(node.children[args[1]]) simPrint(`mkdir: ${args[1]}: 已存在`, "error"); else { node.children[args[1]]={type:"dir",children:{}}; }
    } else if(cmd === "touch") {
      if(!args[1]) simPrint("touch: 缺少文件名", "error"); else node.children[args[1]]={type:"file",content:""};
    } else simPrint(`${cmd}: command not found（输入 help 查看可用命令）`, "error");
    $("#simPrompt").textContent=`student@shellvault:${pathText()}$`;
    if(challenges[challengeIndex].test(input.trim())) { $("#challengeStatus").textContent="挑战完成 ✓"; $("#challengeStatus").classList.add("success"); }
  }

  function renderQuiz() {
    if(quizIndex >= data.quiz.length) {
      $("#quizCard").innerHTML=`<div class="quiz-score"><span class="eyebrow">完成</span><strong>${quizScore} / ${data.quiz.length}</strong><p>${quizScore >= 8 ? "已经掌握了基础部署与排障思路。" : "建议回到命令库和部署场景，再完成一次练习。"}</p><button class="button button-primary" id="restartQuiz">重新测试</button></div>`;
      $("#restartQuiz").addEventListener("click",()=>{quizIndex=0;quizScore=0;quizLocked=false;renderQuiz();}); return;
    }
    const q=data.quiz[quizIndex];
    $("#quizCard").innerHTML=`<div class="quiz-progress">问题 ${quizIndex+1} / ${data.quiz.length} · 当前得分 ${quizScore}</div><div class="quiz-question">${q.q}</div><div class="quiz-options">${q.o.map((o,i)=>`<button class="quiz-option" data-option="${i}">${o}</button>`).join("")}</div><div class="quiz-explain" hidden></div><div class="quiz-actions"><span></span><button class="button button-secondary" id="nextQuiz" disabled>下一题</button></div>`;
    $$(".quiz-option").forEach(btn=>btn.addEventListener("click",()=>{
      if(quizLocked)return; quizLocked=true; const chosen=Number(btn.dataset.option); if(chosen===q.a)quizScore++;
      $$(".quiz-option").forEach((x,i)=>{if(i===q.a)x.classList.add("correct");else if(i===chosen)x.classList.add("wrong");x.disabled=true;});
      const ex=$(".quiz-explain"); ex.hidden=false; ex.textContent=q.x; $("#nextQuiz").disabled=false;
    }));
    $("#nextQuiz").addEventListener("click",()=>{quizIndex++;quizLocked=false;renderQuiz();});
  }

  function bindGlobal() {
    $("#commandSearch").addEventListener("input", renderCommands); $("#levelFilter").addEventListener("change", renderCommands); $("#favoriteOnly").addEventListener("change", renderCommands);
    $("#clearFilters").addEventListener("click",()=>{activeCategory="all";$("#commandSearch").value="";$("#levelFilter").value="all";$("#favoriteOnly").checked=false;renderCategories();renderCommands();});
    $("#resetProgress").addEventListener("click",()=>{roadmapDone.clear();renderRoadmap();toast("学习进度已重置");});
    document.addEventListener("keydown",e=>{if(e.key==="/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();$("#commandSearch").focus();location.hash="commands";}});
    $("#simForm").addEventListener("submit",e=>{e.preventDefault();const v=$("#simInput").value;$("#simInput").value="";runSim(v);});
    $("#nextChallenge").addEventListener("click",()=>setChallenge(challengeIndex+1));
  }

  $("#commandCount").textContent=data.commands.length;
  initTheme(); renderRoadmap(); renderCategories(); renderCommands(); renderRecipeTabs(); renderRecipe(); renderQuiz(); bindGlobal();
  simPrint("ShellVault 安全模拟终端。输入 help 查看可用命令。", "muted"); setChallenge(0);
})();

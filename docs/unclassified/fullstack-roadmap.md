# 🚀 全栈工程师学习路线图（详细版）

> 一份面向开发者的系统性学习指南，从零基础到独立开发完整 Web 应用。包含技术栈选择指南、每周学习计划、代码示例、阶段检查点、实战项目、面试准备和术语表。

---

## 目录

- [技术栈选择指南](#技术栈选择指南)
- [前置准备：开发环境搭建](#前置准备开发环境搭建)
- [第一阶段：前端基础（约 3-4 个月）](#第一阶段前端基础约-3-4-个月)
- [第二阶段：前端进阶（约 2-3 个月）](#第二阶段前端进阶约-2-3-个月)
- [第三阶段：后端开发（约 3-4 个月）](#第三阶段后端开发约-3-4-个月)
- [第四阶段：数据库（约 2-3 个月）](#第四阶段数据库约-2-3-个月)
- [第五阶段：DevOps 与部署（约 2 个月）](#第五阶段devops-与部署约-2-个月)
- [第六阶段：测试（约 1-2 个月）](#第六阶段测试约-1-2-个月)
- [第七阶段：安全基础（约 1 个月）](#第七阶段安全基础约-1-个月)
- [第八阶段：系统设计（约 2-3 个月）](#第八阶段系统设计约-2-3-个月)
- [补充章节 A：计算机基础](#补充章节-a计算机基础)
- [补充章节 B：综合实战项目](#补充章节-b综合实战项目)
- [补充章节 C：面试准备](#补充章节-c面试准备)
- [补充章节 D：职业发展路径](#补充章节-d职业发展路径)
- [补充章节 E：性能优化](#补充章节-e性能优化)
- [补充章节 F：常见踩坑与调试技巧](#补充章节-f常见踩坑与调试技巧)
- [补充章节 G：监控与可观测性](#补充章节-g监控与可观测性)
- [补充章节 H：项目架构模式与最佳实践](#补充章节-h项目架构模式与最佳实践)
- [补充章节 J：职业发展与软技能](#补充章节-j职业发展与软技能)
- [学习建议与方法论](#学习建议与方法论)
- [术语表](#术语表)

---

## 前置准备：开发环境搭建

> 在开始学习之前，先把开发工具链准备好。

### 必装工具

| 工具 | 用途 | 安装方式 |
|------|------|----------|
| **VS Code** | 代码编辑器 | [官网下载](https://code.visualstudio.com/) |
| **Node.js (LTS)** | JavaScript 运行时 | [官网下载](https://nodejs.org/) 或使用 nvm |
| **Git** | 版本控制 | [官网下载](https://git-scm.com/) |
| **Chrome** | 浏览器 + DevTools | [官网下载](https://www.google.com/chrome/) |
| **pnpm** | 包管理器 | `npm install -g pnpm` |
| **nvm (Windows: nvm-windows)** | Node.js 版本管理 | [nvm-windows](https://github.com/coreybutler/nvm-windows) |

### VS Code 必装插件

```
中文语言包（Chinese Language Pack）
ESLint
Prettier
GitLens
Auto Rename Tag
Bracket Pair Colorizer
Path Intellisense
Thunder Client（API 测试）
Error Lens
TODO Highlight
```

### VS Code 推荐配置（settings.json）

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

### Git 初始配置

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main
```

---

## 技术栈选择指南

> 在开始学习之前，了解各技术方向的特点，避免盲目选择。

### 前端框架选择决策树

```
你的项目需求是什么？
│
├─ 需要最大的就业市场和生态？
│  └─ ✅ React（全球使用最广、岗位最多、生态最丰富）
│
├─ 需要最快上手、中文文档友好？
│  └─ ✅ Vue 3（学习曲线平缓、中文社区活跃、国内企业常用）
│
├─ 需要企业级大型项目框架？
│  └─ ✅ Angular（内置完整方案、强类型、适合大团队协作）
│
└─ 不确定？
   └─ ✅ 先学 React（就业面最广），再了解 Vue（触类旁通）
```

### 后端框架选择决策树

```
你更熟悉什么语言？
│
├─ JavaScript/TypeScript（前端开发者首选）
│  ├─ 快速原型/小项目 → ✅ Express / Fastify / Hono
│  └─ 企业级/大项目   → ✅ NestJS（模块化、依赖注入、装饰器）
│
├─ Python（AI/ML 方向或快速原型）
│  └─ ✅ FastAPI（异步、自动文档、类型安全）
│
└─ Java（传统企业/大厂）
   └─ ✅ Spring Boot（行业标准、生态完善）
```

### 数据库选择指南

| 场景 | 推荐 | 原因 |
|------|------|------|
| 通用 Web 应用 | **PostgreSQL** | 功能最全、JSON 支持好、免费 |
| 快速原型/小项目 | **SQLite** | 零配置、嵌入式、无需服务 |
| 灵活 Schema/快速迭代 | **MongoDB** | 文档型、无需预定义表结构 |
| 缓存/会话/排行榜 | **Redis** | 内存级速度、丰富数据结构 |
| 全文搜索 | **Elasticsearch** | 专业搜索引擎、分词、聚合 |

### 学习路线推荐组合

| 组合 | 前端 | 后端 | 数据库 | 适合人群 |
|------|------|------|--------|----------|
| **经典全栈** | React | NestJS | PostgreSQL | 求职导向、企业开发 |
| **快速全栈** | Vue 3 | Express/Fastify | PostgreSQL | 独立开发者、快速出活 |
| **现代全栈** | Next.js (React) | Next.js API Routes | PostgreSQL | 全栈框架一体化 |
| **Python 全栈** | React | FastAPI | PostgreSQL | AI/ML 方向转型 |

---

## 第一阶段：前端基础（约 3-4 个月）

### 📅 每周学习计划

<details>
<summary><b>第 1-2 周：HTML 基础</b></summary>

**学习内容：**
- HTML 文档结构（`<!DOCTYPE html>`、`<html>`、`<head>`、`<body>`）
- 常用标签：标题（`h1-h6`）、段落（`p`）、链接（`a`）、图片（`img`）、列表（`ul/ol/li`）
- 表格（`table`、`tr`、`td`、`th`、`thead`、`tbody`）
- 表单（`form`、`input`、`select`、`textarea`、`button`）
- HTML5 语义化标签

**代码示例 - 语义化页面结构：**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="我的第一个网页">
  <title>我的作品集</title>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#home">首页</a></li>
        <li><a href="#about">关于</a></li>
        <li><a href="#projects">项目</a></li>
        <li><a href="#contact">联系</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="home">
      <h1>欢迎来到我的作品集</h1>
      <p>我是一名全栈开发学习者</p>
    </section>

    <section id="projects">
      <h2>我的项目</h2>
      <article>
        <h3>项目一：Todo 应用</h3>
        <p>使用原生 JavaScript 开发的任务管理应用</p>
        <a href="/projects/todo">查看详情 →</a>
      </article>
      <article>
        <h3>项目二：天气应用</h3>
        <p>调用公开 API 的天气查询工具</p>
        <a href="/projects/weather">查看详情 →</a>
      </article>
    </section>

    <aside>
      <h3>最新动态</h3>
      <p>正在学习 React 框架...</p>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 我的作品集. All rights reserved.</p>
    <address>
      联系邮箱：<a href="mailto:me@example.com">me@example.com</a>
    </address>
  </footer>
</body>
</html>
```

**练习任务：**
- [ ] 用纯 HTML 搭建一个个人简历页面
- [ ] 用 HTML 表单制作一个注册页面（包含邮箱、密码、年龄、性别选择等）
- [ ] 用表格展示一周课程表

</details>

<details>
<summary><b>第 3-5 周：CSS 基础到进阶</b></summary>

**学习内容：**
- CSS 引入方式（行内、内部、外部）
- 选择器优先级（`!important` > 内联 > ID > 类 > 标签 > 通配符）
- 盒模型深入理解
- Flexbox 完整掌握
- Grid 布局
- 响应式设计

**代码示例 - Flexbox 经典布局：**

```css
/* ===== Reset & Base ===== */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* ===== CSS 变量（主题系统） ===== */
:root {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --secondary: #10b981;
  --bg: #f8fafc;
  --surface: #ffffff;
  --text: #1e293b;
  --text-light: #64748b;
  --border: #e2e8f0;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --radius: 8px;
}

/* ===== Dashboard 布局（Grid + Flexbox） ===== */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  min-height: 100vh;
}

.dashboard__header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.dashboard__sidebar {
  grid-area: sidebar;
  background: var(--text);
  color: white;
  padding: 20px;
}

.dashboard__main {
  grid-area: main;
  padding: 24px;
  background: var(--bg);
}

/* ===== Card 组件 ===== */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card__body {
  padding: 16px;
}

.card__title {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.card__text {
  color: var(--text-light);
  font-size: 0.9rem;
}

/* ===== 响应式适配 ===== */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main";
  }

  .dashboard__sidebar {
    display: none; /* 移动端隐藏侧边栏，用汉堡菜单替代 */
  }

  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

**代码示例 - CSS 动画：**

```css
/* 淡入动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* 骨架屏加载动画 */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

/* 旋转加载器 */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**练习任务：**
- [ ] 仿写 Apple 产品着陆页（注重排版和间距）
- [ ] 实现一个完整的 Dashboard 布局（侧边栏 + 顶栏 + 卡片网格）
- [ ] 制作一个纯 CSS 加载动画合集（至少 5 种）
- [ ] 用 Grid 实现一个响应式照片墙

</details>

<details>
<summary><b>第 6-8 周：JavaScript 核心</b></summary>

**学习内容：**
- 变量、数据类型、运算符
- 函数（声明、表达式、箭头函数、闭包）
- 对象和数组方法
- 异步编程（Promise、async/await）
- DOM 操作

**代码示例 - 核心概念：**

```javascript
// ===== 1. 闭包与柯里化 =====
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// ===== 2. 高阶函数实战 =====
const users = [
  { name: 'Alice', age: 25, role: 'developer' },
  { name: 'Bob', age: 30, role: 'designer' },
  { name: 'Charlie', age: 35, role: 'developer' },
  { name: 'Diana', age: 28, role: 'manager' },
  { name: 'Eve', age: 22, role: 'developer' },
];

// 链式调用：找出所有开发者的名字并按年龄排序
const devNames = users
  .filter(user => user.role === 'developer')
  .sort((a, b) => a.age - b.age)
  .map(user => user.name);

console.log(devNames); // ['Eve', 'Alice', 'Charlie']

// 使用 reduce 计算平均年龄
const avgAge = users.reduce((sum, user) => sum + user.age, 0) / users.length;
console.log(`平均年龄: ${avgAge.toFixed(1)}`); // 平均年龄: 28.0

// ===== 3. Promise 并发控制 =====
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`重试第 ${i + 1} 次...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // 指数退避
    }
  }
}

// Promise.allSettled — 并发请求，不因单个失败而中断
async function fetchAllUsers(userIds) {
  const promises = userIds.map(id =>
    fetch(`/api/users/${id}`).then(res => res.json())
  );
  const results = await Promise.allSettled(promises);

  return results.map((result, index) => ({
    id: userIds[index],
    status: result.status,
    data: result.status === 'fulfilled' ? result.value : null,
    error: result.status === 'rejected' ? result.reason.message : null,
  }));
}

// ===== 4. 事件循环（Event Loop）理解 =====
console.log('1. 同步');                  // 同步

setTimeout(() => {
  console.log('2. 宏任务 (setTimeout)'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3. 微任务 (Promise)');    // 微任务
});

console.log('4. 同步');                  // 同步

// 输出顺序：1 → 4 → 3 → 2

// ===== 5. DOM 操作实战 =====
// 事件委托：只在父元素上监听一次事件
const todoList = document.getElementById('todo-list');
todoList.addEventListener('click', (event) => {
  const target = event.target;

  // 删除按钮
  if (target.matches('.delete-btn')) {
    target.closest('.todo-item').remove();
  }

  // 完成复选框
  if (target.matches('.toggle-checkbox')) {
    const item = target.closest('.todo-item');
    item.classList.toggle('completed');
  }
});

// 动态创建元素（防 XSS 封装）
function createElement(tag, attributes = {}, textContent = '') {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key.startsWith('on')) {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });

  if (textContent) {
    element.textContent = textContent; // 使用 textContent 防 XSS
  }

  return element;
}

// 使用示例
const card = createElement('div', { className: 'card' },
  createElement('h3', { className: 'card-title' }, '任务标题')
);
```

**代码示例 - 简易 Promise 实现：**

```javascript
class MiniPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.callbacks = [];

    const resolve = (value) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      this.callbacks.forEach(cb => cb.onFulfilled(value));
    };

    const reject = (reason) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.value = reason;
      this.callbacks.forEach(cb => cb.onRejected(reason));
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MiniPromise((resolve, reject) => {
      const handle = () => {
        try {
          if (this.state === 'fulfilled') {
            const result = onFulfilled ? onFulfilled(this.value) : this.value;
            resolve(result);
          } else if (this.state === 'rejected') {
            if (onRejected) {
              const result = onRejected(this.value);
              resolve(result);
            } else {
              reject(this.value);
            }
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === 'pending') {
        this.callbacks.push({ onFulfilled: handle, onRejected: handle });
      } else {
        handle();
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// 测试
const p = new MiniPromise((resolve) => {
  setTimeout(() => resolve('Hello!'), 1000);
});
p.then(val => console.log(val)); // "Hello!"
```

**练习任务：**
- [ ] Todo List 应用（增删改查 + localStorage 持久化 + 筛选/搜索）
- [ ] 天气查询应用（fetch API + 错误处理 + 加载状态）
- [ ] 实现防抖（debounce）和节流（throttle）函数
- [ ] 实现一个简易 EventEmitter 类

</details>

<details>
<summary><b>第 9-11 周：TypeScript</b></summary>

**学习内容：**
- 基础类型与类型推断
- 接口 vs 类型别名
- 泛型与工具类型
- 类型守卫

**代码示例 - TypeScript 核心特性：**

```typescript
// ===== 1. 高级类型技巧 =====

// 条件类型
type IsString<T> = T extends string ? true : false;
type A = IsString<'hello'>; // true
type B = IsString<42>;      // false

// 映射类型（手写 Partial / Required）
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type MyRequired<T> = {
  [K in keyof T]-?: T[K];  // -? 移除可选标记
};

// 模板字面量类型
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type APIEndpoint = `/api/${string}`;
type EventName = `on${Capitalize<'click' | 'hover' | 'focus'>}`;
// 结果: 'onClick' | 'onHover' | 'onFocus'

// ===== 2. 泛型实战 =====

// 类型安全的事件发布/订阅系统
type EventMap = {
  userLogin: { userId: string; timestamp: number };
  userLogout: { userId: string };
  pageView: { path: string; referrer?: string };
};

class TypedEventEmitter<Events extends Record<string, any>> {
  private listeners = new Map<string, Set<Function>>();

  on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): () => void {
    if (!this.listeners.has(event as string)) {
      this.listeners.set(event as string, new Set());
    }
    this.listeners.get(event as string)!.add(listener);

    // 返回取消订阅函数
    return () => {
      this.listeners.get(event as string)?.delete(listener);
    };
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    this.listeners.get(event as string)?.forEach(listener => {
      try {
        listener(payload);
      } catch (error) {
        console.error(`Event listener error for "${String(event)}":`, error);
      }
    });
  }
}

// 使用：完全类型安全
const emitter = new TypedEventEmitter<EventMap>();

const unsubscribe = emitter.on('userLogin', (data) => {
  console.log(data.userId);    // ✅ 自动推断类型
  console.log(data.timestamp); // ✅ 自动推断类型
});

emitter.emit('userLogin', {
  userId: '123',
  timestamp: Date.now(),  // ✅ 必须提供所有字段
});

// emitter.emit('userLogin', { userId: '123' }); // ❌ 编译报错：缺少 timestamp

// ===== 3. 类型安全的 API 客户端 =====

type APIResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
};

type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
};

// API 路由类型映射
type APIRoutes = {
  'GET /api/users': { response: APIResponse<User[]>; query: { page?: number; role?: string } };
  'GET /api/users/:id': { response: APIResponse<User>; params: { id: string } };
  'POST /api/users': { response: APIResponse<User>; body: Omit<User, 'id'> };
  'PUT /api/users/:id': { response: APIResponse<User>; params: { id: string }; body: Partial<User> };
  'DELETE /api/users/:id': { response: APIResponse<null>; params: { id: string } };
  'GET /api/posts': { response: APIResponse<Post[]>; query: { page?: number; authorId?: string } };
};

// ===== 4. 类型守卫与窄化 =====

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
  }
}

// 自定义类型守卫
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj &&
    'role' in obj
  );
}

function processInput(input: unknown) {
  if (isUser(input)) {
    console.log(input.name); // TypeScript 知道这里是 User 类型
  }
}
```

**练习任务：**
- [ ] 将之前的 Todo List 用 TypeScript 重写
- [ ] 实现类型安全的 EventEmitter
- [ ] 实现类型安全的表单验证器

</details>

<details>
<summary><b>第 12-14 周：CSS 工程化 + 综合练习</b></summary>

**学习内容：**
- Sass/Less 预处理器
- Tailwind CSS 原子化方案
- BEM 命名规范
- CSS Modules

**代码示例 - Tailwind CSS 实战：**

```html
<!-- 响应式导航栏 -->
<nav class="bg-white shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="text-xl font-bold text-indigo-600">MyApp</a>
      </div>

      <!-- 桌面端导航 -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="/dashboard" class="text-gray-700 hover:text-indigo-600 transition-colors">
          Dashboard
        </a>
        <a href="/projects" class="text-gray-700 hover:text-indigo-600 transition-colors">
          Projects
        </a>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg
                       hover:bg-indigo-700 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Sign In
        </button>
      </div>

      <!-- 移动端汉堡菜单 -->
      <div class="md:hidden flex items-center">
        <button class="text-gray-700" id="mobile-menu-btn">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>

<!-- 产品卡片 -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img src="/product.jpg" alt="产品图片" class="w-full h-48 object-cover"/>
    <div class="p-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-semibold text-gray-900">产品名称</h3>
        <span class="text-sm font-medium text-indigo-600">¥299</span>
      </div>
      <p class="text-sm text-gray-500 mb-4">产品描述信息...</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-1">
          <span class="text-yellow-400">★★★★</span><span class="text-gray-300">★</span>
          <span class="text-sm text-gray-500">(4.0)</span>
        </div>
        <button class="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full
                       hover:bg-indigo-100 transition-colors">
          加入购物车
        </button>
      </div>
    </div>
  </div>
</div>
```

**代码示例 - Sass 实战（BEM 命名）：**

```scss
// _variables.scss
$primary: #6366f1;
$primary-hover: #4f46e5;
$gray-100: #f3f4f6;
$gray-500: #6b7280;
$gray-900: #111827;
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$radius: 8px;
$transition: all 0.2s ease;

// _mixins.scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin responsive($breakpoint) {
  @if $breakpoint == sm { @media (min-width: 640px) { @content; } }
  @if $breakpoint == md { @media (min-width: 768px) { @content; } }
  @if $breakpoint == lg { @media (min-width: 1024px) { @content; } }
}

// _button.scss
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: $radius;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: $transition;

  &--primary {
    background: $primary;
    color: white;

    &:hover { background: $primary-hover; }
  }

  &--outline {
    background: transparent;
    border: 1px solid $primary;
    color: $primary;

    &:hover {
      background: $primary;
      color: white;
    }
  }

  &--sm { padding: 4px 12px; font-size: 12px; }
  &--lg { padding: 12px 24px; font-size: 16px; }

  &--icon {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
  }
}

// _card.scss
.card {
  background: white;
  border-radius: $radius;
  box-shadow: $shadow-sm;
  overflow: hidden;
  transition: $transition;

  &:hover {
    box-shadow: $shadow-md;
    transform: translateY(-2px);
  }

  &__header {
    padding: 16px;
    border-bottom: 1px solid $gray-100;
  }

  &__body {
    padding: 16px;
  }

  &__footer {
    padding: 12px 16px;
    background: $gray-100;
    @include flex-center;
    justify-content: flex-end;
    gap: 8px;
  }
}
```

**练习任务：**
- [ ] 用 Tailwind CSS 重构之前的 Dashboard 布局
- [ ] 用 Sass + BEM 实现一个组件库（按钮、卡片、表单、模态框）
- [ ] 完成一个完整的静态作品集网站（至少 5 个页面）

</details>

---

### 1.1 HTML / CSS

> **HTML 是网页的骨架，CSS 是网页的皮肤。** 没有它们，任何 Web 应用都无法存在。

| 主题 | 必须学的原因 | 实际工作中的作用 |
|------|-------------|-----------------|
| HTML5 语义化 | 让浏览器和搜索引擎理解页面结构 | SEO 排名、无障碍访问（屏幕阅读器）、代码可维护性 |
| 表单与验证 | 用户输入是一切交互的起点 | 注册/登录/搜索/下单，所有用户输入都靠表单 |
| CSS 选择器 + 优先级 | 不理解优先级就会出现"样式不生效"的 bug | 精确控制每个元素的样式，解决样式冲突 |
| 盒模型 | 所有元素的尺寸和间距都由盒模型决定 | 控制元素大小、间距、边框，理解 `border-box` 是必修课 |
| **Flexbox 布局** | 一维布局的终极方案，使用频率最高 | 导航栏、卡片列表、居中对齐、表单布局 |
| **Grid 布局** | 二维布局的终极方案 | Dashboard、仪表盘、复杂页面整体布局 |
| 响应式设计 | 现代应用必须适配手机/平板/桌面 | 一套代码适配所有设备，移动端流量占比超 60% |
| CSS 变量 | 实现主题切换（亮色/暗色）的最简方案 | 动态主题、品牌色管理、减少重复代码 |
| 动画与过渡 | 提升用户体验的关键手段 | 加载动画、页面切换、hover 效果、骨架屏 |

**推荐资源：**
- [MDN Web Docs](https://developer.mozilla.org/zh-CN/) — 权威参考文档
- [CSS-Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Kevin Powell YouTube 频道](https://www.youtube.com/kevinpowell) — CSS 专项教学
- [Every Layout](https://every-layout.dev/) — 布局模式
- 书籍：《CSS 权威指南》（第4版）

---

### 1.2 JavaScript 核心

> **JavaScript 是 Web 应用的大脑。** HTML/CSS 只是静态页面，JS 让页面"活"起来——响应点击、请求数据、动态更新。

| 主题 | 必须学的原因 | 实际工作中的作用 |
|------|-------------|-----------------|
| 基础语法 | 一切编程的起点 | 变量、条件、循环是所有逻辑的基础 |
| **闭包 + 高阶函数** | React Hooks、防抖节流、模块化的底层原理 | `useState` 就是闭包，`map/filter` 每天都用 |
| 对象与数组方法 | 数据处理的核心工具 | API 返回的数据都要用 `map/filter/reduce` 转换 |
| **异步编程（Promise/async）** | 所有 API 请求、文件操作都是异步的 | `fetch` 请求、数据库查询、定时任务都靠它 |
| **事件循环（Event Loop）** | 理解代码执行顺序，避免竞态条件 | 调试异步 bug、优化性能、理解宏任务/微任务 |
| DOM 操作 | 框架的底层就是 DOM 操作 | 虽然日常用框架，但理解 DOM 才能理解框架原理 |
| ES6+ 模块化 | 现代 JS 项目的标准组织方式 | `import/export` 是每个文件都在用的语法 |
| 错误处理 | 应用崩溃 = 用户流失 | `try-catch`、错误边界、全局错误上报 |
| **Web API（fetch/localStorage）** | 与浏览器交互的唯一途径 | 发请求、存数据、监听滚动、懒加载 |

**推荐资源：**
- [JavaScript.info](https://zh.javascript.info/) — 最佳现代 JS 教程
- [Eloquent JavaScript](https://eloquentjavascript.net/) — 免费在线书籍
- [You Don't Know JS 系列](https://github.com/getify/You-Dont-Know-JS) — 深入原理
- [MDN JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
- [33 JS Concepts](https://github.com/leonardomso/33-js-concepts) — 33 个核心概念

**常见面试题速查：**

```javascript
// Q1: 实现深拷贝（处理循环引用）
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (const key of Reflect.ownKeys(obj)) {
    clone[key] = deepClone(obj[key], map);
  }
  return clone;
}

// Q2: 手写 call / apply / bind
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx == null ? globalThis : Object(ctx);
  const key = Symbol();
  ctx[key] = this;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};

// Q3: 数组扁平化
function flatten(arr, depth = Infinity) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      acc.push(...flatten(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}
```

---

### 1.3 TypeScript

> **TypeScript = JavaScript + 类型系统。** 2024 年起，所有主流公司和开源项目都已全面采用 TS。不学 TS 就等于放弃 80% 的高质量工作机会。

| 主题 | 必须学的原因 | 实际工作中的作用 |
|------|-------------|-----------------|
| 基础类型 | TS 的入门门槛，也是类型安全的起点 | 定义变量、函数参数、API 返回值的类型 |
| **接口与类型别名** | 定义数据结构的标准方式 | 定义 API 请求/响应的结构、组件 props 类型 |
| **泛型** | 写可复用的类型安全代码 | 通用的列表组件、API 请求函数、工具函数 |
| 类型守卫 | 在运行时安全地判断类型 | 处理 `unknown` 类型的 API 响应、表单验证 |
| 内置工具类型 | 减少重复类型定义 | `Partial<User>`（更新时所有字段可选）、`Pick<User, 'name'>`（只取部分字段） |

**为什么不能跳过 TS：**
- React/Vue 官方文档全部用 TS 示例
- NestJS / Prisma / tRPC 等后端框架基于 TS 设计
- IDE 自动补全、重构、错误提示都依赖类型信息
- 团队协作时，类型就是最好的"活文档"

**推荐资源：**
- [TypeScript 官方手册](https://www.typescriptlang.org/zh/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Matt Pocock YouTube](https://www.youtube.com/@mattpocockuk) — TS 高级技巧
- [Total TypeScript](https://www.totaltypescript.com/) — 进阶课程

**TypeScript 配置模板（tsconfig.json）：**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

### ✅ 第一阶段完成检查

在进入下一阶段前，确认你已经掌握：

- [ ] 能手写符合语义标准的 HTML 页面，理解无障碍（a11y）基础
- [ ] 能用 Flexbox / Grid 实现任意复杂度的响应式布局
- [ ] 理解 JavaScript 闭包、原型链、事件循环、异步编程
- [ ] 能用 TypeScript 编写类型安全的代码，理解泛型和高级类型
- [ ] 独立完成过至少一个完整的静态/动态页面项目
- [ ] 熟练使用 Git 进行版本管理（commit / branch / merge）

> **自测方法：** 尝试不看教程，独立实现一个带搜索和筛选功能的 Todo List 应用（TypeScript + localStorage 持久化）。如果能在 2 小时内完成，说明基础已经扎实。

---

## 第二阶段：前端进阶（约 2-3 个月）

### 📅 每周学习计划

<details>
<summary><b>第 1-3 周：React / Vue 框架基础</b></summary>

**React 学习路径：**

1. JSX 与组件（函数组件为主）
2. `useState`、`useEffect`、`useRef`、`useMemo`、`useCallback`
3. 自定义 Hooks
4. Context API 与 `useReducer`
5. React Router（路由管理）
6. Server Components / Suspense（了解）

**代码示例 - React 组件与 Hooks：**

```tsx
// ===== 自定义 Hook：useLocalStorage =====
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}

// ===== 自定义 Hook：useDebounce =====
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ===== 自定义 Hook：useFetch =====
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ===== 搜索组件示例 =====
function SearchUsers() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { data: users, loading, error } = useFetch<User[]>(
    debouncedQuery ? `/api/users?search=${debouncedQuery}` : '/api/users'
  );

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索用户..."
        className="search-input"
      />

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}

      <ul className="user-list">
        {users?.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
```

**Vue 3 学习路径：**

1. 模板语法与指令（`v-if`、`v-for`、`v-model`）
2. Composition API（`ref`、`reactive`、`computed`、`watch`）
3. 组件通信（props、emit、provide/inject）
4. Vue Router
5. Pinia 状态管理
6. `<script setup>` 语法糖

**代码示例 - Vue 3 Composition API：**

```vue
<!-- SearchUsers.vue -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

const query = ref('')
const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const debouncedSearch = useDebounceFn(async (searchQuery: string) => {
  if (!searchQuery.trim()) {
    users.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch(`/api/users?search=${searchQuery}`)
    if (!response.ok) throw new Error('请求失败')
    users.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
  } finally {
    loading.value = false
  }
}, 300)

watch(query, debouncedSearch)

const resultCount = computed(() => users.value.length)
</script>

<template>
  <div class="search-container">
    <input
      v-model="query"
      type="text"
      placeholder="搜索用户..."
      class="search-input"
    />

    <p v-if="resultCount > 0" class="result-count">
      找到 {{ resultCount }} 个用户
    </p>

    <div v-if="loading" class="spinner" />

    <p v-if="error" class="error">{{ error }}</p>

    <ul class="user-list">
      <li v-for="user in users" :key="user.id" class="user-card">
        <img :src="user.avatar" :alt="user.name" class="avatar" />
        <div>
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
```

</details>

<details>
<summary><b>第 4-6 周：状态管理 + 路由</b></summary>

**代码示例 - Zustand（React 状态管理）：**

```typescript
// store/todoStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';

  // Actions
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: TodoStore['filter']) => void;

  // Derived state (computed)
  filteredTodos: () => Todo[];
  stats: () => { total: number; active: number; completed: number };
}

export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set, get) => ({
        todos: [],
        filter: 'all',

        addTodo: (text) =>
          set(
            (state) => ({
              todos: [
                ...state.todos,
                {
                  id: crypto.randomUUID(),
                  text,
                  completed: false,
                  createdAt: Date.now(),
                },
              ],
            }),
            false,
            'addTodo'
          ),

        toggleTodo: (id) =>
          set(
            (state) => ({
              todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
              ),
            }),
            false,
            'toggleTodo'
          ),

        deleteTodo: (id) =>
          set(
            (state) => ({
              todos: state.todos.filter((todo) => todo.id !== id),
            }),
            false,
            'deleteTodo'
          ),

        editTodo: (id, text) =>
          set(
            (state) => ({
              todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, text } : todo
              ),
            }),
            false,
            'editTodo'
          ),

        clearCompleted: () =>
          set(
            (state) => ({
              todos: state.todos.filter((todo) => !todo.completed),
            }),
            false,
            'clearCompleted'
          ),

        setFilter: (filter) => set({ filter }, false, 'setFilter'),

        filteredTodos: () => {
          const { todos, filter } = get();
          switch (filter) {
            case 'active': return todos.filter((t) => !t.completed);
            case 'completed': return todos.filter((t) => t.completed);
            default: return todos;
          }
        },

        stats: () => {
          const { todos } = get();
          return {
            total: todos.length,
            active: todos.filter((t) => !t.completed).length,
            completed: todos.filter((t) => t.completed).length,
          };
        },
      }),
      { name: 'todo-storage' }
    )
  )
);
```

**代码示例 - Pinia（Vue 状态管理）：**

```typescript
// stores/todoStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export const useTodoStore = defineStore('todo', () => {
  // State
  const todos = ref<Todo[]>([]);
  const filter = ref<'all' | 'active' | 'completed'>('all');

  // Getters (computed)
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active': return todos.value.filter((t) => !t.completed);
      case 'completed': return todos.value.filter((t) => t.completed);
      default: return todos.value;
    }
  });

  const stats = computed(() => ({
    total: todos.value.length,
    active: todos.value.filter((t) => !t.completed).length,
    completed: todos.value.filter((t) => t.completed).length,
  }));

  // Actions
  function addTodo(text: string) {
    todos.value.push({
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    });
  }

  function toggleTodo(id: string) {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  function deleteTodo(id: string) {
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  function clearCompleted() {
    todos.value = todos.value.filter((t) => !t.completed);
  }

  return {
    todos, filter,
    filteredTodos, stats,
    addTodo, toggleTodo, deleteTodo, clearCompleted,
  };
});
```

</details>

<details>
<summary><b>第 7-9 周：构建工具 + 样式工程化</b></summary>

**Vite 项目初始化：**

```bash
# React + TypeScript
pnpm create vite my-app --template react-ts

# Vue + TypeScript
pnpm create vite my-app --template vue-ts

# 安装常用依赖
pnpm add react-router-dom zustand axios
pnpm add -D tailwindcss @tailwindcss/vite eslint prettier
```

**Vite 配置模板：**

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
});
```

**ESLint + Prettier 配置：**

```javascript
// eslint.config.js (flat config)
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  { ignores: ['dist/'] }
);
```

</details>

---

### 2.1 前端框架（三选一深入）

> **不用框架 = 每次造轮子。** 框架帮你解决组件复用、状态管理、路由切换、性能优化等核心问题。

| 框架 | 必须学的原因 | 实际工作中的作用 |
|------|-------------|-----------------|
| **React** | 全球使用最广、岗位最多、生态最丰富 | 大厂首选、组件库最多（Ant Design / Shadcn）、Next.js 生态 |
| **Vue 3** | 学习曲线最平缓、中文社区最活跃 | 国内企业大量使用、Element Plus / Naive UI 成熟 |
| **Angular** | 内置完整方案（路由/表单/HTTP/测试） | 大型企业项目、团队协作规范最强 |

**推荐资源：**
- React：[React 官方文档](https://react.dev/)、[React 新文档](https://react.dev/)
- Vue：[Vue 3 官方文档](https://cn.vuejs.org/)、[Vue Mastery](https://www.vuemastery.com/)
- Angular：[Angular 官方教程](https://angular.dev/tutorials)

---

### 2.2 状态管理

> **为什么需要状态管理？** 当多个组件需要共享数据（用户登录态、购物车、主题设置），靠 props 传递会变成"prop drilling 地狱"。状态管理工具让任意组件都能直接访问共享数据。

| 工具 | 适用框架 | 必须学的原因 |
|------|----------|-------------|
| **Zustand** | React | 最轻量、API 最简洁、适合 90% 的项目，推荐首选 |
| Redux Toolkit | React | 生态最完整、DevTools 最强大、大厂标配 |
| **Pinia** | Vue | Vue 官方推荐、TypeScript 支持好、替代了 Vuex |
| Jotai / Recoil | React | 原子化状态，适合细粒度性能优化场景 |

---

### 2.3 样式方案与工程化

> **为什么需要工程化？** 手写 CSS 在小项目够用，但中大型项目会遇到样式冲突、难以维护、无法复用等问题。工程化工具帮你解决这些。

| 主题 | 工具/方案 | 必须学的原因 |
|------|-----------|-------------|
| **原子化 CSS** | Tailwind CSS / UnoCSS | 不用再起类名、不用切换文件写样式，开发效率提升 50%+，2024 年主流方案 |
| 组件库 | Ant Design / Element Plus / Shadcn/ui | 不用从零写表单/表格/弹窗，直接用成熟组件 |
| **构建工具** | Vite（首选） | 秒级启动、HMR 热更新，Webpack 已逐渐被替代 |
| 包管理 | pnpm（推荐） | 比 npm/yarn 更快、更省磁盘空间 |
| 代码规范 | ESLint + Prettier + Husky + lint-staged | 团队代码风格统一、提交前自动检查，避免低级 bug |

---

### 2.4 Next.js / Nuxt.js（全栈框架）

> 在掌握 SPA 开发后，学习全栈框架是衔接后端的关键一步。

| 框架 | 基于 | 特点 |
|------|------|------|
| **Next.js** | React | SSR/SSG/ISR、App Router、Server Actions、API Routes |
| **Nuxt.js** | Vue | SSR/SSG、自动路由、Server Routes、Nitro 引擎 |
| **Astro** | 多框架 | 内容优先、Islands 架构、零 JS 默认 |

**Next.js 核心概念：**

```
App Router 目录结构：
app/
├── layout.tsx          # 根布局
├── page.tsx            # 首页 (/)
├── loading.tsx         # 加载 UI
├── error.tsx           # 错误 UI
├── not-found.tsx       # 404 页面
├── globals.css         # 全局样式
├── (auth)/             # 路由组（不影响 URL）
│   ├── login/page.tsx  # /login
│   └── register/page.tsx # /register
├── dashboard/
│   ├── layout.tsx      # Dashboard 布局
│   ├── page.tsx        # /dashboard
│   └── settings/page.tsx # /dashboard/settings
├── blog/
│   ├── page.tsx        # /blog
│   └── [slug]/page.tsx # /blog/my-post (动态路由)
└── api/
    └── users/route.ts  # /api/users (API Route)
```

---

### ✅ 第二阶段完成检查

在进入下一阶段前，确认你已经掌握：

- [ ] 熟练使用 React 或 Vue 3 开发 SPA 应用
- [ ] 理解状态管理方案（Zustand / Pinia / Redux Toolkit）并能合理选型
- [ ] 掌握路由管理、代码分割、懒加载
- [ ] 能配置 Vite + ESLint + Prettier + TypeScript 完整工程化环境
- [ ] 了解 SSR / SSG 概念，能使用 Next.js 或 Nuxt.js 开发全栈应用
- [ ] 独立完成过至少一个使用框架的中型项目

> **自测方法：** 用 React/Vue + TypeScript + 状态管理 + 路由，实现一个带登录、列表、详情、搜索功能的 SPA 应用。如果能独立完成前后端联调，说明可以进入后端学习。

---

## 第三阶段：后端开发（约 3-4 个月）

### 📅 每周学习计划

<details>
<summary><b>第 1-2 周：Node.js 基础</b></summary>

**学习内容：**
- Node.js 模块系统（CommonJS vs ESM）
- 文件系统（`fs`）操作
- HTTP 服务器创建
- `Buffer`、`Stream`、`EventEmitter`

**代码示例 - 原生 HTTP 服务器：**

```typescript
// server.ts - 理解底层原理
import http from 'node:http';
import { URL } from 'node:url';

const server = http.createServer((req, res) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const method = req.method;

  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 简单路由
  if (method === 'GET' && url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }

  if (method === 'GET' && url.pathname === '/api/users') {
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: [],
      pagination: { page, limit, total: 0, totalPages: 0 }
    }));
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

</details>

<details>
<summary><b>第 3-5 周：Express / Fastify 框架</b></summary>

**代码示例 - Express 项目结构（TypeScript）：**

```typescript
// src/app.ts - 应用入口
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { userRouter } from './routes/user.routes';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

const app = express();

// ===== 全局中间件 =====
app.use(helmet());                    // 安全头
app.use(cors({ origin: '*' }));       // CORS
app.use(morgan('dev'));               // 请求日志
app.use(express.json());              // JSON 解析
app.use(express.urlencoded({ extended: true }));

// ===== 路由 =====
app.use('/api/v1/users', userRouter);

// ===== 健康检查 =====
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ===== 错误处理 =====
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

// ===== src/routes/user.routes.ts =====
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { authenticate } from '../middleware/auth';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

const router = Router();
const controller = new UserController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(createUserSchema), controller.create);
router.put('/:id', authenticate, validate(updateUserSchema), controller.update);
router.delete('/:id', authenticate, controller.delete);

export { router as userRouter };

// ===== src/controllers/user.controller.ts =====
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private userService = new UserService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = '1', limit = '10', search } = req.query;
      const result = await this.userService.findAll({
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        search: search as string,
      });
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, error: '用户不存在' });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

// ===== src/middleware/errorHandler.ts =====
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  console.error('Unexpected error:', err);
  res.status(500).json({
    success: false,
    error: '服务器内部错误',
  });
}

// ===== src/middleware/validate.ts =====
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: '参数验证失败',
        details: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
}

// ===== src/schemas/user.schema.ts =====
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, '名字至少 2 个字符').max(50),
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(8, '密码至少 8 位').regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    '密码必须包含大小写字母和数字'
  ),
  role: z.enum(['user', 'admin']).default('user'),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
```

</details>

<details>
<summary><b>第 6-8 周：NestJS（进阶框架）</b></summary>

**NestJS 核心概念：**
- 模块（Module）— 组织代码
- 控制器（Controller）— 处理请求
- 服务（Service）— 业务逻辑
- 守卫（Guard）— 认证/授权
- 拦截器（Interceptor）— 响应转换/日志
- 管道（Pipe）— 数据验证/转换

**代码示例 - NestJS 用户模块：**

```typescript
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

// src/users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, QueryUsersDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/v1/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: QueryUsersDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

// src/users/users.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, QueryUsersDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryUsersDto) {
    const { page = 1, limit = 10, search, role } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(role && { role }),
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: { id: true, name: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    if (!user) throw new NotFoundException('用户不存在');
    return user;
  }

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('邮箱已注册');

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    return this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id); // 确保存在

    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // 确保存在
    await this.prisma.user.delete({ where: { id } });
  }
}
```

</details>

---

### 3.1 运行时与语言（三选一深入）

> **为什么需要学后端？** 前端只能做展示，后端才能处理数据、存储、认证、支付等核心业务逻辑。全栈 = 前端 + 后端。

| 语言/运行时 | 框架 | 必须学的原因 |
|-------------|------|-------------|
| **Node.js (TypeScript)** | Express / Fastify / NestJS | 前后端同语言（学一门语言做两件事）、异步非阻塞性能好、NPM 生态最大 |
| Python | FastAPI / Django | 语法最简洁、AI/ML 生态最强、快速原型开发 |
| Java | Spring Boot | 企业级首选、强类型安全、大厂招聘量最大 |

---

### 3.2 RESTful API 设计

> **为什么必须学 REST？** 前后端分离架构下，API 是前后端的"合同"。设计不好 = 前后端扯皮不断。

| 原则 | 必须学的原因 | 说明 |
|------|-------------|------|
| 资源命名 | URL 就是你的 API 的"地址"，命名混乱会导致团队协作灾难 | 使用名词复数：`/api/users`、`/api/orders` |
| HTTP 方法 | 浏览器和所有 HTTP 客户端都基于这些方法工作 | `GET`（读取）、`POST`（创建）、`PUT`（全量更新）、`PATCH`（部分更新）、`DELETE`（删除） |
| 状态码 | 前端需要根据状态码做不同处理（401 跳登录、404 显示错误页） | `200` 成功、`201` 已创建、`400` 客户端错误、`401` 未授权、`403` 禁止、`404` 未找到、`500` 服务器错误 |
| 分页 | 列表数据不能一次全返回，否则页面卡死 | `GET /api/users?page=1&limit=20` |
| 版本控制 | API 升级时不能破坏旧版客户端 | URL 路径 `/api/v1/` 或 Header `Accept-Version` |

**标准响应格式：**

```typescript
// 成功响应
{
  "success": true,
  "data": { ... },
  "pagination": {           // 列表接口
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}

// 错误响应
{
  "success": false,
  "error": "参数验证失败",
  "details": {
    "email": ["邮箱格式不正确"],
    "password": ["密码至少 8 位"]
  }
}
```

---

### 3.3 GraphQL

> **GraphQL 不是必须学的，但了解它能帮你做出更好的技术选型。** 大部分项目用 REST 就够了。

| 主题 | 什么时候需要 |
|------|-------------|
| Schema 定义 | 当你的前端需要灵活查询（一个页面只需要部分字段） |
| 解析器 | 当你有复杂嵌套数据（用户→订单→商品→评论） |
| 客户端 | Apollo Client / URQL — 当 REST 的多次请求可以用 GraphQL 一次搞定 |
| 服务端 | Apollo Server / Mercurius — 当你提供 API 给多个不同客户端（Web/iOS/Android） |

**何时选择 GraphQL vs REST：**
- REST：简单 CRUD、微服务间通信、缓存友好
- GraphQL：复杂嵌套数据、移动端（减少请求次数）、前端驱动的数据需求

---

### 3.5 WebSocket 实时通信

**代码示例 - WebSocket 聊天服务：**

```typescript
// src/services/websocket.service.ts
import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { verifyToken } from './auth.service';

interface WSClient {
  ws: WebSocket;
  userId: string;
  username: string;
  rooms: Set<string>;
}

export class WebSocketService {
  private wss: WebSocketServer;
  private clients = new Map<WebSocket, WSClient>();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });
    this.setup();
  }

  private setup() {
    this.wss.on('connection', async (ws, req) => {
      try {
        // 从 URL 参数获取 token
        const url = new URL(req.url!, `http://${req.headers.host}`);
        const token = url.searchParams.get('token');

        if (!token) {
          ws.close(4001, '未提供认证 Token');
          return;
        }

        const payload = verifyToken(token);
        const client: WSClient = {
          ws,
          userId: payload.userId,
          username: payload.username,
          rooms: new Set(),
        };

        this.clients.set(ws, client);
        console.log(`用户 ${client.username} 已连接`);

        // 处理消息
        ws.on('message', (data) => {
          try {
            const message = JSON.parse(data.toString());
            this.handleMessage(client, message);
          } catch {
            ws.send(JSON.stringify({ type: 'error', message: '消息格式错误' }));
          }
        });

        // 处理断开
        ws.on('close', () => {
          this.clients.delete(ws);
          console.log(`用户 ${client.username} 已断开`);
        });

        // 发送连接成功消息
        ws.send(JSON.stringify({
          type: 'connected',
          data: { userId: client.userId, username: client.username },
        }));
      } catch {
        ws.close(4002, '认证失败');
      }
    });
  }

  private handleMessage(client: WSClient, message: { type: string; [key: string]: any }) {
    switch (message.type) {
      case 'join_room':
        client.rooms.add(message.roomId);
        this.broadcastToRoom(message.roomId, {
          type: 'user_joined',
          data: { userId: client.userId, username: client.username },
        }, client.ws);
        break;

      case 'leave_room':
        client.rooms.delete(message.roomId);
        this.broadcastToRoom(message.roomId, {
          type: 'user_left',
          data: { userId: client.userId, username: client.username },
        }, client.ws);
        break;

      case 'chat_message':
        this.broadcastToRoom(message.roomId, {
          type: 'chat_message',
          data: {
            userId: client.userId,
            username: client.username,
            content: message.content,
            timestamp: Date.now(),
          },
        });
        break;
    }
  }

  // 广播到房间
  private broadcastToRoom(roomId: string, message: object, exclude?: WebSocket) {
    const payload = JSON.stringify(message);
    this.clients.forEach((client) => {
      if (client.rooms.has(roomId) && client.ws !== exclude && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(payload);
      }
    });
  }

  // 向特定用户发送消息
  sendToUser(userId: string, message: object) {
    const payload = JSON.stringify(message);
    this.clients.forEach((client) => {
      if (client.userId === userId && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(payload);
      }
    });
  }
}
```

**前端 WebSocket 连接封装：**

```typescript
// src/hooks/useWebSocket.ts (React)
import { useEffect, useRef, useState, useCallback } from 'react';

interface WSMessage {
  type: string;
  data?: any;
}

export function useWebSocket(token: string) {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WSMessage[]>([]);

  useEffect(() => {
    const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws?token=${token}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => setIsConnected(true);
    ws.current.onclose = () => setIsConnected(false);

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    return () => {
      ws.current?.close();
    };
  }, [token]);

  const sendMessage = useCallback((message: object) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  return { isConnected, messages, sendMessage };
}
```

---

### 3.6 文件上传

**代码示例 - Multer 文件上传：**

```typescript
// src/middleware/upload.ts
import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';

// 本地存储配置
const localStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  },
});

// 文件过滤器
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('不支持的文件类型，仅允许 JPG/PNG/WebP/GIF'));
  }
};

export const upload = multer({
  storage: localStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5, // 最多 5 个文件
  },
});

// src/routes/upload.routes.ts
import { Router } from 'express';
import { upload } from '../middleware/upload';
import { authenticate } from '../middleware/auth';

const router = Router();

// 单文件上传
router.post('/single', authenticate, upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ success: false, error: '未上传文件' });
  }

  res.json({
    success: true,
    data: {
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `/uploads/${file.filename}`,
    },
  });
});

// 多文件上传
router.post('/multiple', authenticate, upload.array('files', 5), (req, res) => {
  const files = req.files as Express.Multer.File[];

  res.json({
    success: true,
    data: files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `/uploads/${file.filename}`,
    })),
  });
});

export { router as uploadRouter };
```

---

### 3.7 API 文档（Swagger/OpenAPI）

**代码示例 - 自动生成 API 文档：**

```typescript
// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '全栈应用 API',
      version: '1.0.0',
      description: '全栈学习项目的 API 文档',
      contact: {
        name: '开发者',
        email: 'dev@example.com',
      },
    },
    servers: [
      { url: 'http://localhost:8080', description: '开发环境' },
      { url: 'https://api.example.com', description: '生产环境' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['user', 'admin'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'], // 扫描路由文件中的注释
};

export const swaggerSpec = swaggerJsdoc(options);

// src/app.ts 中添加 Swagger UI
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// src/routes/user.routes.ts 中的 JSDoc 注释
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: 获取用户列表
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: 成功返回用户列表
 *   post:
 *     summary: 创建新用户
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, minLength: 2 }
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 8 }
 *     responses:
 *       201:
 *         description: 用户创建成功
 *       409:
 *         description: 邮箱已注册
 */
```

---

### 3.8 认证与授权

**代码示例 - JWT 认证流程：**

```typescript
// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaService } from './prisma.service';
import { AppError } from '../middleware/errorHandler';

export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(input: { name: string; email: string; password: string }) {
    // 检查邮箱是否已注册
    const existing = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw new AppError(409, '邮箱已注册');

    // 哈希密码
    const hashedPassword = await bcrypt.hash(input.password, 12);

    // 创建用户
    const user = await this.prisma.user.create({
      data: { ...input, password: hashedPassword },
    });

    // 生成 Token
    return this.generateTokens(user.id, user.role);
  }

  async login(input: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (!user) throw new AppError(401, '邮箱或密码错误');

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) throw new AppError(401, '邮箱或密码错误');

    return this.generateTokens(user.id, user.role);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JWTPayload;

      // 检查 refresh token 是否在黑名单
      const isBlacklisted = await this.prisma.tokenBlacklist.findUnique({
        where: { token: refreshToken },
      });
      if (isBlacklisted) throw new AppError(401, 'Token 已失效');

      return this.generateTokens(payload.userId, payload.role);
    } catch {
      throw new AppError(401, '无效的 Refresh Token');
    }
  }

  private generateTokens(userId: string, role: string) {
    const accessToken = jwt.sign(
      { userId, role },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }  // 短期
    );

    const refreshToken = jwt.sign(
      { userId, role },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }   // 长期
    );

    return { accessToken, refreshToken };
  }
}

// src/middleware/auth.ts - 认证中间件
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: '未提供认证 Token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, error: 'Token 已过期' });
    }
    return res.status(401).json({ success: false, error: '无效的 Token' });
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: '权限不足' });
    }
    next();
  };
}
```

---

### ✅ 第三阶段完成检查

在进入下一阶段前，确认你已经掌握：

- [ ] 理解 HTTP 协议、RESTful API 设计原则
- [ ] 能用 Express / NestJS 搭建完整的后端项目结构
- [ ] 掌握中间件模式、路由组织、错误处理、参数验证
- [ ] 理解 JWT 认证流程，能实现注册/登录/鉴权
- [ ] 了解 GraphQL 基本概念，能根据场景选择 REST 或 GraphQL
- [ ] 独立完成过至少一个包含认证的完整 CRUD API

> **自测方法：** 不看教程，独立搭建一个带 JWT 认证、角色权限、CRUD 操作的 RESTful API（Express 或 NestJS + Prisma）。如果能在 3 小时内完成，说明后端基础已经扎实。

---

## 第四阶段：数据库（约 2-3 个月）

### 📅 每周学习计划

<details>
<summary><b>第 1-3 周：SQL 基础与进阶</b></summary>

**SQL 核心语法速查：**

```sql
-- ===== 基础查询 =====
-- 查找活跃用户，按注册时间排序
SELECT id, name, email, created_at
FROM users
WHERE status = 'active'
  AND created_at >= '2024-01-01'
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;

-- ===== 聚合与分组 =====
-- 统计每个角色的用户数量
SELECT role, COUNT(*) as user_count, AVG(age) as avg_age
FROM users
GROUP BY role
HAVING COUNT(*) > 5
ORDER BY user_count DESC;

-- ===== JOIN 查询 =====
-- 查询用户及其订单信息
SELECT
  u.name,
  u.email,
  o.id as order_id,
  o.total_amount,
  o.status as order_status,
  o.created_at as order_date
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= '2024-01-01'
ORDER BY o.created_at DESC;

-- LEFT JOIN：查询所有用户，包括没有订单的
SELECT
  u.name,
  COUNT(o.id) as order_count,
  COALESCE(SUM(o.total_amount), 0) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;

-- ===== 子查询 =====
-- 查询消费金额高于平均值的用户
SELECT name, email
FROM users
WHERE id IN (
  SELECT user_id
  FROM orders
  GROUP BY user_id
  HAVING SUM(total_amount) > (
    SELECT AVG(total_amount) FROM orders
  )
);

-- ===== 窗口函数 =====
-- 按月统计销售额及同比增长率
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', created_at) as month,
    SUM(total_amount) as revenue
  FROM orders
  WHERE status = 'completed'
  GROUP BY DATE_TRUNC('month', created_at)
)
SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) as prev_month,
  ROUND(
    (revenue - LAG(revenue) OVER (ORDER BY month)) /
    NULLIF(LAG(revenue) OVER (ORDER BY month), 0) * 100,
    2
  ) as growth_rate_pct
FROM monthly_sales
ORDER BY month;

-- ===== 创建索引 =====
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id_created ON orders(user_id, created_at);
CREATE INDEX idx_products_category_price ON products(category, price);

-- ===== EXPLAIN 分析 =====
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 'xxx' AND status = 'pending';
```

</details>

<details>
<summary><b>第 4-6 周：数据库设计 + Prisma ORM</b></summary>

**数据库设计 - 电商系统 ER 图：**

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   users      │     │   orders     │     │ order_items  │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (PK)      │──┐  │ id (PK)      │──┐  │ id (PK)      │
│ name         │  │  │ user_id (FK) │←─┤  │ order_id (FK)│←─┘
│ email (UQ)   │  └─→│ total_amount │  │  │ product_id(FK)│──┐
│ password     │     │ status       │  │  │ quantity     │  │
│ role         │     │ address_id   │  │  │ unit_price   │  │
│ created_at   │     │ created_at   │  │  │ subtotal     │  │
│ updated_at   │     │ updated_at   │  │  └─────────────┘  │
└─────────────┘     └─────────────┘     ┌─────────────┐  │
                                         │  products     │  │
┌─────────────┐     ┌─────────────┐     ├─────────────┤  │
│  addresses   │     │  categories  │     │ id (PK)      │←─┘
├─────────────┤     ├─────────────┤     │ name         │
│ id (PK)      │     │ id (PK)      │     │ description  │
│ user_id (FK) │     │ name         │     │ price        │
│ street       │     │ slug (UQ)    │     │ stock        │
│ city         │     │ parent_id(FK)│     │ category_id  │
│ state        │     └─────────────┘     │ images       │
│ zip_code     │                          │ created_at   │
│ country      │     ┌─────────────┐     │ updated_at   │
│ is_default   │     │  reviews     │     └─────────────┘
└─────────────┘     ├─────────────┤
                     │ id (PK)      │
                     │ user_id (FK) │
                     │ product_id   │
                     │ rating (1-5) │
                     │ comment      │
                     │ created_at   │
                     └─────────────┘
```

**Prisma Schema 示例：**

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(USER)
  avatar    String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  orders    Order[]
  reviews   Review[]
  addresses Address[]

  @@map("users")
}

enum Role {
  USER
  ADMIN
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  stock       Int      @default(0)
  images      String[]
  categoryId  String   @map("category_id")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  category    Category @relation(fields: [categoryId], references: [id])
  orderItems  OrderItem[]
  reviews     Review[]

  @@index([categoryId])
  @@index([price])
  @@map("products")
}

model Order {
  id          String      @id @default(cuid())
  userId      String      @map("user_id")
  totalAmount Decimal     @db.Decimal(10, 2) @map("total_amount")
  status      OrderStatus @default(PENDING)
  addressId   String?     @map("address_id")
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")

  user        User        @relation(fields: [userId], references: [id])
  items       OrderItem[]

  @@index([userId])
  @@index([status])
  @@map("orders")
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String  @map("order_id")
  productId String  @map("product_id")
  quantity  Int
  unitPrice Decimal @db.Decimal(10, 2) @map("unit_price")

  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])

  @@map("order_items")
}
```

**Prisma 使用示例：**

```typescript
// src/services/product.service.ts
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductService {
  // 带筛选、分页的商品列表
  async findAll(params: {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'price_asc' | 'price_desc' | 'newest';
  }) {
    const { page = 1, limit = 20, category, minPrice, maxPrice, sort } = params;

    const where: Prisma.ProductWhereInput = {
      ...(category && { category: { slug: category } }),
      ...(minPrice && { price: { gte: minPrice } }),
      ...(maxPrice && { price: { lte: maxPrice } }),
    };

    const orderBy: Prisma.ProductOrderByWithRelationInput =
      sort === 'price_asc' ? { price: 'asc' }
      : sort === 'price_desc' ? { price: 'desc' }
      : { createdAt: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: { select: { name: true, slug: true } },
          _count: { select: { reviews: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data: products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  // 事务：创建订单
  async createOrder(userId: string, items: { productId: string; quantity: number }[]) {
    return prisma.$transaction(async (tx) => {
      // 1. 验证商品和库存
      const products = await Promise.all(
        items.map(item =>
          tx.product.findUnique({ where: { id: item.productId } })
        )
      );

      for (let i = 0; i < products.length; i++) {
        if (!products[i]) throw new Error(`商品 ${items[i].productId} 不存在`);
        if (products[i]!.stock < items[i].quantity) {
          throw new Error(`商品 ${products[i]!.name} 库存不足`);
        }
      }

      // 2. 计算总金额
      let totalAmount = new Prisma.Decimal(0);
      const orderItems = items.map((item, index) => {
        const product = products[index]!;
        const subtotal = product.price.mul(item.quantity);
        totalAmount = totalAmount.add(subtotal);
        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
        };
      });

      // 3. 创建订单
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          items: { create: orderItems },
        },
        include: { items: true },
      });

      // 4. 扣减库存
      await Promise.all(
        items.map(item =>
          tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          })
        )
      );

      return order;
    });
  }
}
```

</details>

---

### 4.1 关系型数据库（SQL）

> **为什么必须学数据库？** 用户注册信息存哪？订单数据存哪？商品列表存哪？所有持久化数据都靠数据库。

| 数据库 | 必须学的原因 | 适用场景 |
|--------|-------------|----------|
| **PostgreSQL** | 功能最全、JSON 支持好、免费开源、社区活跃 | 首选推荐，适合几乎所有 Web 项目 |
| MySQL | 生态最成熟、教程最多、很多老项目在用 | 遗留项目维护、读多写少的场景 |
| SQLite | 零配置、无需安装服务、一个文件就是一个数据库 | 本地开发测试、小型工具应用 |

**核心知识点：**
- **SQL 语法**：`SELECT`、`JOIN`、`GROUP BY`、子查询、窗口函数 — 所有数据查询都靠 SQL
- **索引**：B-Tree 索引、复合索引 — 没有索引的查询在百万数据量下会慢 100 倍
- **事务 ACID**：转账、下单等涉及多表操作时保证数据一致性

---

### 4.2 NoSQL 数据库

> **为什么还需要 NoSQL？** 关系型数据库不是万能的。缓存、搜索、灵活 Schema 的场景需要不同的工具。

| 数据库 | 类型 | 必须学的原因 |
|--------|------|-------------|
| **Redis** | 键值对 / 缓存 | **后端必备**。用户会话、接口缓存、排行榜、限流、消息队列，几乎所有后端项目都用 |
| MongoDB | 文档型 | Schema 灵活，适合快速迭代的项目（如博客、CMS） |
| Elasticsearch | 搜索引擎 | 全文搜索、日志分析，当 `LIKE '%keyword%'` 满足不了需求时 |

**Redis 常用命令与场景：**

```bash
# 会话管理 (String + TTL)
SET session:abc123 '{"userId":"u1","role":"admin"}' EX 3600

# 缓存商品信息 (Hash)
HSET product:1001 name "iPhone 15" price 7999 stock 100
HGET product:1001 name

# 排行榜 (Sorted Set)
ZADD leaderboard 1500 "player1" 1200 "player2" 1800 "player3"
ZREVRANGE leaderboard 0 9 WITHSCORES  # Top 10

# 最近浏览记录 (List)
LPUSH user:1001:history "product:1001"
LTRIM user:1001:history 0 49  # 只保留最近 50 条

# 限流 (String + TTL)
SET rate:ip:192.168.1.1 1 EX 60 NX  # 60 秒内只允许 1 次
INCR rate:ip:192.168.1.1

# 消息队列 (List)
LPUSH queue:notifications '{"type":"email","to":"user@example.com"}'
BRPOP queue:notifications 30  # 阻塞等待，超时 30 秒
```

---

### 4.3 ORM 与数据访问

> **为什么用 ORM？** 手写 SQL 容易出错（SQL 注入、拼写错误）、没有类型提示、难以维护。ORM 让你用代码操作数据库，类型安全且防注入。

| 工具 | 语言 | 必须学的原因 |
|------|------|-------------|
| **Prisma** | TypeScript | 类型安全、Schema 优先、自动迁移、TypeScript 生态首选 |
| Drizzle ORM | TypeScript | 比 Prisma 更轻量、性能更好、SQL-like API |
| SQLAlchemy | Python | Python 生态标准，Django/FastAPI 都集成 |

**推荐：** TypeScript 项目首选 **Prisma**，Python 项目首选 **SQLAlchemy**。

---

### ✅ 第四阶段完成检查

在进入下一阶段前，确认你已经掌握：

- [ ] 熟练编写 SQL 查询（JOIN、子查询、窗口函数、聚合）
- [ ] 能独立设计数据库 Schema（ER 图、范式、索引策略）
- [ ] 掌握 ORM 工具（Prisma / Drizzle）的使用和优化
- [ ] 理解事务 ACID 特性和隔离级别
- [ ] 了解 Redis 的常用数据结构和应用场景
- [ ] 能分析慢查询并优化（EXPLAIN、索引优化）

> **自测方法：** 设计一个电商系统的数据库（用户、商品、订单、评论），包含完整的 Prisma Schema、索引、事务处理。如果能独立完成，说明数据库能力已经达标。

---

## 第五阶段：DevOps 与部署（约 2 个月）

### 📅 每周学习计划

<details>
<summary><b>第 1-2 周：Git 进阶</b></summary>

**Git 常用命令速查：**

```bash
# ===== 分支管理 =====
git checkout -b feature/user-auth    # 创建并切换分支
git branch -a                         # 查看所有分支
git branch -d feature/old-branch      # 删除本地分支
git push origin --delete feature/old  # 删除远程分支

# ===== 暂存工作 =====
git stash                             # 暂存当前修改
git stash push -m "WIP: login page"   # 带描述的暂存
git stash pop                         # 恢复最近的暂存
git stash list                        # 查看所有暂存
git stash apply stash@{1}             # 恢复指定暂存

# ===== 回退与修复 =====
git reset --soft HEAD~1               # 撤销 commit，保留修改
git reset --hard HEAD~1               # 撤销 commit，丢弃修改（危险！）
git revert <commit-hash>              # 创建新的 commit 来撤销（安全）

# ===== 查看历史 =====
git log --oneline --graph --all       # 图形化分支历史
git log --author="John" --since="2024-01-01" --oneline
git diff HEAD~3..HEAD                 # 最近 3 次提交的差异
git blame src/app.ts                  # 查看每行代码的最后修改者

# ===== 交互式 rebase =====
git rebase -i HEAD~3                  # 整理最近 3 次提交
# 在编辑器中：
# pick = 保留
# squash = 合并到上一个
# reword = 修改提交信息
# drop = 丢弃

# ===== .gitignore 常用模板 =====
```

**.gitignore 模板：**

```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Build
dist/
build/
.next/
.nuxt/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Test
coverage/
```

</details>

<details>
<summary><b>第 3-4 周：Docker 容器化</b></summary>

**完整 Docker Compose 开发环境：**

```yaml
# docker-compose.yml
version: '3.8'

services:
  # ===== 后端 API =====
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
      target: development
    ports:
      - '8080:8080'
    volumes:
      - ./backend/src:/app/src  # 热重载
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=dev-secret-key
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  # ===== 前端 =====
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: development
    ports:
      - '3000:3000'
    volumes:
      - ./frontend/src:/app/src
    environment:
      - VITE_API_URL=http://localhost:8080

  # ===== PostgreSQL =====
  db:
    image: postgres:16-alpine
    ports:
      - '5432:5432'
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 5s
      timeout: 5s
      retries: 5

  # ===== Redis =====
  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

  # ===== pgAdmin (数据库管理 UI) =====
  pgadmin:
    image: dpage/pgadmin4:latest
    ports:
      - '5050:80'
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin
    depends_on:
      - db

volumes:
  postgres_data:
  redis_data:
```

**多阶段 Dockerfile（Node.js 后端）：**

```dockerfile
# ===== 基础阶段 =====
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# ===== 开发阶段 =====
FROM base AS development
COPY . .
EXPOSE 8080
CMD ["pnpm", "dev"]

# ===== 构建阶段 =====
FROM base AS builder
COPY . .
RUN pnpm build
RUN pnpm prune --prod

# ===== 生产阶段 =====
FROM node:20-alpine AS production
WORKDIR /app

# 安全：非 root 用户
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

USER appuser
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

CMD ["node", "dist/main.js"]
```

</details>

<details>
<summary><b>第 5-6 周：CI/CD + 云部署</b></summary>

**GitHub Actions 完整配置：**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # ===== 代码检查 =====
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: 8 }
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck

  # ===== 单元测试 =====
  test:
    name: Test
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7-alpine
        ports: ['6379:6379']
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: 8 }
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:coverage
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
      - uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  # ===== E2E 测试 =====
  e2e:
    name: E2E Test
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: 8 }
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: npx playwright install --with-deps
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  # ===== 构建与推送 Docker 镜像 =====
  build:
    name: Build & Push
    runs-on: ubuntu-latest
    needs: [e2e]
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # ===== 部署到生产 =====
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/myapp
            docker compose pull
            docker compose up -d
            docker system prune -f
```

</details>

---

### 5.1 Git 版本控制

> **为什么必须学 Git？** 没有 Git = 没有"后悔药"。代码改坏了无法回退、多人协作无法合并、上线无法追溯问题。Git 是开发者最基本的生存技能。

| 主题 | 必须学的原因 |
|------|-------------|
| 基础操作 | `clone`/`add`/`commit`/`push`/`pull` — 每天都在用，不熟就无法工作 |
| 分支管理 | `branch`/`merge`/`rebase` — 多人协作的核心，并行开发互不干扰 |
| Git Flow / GitHub Flow | 团队协作的"交通规则"，决定代码如何合并和发布 |
| 高级操作 | `stash`/`reflog`/`cherry-pick` — 紧急修复、代码迁移、找回丢失的提交 |

**推荐资源：**
- [Git 官方教程](https://git-scm.com/book/zh/v2)
- [Learning Git Branching](https://learngitbranching.js.org/?locale=zh_CN) — 交互式学习

---

### 5.2 Docker 容器化

> **为什么必须学 Docker？** "在我电脑上能跑啊！" — Docker 消灭了这个问题。它让应用在任何环境（开发/测试/生产）都能一致运行。

| 主题 | 必须学的原因 |
|------|-------------|
| 基础概念 | 镜像 vs 容器 — 理解"打包"和"运行"的区别 |
| Dockerfile 编写 | 把你的应用打包成可移植的容器，一次构建到处运行 |
| Docker Compose | 一键启动数据库 + 后端 + 前端 + Redis，不用手动装环境 |
| 镜像优化 | 镜像太大 = 部署慢、占空间，多阶段构建可减少 80% 体积 |

---

### 5.3 CI/CD 持续集成 / 持续部署

> **为什么需要 CI/CD？** 手动部署 = 每次都可能出错（忘记测试、漏掉文件、环境不一致）。CI/CD 让代码提交后自动完成测试、构建、部署，一条流水线搞定。

| 工具 | 必须学的原因 |
|------|-------------|
| **GitHub Actions** | 与 GitHub 深度集成、免费额度充足，开源项目和小团队首选 |
| GitLab CI/CD | GitLab 内置，企业自建 GitLab 时使用 |
| Jenkins | 老牌工具，大厂和传统企业仍在大量使用 |

**CI/CD 流程：**
```
代码提交 → Lint 检查 → 单元测试 → 构建镜像 → E2E 测试 → 部署 Staging → 验证 → 部署 Production
```

---

### 5.4 云服务

> **应用写完不部署 = 没写。** 云服务让你的应用能被用户访问。

| 平台 | 必须学的原因 | 适用场景 |
|------|-------------|----------|
| **Vercel** | 一键部署 Next.js，零配置，免费额度够用 | 前端 / Next.js 应用首选 |
| **Railway** | 类似 Heroku，支持数据库，部署最简单 | 全栈原型、小项目 |
| **AWS** | 功能最全、企业标配，学会 AWS = 就业面最广 | 企业级项目、需要高可用 |
| **阿里云** | 国内访问最快、备案合规 | 国内项目首选 |
| **Cloudflare** | 边缘计算、CDN、免费 SSL，全球加速 | 静态资源、边缘函数 |

---

### ✅ 第五阶段完成检查

在进入下一阶段前，确认你已经掌握：

- [ ] 熟练使用 Git 分支管理、rebase、cherry-pick 等高级操作
- [ ] 能编写 Dockerfile 和 docker-compose.yml 编排多容器应用
- [ ] 理解 CI/CD 流程，能配置 GitHub Actions 自动化流水线
- [ ] 能将应用部署到云平台（Vercel / Railway / AWS / 阿里云）
- [ ] 理解多阶段构建、镜像优化、健康检查

> **自测方法：** 将之前的全栈项目 Docker 化，配置 GitHub Actions 实现 push 后自动测试、构建、部署。如果能完成完整的 CI/CD 流水线，说明 DevOps 能力已经达标。

---

## 第六阶段：测试（约 1-2 个月）

### 📅 每周学习计划

<details>
<summary><b>第 1-3 周：单元测试 + 集成测试</b></summary>

**Vitest 单元测试示例：**

```typescript
// src/utils/__tests__/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, truncate } from '../format';

describe('formatCurrency', () => {
  it('should format number as CNY', () => {
    expect(formatCurrency(1234.56)).toBe('¥1,234.56');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('¥0.00');
  });

  it('should handle negative numbers', () => {
    expect(formatCurrency(-99.9)).toBe('-¥99.90');
  });
});

describe('truncate', () => {
  it('should truncate long strings', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('should not truncate short strings', () => {
    expect(truncate('Hi', 5)).toBe('Hi');
  });

  it('should handle empty string', () => {
    expect(truncate('', 5)).toBe('');
  });
});

// src/services/__tests__/user.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '../user.service';
import { PrismaClient } from '@prisma/client';

// Mock Prisma
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => ({
    user: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
  })),
}));

describe('UserService', () => {
  let service: UserService;
  let prisma: ReturnType<typeof PrismaClient>;

  beforeEach(() => {
    prisma = new PrismaClient();
    service = new UserService(prisma);
    vi.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      const mockUsers = [
        { id: '1', name: 'Alice', email: 'alice@test.com' },
        { id: '2', name: 'Bob', email: 'bob@test.com' },
      ];

      vi.mocked(prisma.user.findMany).mockResolvedValue(mockUsers);
      vi.mocked(prisma.user.count).mockResolvedValue(2);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(2);
      expect(result.pagination.total).toBe(2);
      expect(result.pagination.totalPages).toBe(1);
    });

    it('should handle empty results', async () => {
      vi.mocked(prisma.user.findMany).mockResolvedValue([]);
      vi.mocked(prisma.user.count).mockResolvedValue(0);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
    });
  });
});
```

**React 组件测试示例（Testing Library）：**

```tsx
// src/components/__tests__/TodoList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoList } from '../TodoList';

describe('TodoList', () => {
  const mockTodos = [
    { id: '1', text: '学习 React', completed: false },
    { id: '2', text: '学习 TypeScript', completed: true },
  ];

  it('should render todo items', () => {
    render(<TodoList todos={mockTodos} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('学习 React')).toBeInTheDocument();
    expect(screen.getByText('学习 TypeScript')).toBeInTheDocument();
  });

  it('should call onToggle when checkbox is clicked', () => {
    const onToggle = vi.fn();
    render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={vi.fn()} />);

    fireEvent.click(screen.getAllByRole('checkbox')[0]);

    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('should show empty state when no todos', () => {
    render(<TodoList todos={[]} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText(/暂无任务/i)).toBeInTheDocument();
  });
});
```

</details>

<details>
<summary><b>第 4-6 周：E2E 测试</b></summary>

**Playwright E2E 测试示例：**

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('用户认证流程', () => {
  test('应该成功注册新用户', async ({ page }) => {
    await page.goto('/register');

    // 填写注册表单
    await page.fill('[data-testid="name-input"]', '测试用户');
    await page.fill('[data-testid="email-input"]', `test${Date.now()}@example.com`);
    await page.fill('[data-testid="password-input"]', 'Test123456');
    await page.fill('[data-testid="confirm-password-input"]', 'Test123456');

    // 提交
    await page.click('[data-testid="register-button"]');

    // 验证跳转到 Dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('欢迎')).toBeVisible();
  });

  test('应该显示密码错误提示', async ({ page }) => {
    await page.goto('/register');

    await page.fill('[data-testid="password-input"]', '123');
    await page.click('[data-testid="register-button"]');

    await expect(page.getByText('密码至少 8 位')).toBeVisible();
  });

  test('应该成功登录并访问受保护页面', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[data-testid="email-input"]', 'admin@example.com');
    await page.fill('[data-testid="password-input"]', 'Admin123456');
    await page.click('[data-testid="login-button"]');

    await expect(page).toHaveURL('/dashboard');

    // 访问受保护页面
    await page.goto('/settings');
    await expect(page.getByText('设置')).toBeVisible();
  });
});

// tests/e2e/todo.spec.ts
test.describe('Todo 应用', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todo');
  });

  test('完整的 CRUD 流程', async ({ page }) => {
    // 创建
    await page.fill('[data-testid="todo-input"]', '买菜');
    await page.click('[data-testid="add-button"]');
    await expect(page.getByText('买菜')).toBeVisible();

    // 编辑
    await page.dblclick(page.getByText('买菜'));
    await page.fill('[data-testid="edit-input"]', '买菜和水果');
    await page.press('[data-testid="edit-input"]', 'Enter');
    await expect(page.getByText('买菜和水果')).toBeVisible();

    // 完成
    await page.click(page.getByRole('checkbox'));
    await expect(page.getByText('买菜和水果')).toHaveClass(/completed/);

    // 删除
    await page.hover(page.getByText('买菜和水果'));
    await page.click(page.getByRole('button', { name: /删除/i }));
    await expect(page.getByText('买菜和水果')).not.toBeVisible();
  });
});
```

</details>

---

### 6.1 测试金字塔

```
        /  E2E 测试  \        ← 少量（Playwright）
       / 集成测试      \      ← 适量（Supertest）
      / 单元测试         \    ← 大量（Vitest）
     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
```

### 6.2 测试工具

> **为什么需要测试？** 不写测试 = 每次改代码都在"祈祷"不会出 bug。测试是你的安全网，让你敢重构、敢上线。

| 类型 | 工具 | 必须学的原因 |
|------|------|-------------|
| **单元测试** | Vitest | 测试单个函数/组件的正确性，速度快、与 Vite 集成好 |
| **组件测试** | React Testing Library / Vue Test Utils | 测试用户行为（点击、输入）而非实现细节，确保组件可用 |
| **API 测试** | Supertest | 测试后端接口的请求/响应，确保 API 契约正确 |
| **E2E 测试** | Playwright | 模拟真实用户操作（打开页面→点击→填写→提交），覆盖核心业务流程 |
| **Mock** | MSW（Mock Service Worker） | 模拟 API 响应，让前端测试不依赖后端 |

---

### ✅ 第六阶段完成检查

在进入下一阶段前，确认你已经掌握：

- [ ] 理解测试金字塔概念（单元 > 集成 > E2E）
- [ ] 能用 Vitest 编写单元测试，理解 Mock / Spy 的使用
- [ ] 能用 Testing Library 测试 React/Vue 组件
- [ ] 能用 Playwright 编写 E2E 测试覆盖核心业务流程
- [ ] 理解 TDD（测试驱动开发）的基本理念

> **自测方法：** 为之前的全栈项目补充测试：核心业务逻辑单元测试覆盖率 > 80%，关键用户流程有 E2E 测试覆盖。

---

## 第七阶段：安全基础（约 1 个月）

### 📅 学习内容

<details>
<summary><b>常见攻防代码示例</b></summary>

**XSS 攻击与防御：**

```typescript
// ❌ 危险：直接插入用户输入
element.innerHTML = userInput; // <script>alert('XSS')</script>

// ✅ 安全：使用 textContent
element.textContent = userInput;

// ✅ 安全：HTML 转义函数
function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, char => map[char]);
}

// ✅ 安全：使用 DOMPurify 净化 HTML
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);

// ✅ 安全：设置 CSP 头
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
  );
  next();
});
```

**SQL 注入攻击与防御：**

```typescript
// ❌ 危险：字符串拼接 SQL
const query = `SELECT * FROM users WHERE email = '${email}'`;
// 攻击者输入: ' OR '1'='1' --
// 结果: SELECT * FROM users WHERE email = '' OR '1'='1' --'

// ✅ 安全：参数化查询
const user = await prisma.$queryRaw`
  SELECT * FROM users WHERE email = ${email}
`;

// ✅ 安全：使用 ORM
const user = await prisma.user.findUnique({ where: { email } });

// ✅ 安全：输入验证
const emailSchema = z.string().email().max(255);
const result = emailSchema.safeParse(userInput);
if (!result.success) {
  throw new AppError(400, '邮箱格式不正确');
}
```

**速率限制：**

```typescript
// 简易速率限制中间件
import rateLimit from 'express-rate-limit';

// API 全局限流
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100,                  // 每个 IP 最多 100 次请求
  message: { success: false, error: '请求过于频繁，请稍后再试' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 登录接口严格限流
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: '登录尝试次数过多，请 15 分钟后再试' },
  skipSuccessfulRequests: true,
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', loginLimiter);
```

</details>

---

### 7.1 常见攻击与防御

> **为什么必须学安全？** 一个 XSS 漏洞可以盗取所有用户的登录态；一个 SQL 注入可以删库。安全不是"加分项"，是"生存项"。

| 攻击类型 | 它能造成什么后果 | 防御方式 |
|----------|-----------------|----------|
| **XSS** | 攻击者在你的页面执行恶意 JS，偷取用户 Cookie/密码 | 输入转义、CSP、`HttpOnly` Cookie |
| **CSRF** | 攻击者伪造用户请求（如转账、修改密码） | CSRF Token、SameSite Cookie |
| **SQL 注入** | 攻击者通过输入框执行恶意 SQL，删库/偷数据 | 参数化查询、ORM（Prisma 自动防注入） |
| **中间人攻击** | 攻击者窃听/篡改用户和服务器之间的通信 | HTTPS、HSTS |
| **DDoS** | 大量恶意请求打垮你的服务器 | CDN、限流、WAF |

### 7.2 安全最佳实践

- **密码存储**：使用 bcrypt / argon2 哈希，绝不存储明文
- **JWT 安全**：设置过期时间、使用强密钥、存储在 `HttpOnly` Cookie
- **环境变量**：敏感信息不入代码库、使用 `.env` 文件
- **依赖安全**：定期运行 `npm audit`、使用 Dependabot / Snyk
- **最小权限原则**：数据库用户、API 权限按需分配

**推荐资源：**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)

---

### ✅ 第七阶段完成检查

在进入下一阶段前，确认你已经掌握：

- [ ] 理解 XSS / CSRF / SQL 注入的原理和防御方式
- [ ] 能实现安全的密码存储（bcrypt/argon2）和 JWT 认证
- [ ] 了解 HTTPS / CORS / CSP 的工作原理和配置
- [ ] 能实现速率限制、输入验证等安全中间件
- [ ] 了解 OWASP Top 10 安全风险

> **自测方法：** 对之前的全栈项目进行安全审计，检查是否存在 OWASP Top 10 中的漏洞，并逐一修复。

---

## 第八阶段：系统设计（约 2-3 个月）

### 📅 学习内容

<details>
<summary><b>系统设计面试题详解</b></summary>

**短链系统设计：**

```
┌─────────┐     ┌───────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────→│   Nginx    │────→│   API    │────→│  Redis   │
│          │     │ (负载均衡) │     │  Server  │     │  (缓存)  │
└─────────┘     └───────────┘     └────┬─────┘     └──────────┘
                                       │
                                  ┌────▼─────┐
                                  │PostgreSQL │
                                  │  (持久化) │
                                  └──────────┘

核心流程：
1. 短链生成：
   - 输入长 URL → 计算 Base62 编码（6位） → 存入 DB → 返回短链
   - 哈希算法：取 MD5 前 6 位 → Base62 编码 → 冲突检测

2. 短链跳转：
   - 短码 → 查 Redis 缓存 → 命中则 302 重定向
   - 未命中 → 查 DB → 写入 Redis → 302 重定向

3. 关键设计点：
   - 读写比 ~100:1 → 读优化（缓存 + CDN）
   - Base62 编码：6 位 = 62^6 ≈ 568 亿种组合
   - 分布式 ID 生成：Snowflake 算法
   - 限流：防止恶意刷短链
```

**即时通讯系统设计：**

```
                    ┌──────────────────┐
                    │   Gateway (WS)    │
                    │  长连接管理       │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
        │  Chat Svc  │ │  Push Svc │ │ Presence  │
        │ (消息存储) │ │ (推送)    │ │ (在线状态)│
        └─────┬─────┘ └─────┬─────┘ └───────────┘
              │              │
        ┌─────▼─────┐ ┌─────▼─────┐
        │  MongoDB   │ │  Redis    │
        │ (消息持久化)│ │ (Pub/Sub) │
        └───────────┘ └───────────┘

核心流程：
1. 连接管理：WebSocket 长连接 + 心跳检测
2. 消息发送：
   - 客户端 → Gateway → Chat Service → 存储到 MongoDB
   - 通过 Redis Pub/Sub 广播到目标用户的 Gateway
   - Gateway 推送到目标客户端
3. 离线消息：用户上线时拉取未读消息
4. 已读状态：异步更新，最终一致性
5. 消息顺序：使用 Snowflake ID 保证全局有序
```

</details>

---

### 8.1 核心概念

> **为什么需要学系统设计？** 当你的应用用户量从 100 增长到 100 万，单机架构会崩溃。系统设计教你如何让应用"扛得住"大规模访问。

| 概念 | 必须学的原因 | 说明 |
|------|-------------|------|
| **负载均衡** | 单台服务器扛不住时，把请求分给多台 | Round Robin、加权轮询、一致性哈希 |
| **缓存策略** | 数据库查询太慢，用缓存加速 100 倍 | Cache-Aside、Write-Through、CDN |
| **消息队列** | 解耦服务、削峰填谷，防止高流量打垮系统 | RabbitMQ、Kafka、Redis Streams |
| **微服务 vs 单体** | 团队变大后，单体代码冲突严重，需要拆分 | 服务拆分、API 网关、服务发现 |
| **数据库设计** | 数据量大了单库扛不住，需要分片和读写分离 | 读写分离、分库分表、CAP 定理 |
| **限流与熔断** | 保护系统不被突发流量打垮 | 令牌桶、滑动窗口 |

### 8.2 常见系统设计题目

> 这些不是"面试题"，而是你在实际工作中会遇到的真实架构问题。

| 题目 | 为什么需要学 | 关键设计点 |
|------|-------------|------------|
| **短链系统** | 类似 t.cn/bit.ly，理解哈希和重定向 | 哈希算法、302 重定向、高并发读 |
| **即时通讯** | 类似微信/Slack，理解实时通信 | WebSocket、消息存储、已读状态 |
| **新闻 Feed** | 类似微博/Twitter，理解信息流 | 推拉模型、时间线排序、缓存策略 |
| **电商秒杀** | 类似双 11，理解高并发下的库存扣减 | 限流、库存扣减、消息队列 |
| **文件存储** | 类似网盘，理解大文件处理 | 分块上传、去重、CDN 加速 |
| **搜索系统** | 类似百度/Google，理解全文搜索 | 倒排索引、分词、ES 集群 |

**推荐资源：**
- [System Design Primer（GitHub）](https://github.com/donnemartin/system-design-primer)
- 《Designing Data-Intensive Applications》（DDIA）— 必读书籍
- [ByteByteGo YouTube](https://www.youtube.com/@ByteByteGo) — 系统设计视频

---

## 补充章节 A：计算机基础

> 全栈工程师不需要精通底层，但需要理解核心原理。

### 计算机网络

| 主题 | 内容要点 | 重要程度 |
|------|----------|----------|
| TCP/IP | 三次握手、四次挥手、TCP vs UDP | ⭐⭐⭐ |
| HTTP/HTTPS | 请求/响应、状态码、HTTP/2、HTTP/3 | ⭐⭐⭐ |
| DNS | 域名解析流程、递归/迭代查询、DNS 缓存 | ⭐⭐ |
| WebSocket | 全双工通信、握手过程、心跳机制 | ⭐⭐ |
| CORS | 同源策略、预检请求、简单请求 | ⭐⭐⭐ |
| Cookie/Session | 工作原理、安全属性（HttpOnly/SameSite/Secure） | ⭐⭐⭐ |

**HTTP 请求生命周期：**

```
浏览器输入 URL → DNS 解析 → TCP 三次握手 → TLS 握手(HTTPS)
→ 发送 HTTP 请求 → 服务器处理 → 返回 HTTP 响应
→ 浏览器解析 HTML → 构建 DOM 树 → 解析 CSS → 构建 CSSOM
→ 合并渲染树 → 布局 → 绘制 → 合成
```

### 操作系统基础

| 主题 | 内容要点 | 重要程度 |
|------|----------|----------|
| 进程 vs 线程 | 区别、并发 vs 并行、协程 | ⭐⭐⭐ |
| 内存管理 | 堆 vs 栈、垃圾回收、内存泄漏 | ⭐⭐⭐ |
| 文件系统 | 文件描述符、缓冲 I/O、流式处理 | ⭐⭐ |
| I/O 模型 | 阻塞/非阻塞、同步/异步、I/O 多路复用 | ⭐⭐⭐ |

### 数据结构与算法

| 主题 | 必知内容 | 重要程度 |
|------|----------|----------|
| 数组/链表 | 增删改查时间复杂度 | ⭐⭐⭐ |
| 哈希表 | 原理、冲突解决、HashMap | ⭐⭐⭐ |
| 树 | 二叉树、BST、AVL、红黑树概念 | ⭐⭐ |
| 图 | BFS、DFS、最短路径 | ⭐⭐ |
| 排序 | 快排、归并、堆排序、时间复杂度 | ⭐⭐⭐ |
| 搜索 | 二分查找 | ⭐⭐⭐ |
| 动态规划 | 背包问题、最长公共子序列 | ⭐⭐ |

**常见算法题（LeetCode 推荐）：**

```
必刷 Top 30：
1. 两数之和（哈希表）
3. 无重复字符的最长子串（滑动窗口）
5. 最长回文子串（动态规划）
15. 三数之和（双指针）
20. 有效的括号（栈）
21. 合并两个有序链表（链表）
33. 搜索旋转排序数组（二分查找）
42. 接雨水（双指针/单调栈）
46. 全排列（回溯）
49. 字母异位词分组（哈希表）
53. 最大子数组和（动态规划）
56. 合并区间（排序）
70. 爬楼梯（动态规划）
76. 最小覆盖子串（滑动窗口）
102. 二叉树的层序遍历（BFS）
121. 买卖股票的最佳时机（贪心）
141. 环形链表（快慢指针）
146. LRU 缓存（哈希表+双向链表）
153. 寻找旋转排序数组中的最小值（二分）
200. 岛屿数量（DFS/BFS）
206. 反转链表（链表）
215. 数组中的第K个最大元素（堆/快排）
236. 二叉树的最近公共祖先（递归）
238. 除自身以外数组的乘积（前缀积）
239. 滑动窗口最大值（单调队列）
300. 最长递增子序列（动态规划/二分）
322. 零钱兑换（动态规划）
438. 找到字符串中所有字母异位词（滑动窗口）
560. 和为 K 的子数组（前缀和+哈希）
739. 每日温度（单调栈）
```

---

## 补充章节 B：综合实战项目

### 🌟 项目一：个人博客系统（入门级）

**技术栈：** Next.js + PostgreSQL + Prisma + Tailwind CSS

**详细功能清单：**

| 模块 | 功能 | 涉及技术 |
|------|------|----------|
| 文章管理 | Markdown 编辑、草稿、发布、分类、标签 | React + Markdown-it |
| 用户认证 | 注册、登录、GitHub OAuth | NextAuth.js |
| 评论系统 | 嵌套评论、@提及、通知 | 递归组件、WebSocket |
| 全文搜索 | 文章搜索、高亮 | PostgreSQL Full-Text Search |
| SEO | Sitemap、Meta 标签、Open Graph | Next.js Metadata API |
| 后台管理 | 数据统计、内容管理 | Chart.js + Admin 面板 |
| 响应式 | 移动端适配 | Tailwind CSS |

**数据库设计：**

```prisma
model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String
  excerpt     String?
  coverImage  String?
  status      PostStatus @default(DRAFT)
  authorId    String
  categoryId  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  publishedAt DateTime?

  author      User     @relation(fields: [authorId], references: [id])
  category    Category? @relation(fields: [categoryId], references: [id])
  tags        Tag[]
  comments    Comment[]

  @@index([status, publishedAt])
  @@index([authorId])
}
```

**预计开发时间：** 3-4 周

---

### 🌟 项目二：在线协作工具（进阶级）

**技术栈：** React + NestJS + MongoDB + Redis + WebSocket

**详细功能清单：**

| 模块 | 功能 | 涉及技术 |
|------|------|----------|
| 看板管理 | 创建、拖拽排序、标签 | react-beautiful-dnd |
| 实时协作 | 多人同时编辑、光标显示 | WebSocket + CRDT/Yjs |
| 文件上传 | 拖拽上传、预览、进度条 | Multer + S3 |
| 团队管理 | 邀请、角色、权限 | RBAC |
| 通知系统 | 实时通知、邮件通知 | WebSocket + Nodemailer |
| 搜索 | 全文搜索、筛选 | Elasticsearch |

**实时协作架构：**

```
Client A ←──WebSocket──→ Gateway ←──Redis Pub/Sub──→ Gateway ←──WebSocket──→ Client B
                              │
                         CRDT 合并
                              │
                         MongoDB 持久化
```

**预计开发时间：** 6-8 周

---

### 🌟 项目三：电商系统（综合级）

**技术栈：** Vue 3 + Spring Boot / Node.js + PostgreSQL + Redis + Docker

**详细功能清单：**

| 模块 | 功能 | 涉及技术 |
|------|------|----------|
| 商品管理 | SPU/SKU、图片上传、分类树 | 数据库设计 |
| 购物车 | 加购、修改、合并（登录/未登录） | Redis + Cookie |
| 订单流程 | 下单、支付、发货、退款 | 状态机 |
| 支付集成 | 支付宝/微信沙箱 | 异步回调、签名验证 |
| 库存管理 | 扣减、预占、超卖防护 | Redis + 数据库事务 |
| 搜索 | 商品搜索、筛选、排序 | Elasticsearch |
| 后台管理 | 数据看板、商品/订单管理 | 管理后台 |
| Docker 部署 | 全容器化 | Docker Compose |

**订单状态机：**

```
                ┌─── 已取消(CANCELLED)
                │
创建(PENDING) ──→ 支付(PAID) ──→ 发货(SHIPPED) ──→ 确认(DELIVERED) ──→ 完成(COMPLETED)
   │                │
   │                └─── 申请退款 ──→ 退款(REFUNDED)
   │
   └─── 超时未支付 ──→ 自动取消
```

**预计开发时间：** 8-10 周

---

## 补充章节 C：面试核心知识要点

> 以下不是"面试题列表"，而是你**必须真正理解**的核心知识点。每个知识点标注了它在实际工作中的作用。

### 前端核心知识

| 知识点 | 为什么必须掌握 | 文档位置 |
|--------|---------------|----------|
| **事件循环（Event Loop）** | 理解异步代码的执行顺序，避免回调地狱和竞态条件 | 第一阶段第 6-8 周 |
| **闭包** | React Hooks、防抖节流、数据私有化的底层原理 | 第一阶段第 6-8 周 |
| **Promise / async-await** | 所有异步操作（API 请求、文件读写）的基础 | 第一阶段第 6-8 周 |
| **虚拟 DOM + Diff 算法** | 理解框架为什么快、什么时候慢、如何优化 | 第二阶段第 1-3 周 |
| **Hooks 原理** | 避免闭包陷阱、理解依赖数组、写出正确的自定义 Hook | 第二阶段第 1-3 周 |
| **SSR / SSG / ISR** | SEO、首屏性能、不同业务场景的渲染策略选择 | 第二阶段第 2.4 节 |
| **Flexbox + Grid** | 90% 的页面布局都靠这两个，必须熟练 | 第一阶段第 3-5 周 |
| **BFC + 选择器优先级** | 解决样式冲突、margin 合并等常见 CSS 问题 | 第一阶段第 1.1 节 |

### 后端核心知识

| 知识点 | 为什么必须掌握 | 文档位置 |
|--------|---------------|----------|
| **RESTful API 设计** | 所有 Web 应用的前后端通信标准 | 第三阶段第 3.2 节 |
| **JWT 认证流程** | 用户登录、权限控制的核心机制 | 第三阶段第 3.8 节 |
| **中间件模式** | Express/NestJS 的核心架构，所有请求都经过中间件链 | 第三阶段第 3-5 周 |
| **数据库索引（B-Tree）** | 直接决定查询性能，索引设计是后端核心能力 | 第四阶段第 1-3 周 |
| **事务 ACID** | 转账、下单等涉及多表操作时保证数据一致性 | 第四阶段第 4.1 节 |
| **Redis 使用场景** | 缓存、会话、排行榜、限流，后端必备工具 | 第四阶段第 4.2 节 |
| **缓存穿透/击穿/雪崩** | 高并发场景下的缓存设计，面试高频 | 第八阶段 |
| **XSS / CSRF / SQL 注入** | 每个 Web 应用都必须防御的安全风险 | 第七阶段 |
| **HTTPS / CORS** | 前后端分离、跨域请求、数据加密的基础 | 补充章节 A |

### 算法准备建议

> 不需要刷几百道题。掌握以下核心模式即可应对大多数面试：

| 模式 | 核心思想 | 典型应用 |
|------|----------|----------|
| **哈希表** | O(1) 查找 | 两数之和、去重、缓存 |
| **双指针 / 滑动窗口** | 减少嵌套循环 | 子串问题、排序数组 |
| **二分查找** | 每次排除一半 | 搜索、排序数组 |
| **BFS / DFS** | 遍历树/图 | 层序遍历、岛屿数量 |
| **动态规划** | 拆分子问题 + 记忆化 | 最优路径、背包、零钱 |
| **栈** | 后进先出 | 括号匹配、单调栈 |
| **链表操作** | 指针操作 | 反转、合并、环检测 |

**建议：** 每个模式刷 2-3 道经典题，理解思路即可，不需要大量刷题。

---

## 补充章节 D：职业发展路径

### 全栈工程师职业路径

```
初级 (0-2年)                中级 (2-5年)               高级 (5年+)
├── 前端开发                ├── 全栈开发                ├── 技术负责人
├── 后端开发                ├── 技术架构                ├── 架构师
└── 学习积累                ├── 团队协作                ├── CTO / VP of Engineering
                            └── 项目管理                └── 技术顾问
```

### 技术深度 vs 广度

```
初级：广度优先
  → 熟悉前端 + 后端 + 数据库 + 部署的完整流程
  → 能独立完成简单到中等复杂度的功能

中级：选择方向深入
  → 前端方向：性能优化、SSR、微前端、设计系统
  → 后端方向：分布式系统、高并发、数据库优化
  → 全栈方向：系统设计、技术选型、架构能力

高级：T 型人才
  → 一个领域精通 + 多个领域熟悉
  → 能做技术决策、团队管理、业务理解
```

### 持续学习资源

| 类型 | 推荐资源 |
|------|----------|
| 技术博客 | 掘金、思否、Medium、Dev.to |
| 视频教程 | B 站、YouTube、Frontend Masters、Udemy |
| 开源社区 | GitHub Trending、Hacker News |
| 技术播客 | 中文：捕蛇者说；英文：Syntax.fm |
| 书籍 | 《DDIA》、《Clean Code》、《重构》、《设计模式》 |
| 刷题 | LeetCode、牛客网 |

---

## 补充章节 E：性能优化

> 性能是用户体验的核心指标，也是面试高频考点。

### 前端性能优化

#### 1. 加载性能

| 优化手段 | 说明 | 预期效果 |
|----------|------|----------|
| 代码分割（Code Splitting） | `React.lazy()` + `import()` 动态导入 | 首屏 JS 减少 50%+ |
| 路由懒加载 | 按路由拆分 bundle | 首屏加载时间减半 |
| 图片优化 | WebP/AVIF 格式、响应式图片、懒加载 | 图片体积减少 30-70% |
| 字体优化 | `font-display: swap`、子集化、预加载 | 避免 FOIT/FOUT |
| 预加载关键资源 | `<link rel="preload">` | 提前加载关键 CSS/JS/字体 |
| 压缩 | Gzip / Brotli 压缩 | 传输体积减少 60-80% |
| CDN | 静态资源上 CDN | 全球访问加速 |

**代码示例 - React 路由懒加载：**

```tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 路由懒加载
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Settings = lazy(() => import('@/pages/Settings'));
const Profile = lazy(() => import('@/pages/Profile'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="spinner" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: '/settings',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Settings />
      </Suspense>
    ),
  },
]);
```

**代码示例 - 图片懒加载：**

```tsx
// 自定义 Hook：Intersection Observer 实现懒加载
function useLazyLoad(ref: React.RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // 提前 200px 开始加载
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

// 懒加载图片组件
function LazyImage({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const imgRef = useRef<HTMLImageElement>(null);
  const isVisible = useLazyLoad(imgRef);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
```

#### 2. 渲染性能

| 优化手段 | 说明 |
|----------|------|
| 虚拟列表 | 只渲染可视区域的 DOM（`react-window` / `@tanstack/virtual`） |
| 避免不必要的重渲染 | `React.memo`、`useMemo`、`useCallback` |
| Web Worker | 将耗时计算移到后台线程 |
| `requestAnimationFrame` | 动画使用 rAF 而非 setTimeout |
| CSS `will-change` | 提示浏览器优化合成层 |
| 减少布局抖动 | 批量读写 DOM、使用 `transform` 代替 `top/left` |

**代码示例 - 虚拟列表：**

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // 每项高度估算
    overscan: 5, // 预渲染 5 个额外项
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### 3. 性能监测工具

| 工具 | 用途 |
|------|------|
| **Lighthouse** | 综合性能评分（Chrome DevTools 内置） |
| **Web Vitals** | Core Web Vitals 指标（LCP/FID/CLS） |
| **React DevTools Profiler** | React 组件渲染分析 |
| **Chrome Performance Tab** | 帧率分析、长任务检测 |
| **Bundle Analyzer** | 打包体积分析（`webpack-bundle-analyzer`） |

**Web Vitals 监控代码：**

```typescript
import { onLCP, onFID, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric: { name: string; value: number; id: string }) {
  // 发送到你的分析服务
  fetch('/api/analytics/vitals', {
    method: 'POST',
    body: JSON.stringify({
      name: metric.name,     // LCP | FID | CLS | FCP | TTFB
      value: metric.value,
      page: window.location.pathname,
    }),
  });
}

onLCP(sendToAnalytics);   // Largest Contentful Paint < 2.5s
onFID(sendToAnalytics);   // First Input Delay < 100ms
onCLS(sendToAnalytics);   // Cumulative Layout Shift < 0.1
onFCP(sendToAnalytics);   // First Contentful Paint
onTTFB(sendToAnalytics);  // Time to First Byte
```

---

### 后端性能优化

#### 1. 数据库优化

| 手段 | 说明 |
|------|------|
| 索引优化 | 分析慢查询、添加合适索引、避免索引失效 |
| 查询优化 | 避免 `SELECT *`、减少 JOIN、使用分页 |
| 连接池 | 合理配置连接池大小（推荐：CPU核心数 × 2 + 磁盘数） |
| 读写分离 | 主库写、从库读，减少主库压力 |
| 缓存 | 热点数据缓存到 Redis |
| 慢查询日志 | 开启并定期分析 |

**代码示例 - 查询优化（Prisma）：**

```typescript
// ❌ N+1 查询问题
const users = await prisma.user.findMany();
for (const user of users) {
  const orders = await prisma.order.findMany({  // 每个用户一次查询！
    where: { userId: user.id },
  });
}

// ✅ 使用 include 一次查询
const users = await prisma.user.findMany({
  include: {
    orders: {
      where: { status: 'completed' },
      select: { id: true, totalAmount: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5, // 只取最近 5 个订单
    },
  },
});

// ✅ 使用 select 只查需要的字段
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    _count: { select: { orders: true } },
  },
});

// ✅ 使用 cursor 分页（大数据量比 skip 更高效）
const PAGE_SIZE = 20;
let cursor: string | undefined;

do {
  const users = await prisma.user.findMany({
    take: PAGE_SIZE,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    orderBy: { id: 'asc' },
  });

  cursor = users[users.length - 1]?.id;
  // 处理数据...
} while (cursor);
```

#### 2. 缓存策略

**代码示例 - Redis 缓存层封装：**

```typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

// 泛型缓存封装
async function cached<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = 300 // 默认 5 分钟
): Promise<T> {
  // 1. 尝试从缓存获取
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. 缓存未命中，执行查询
  const data = await fetchFn();

  // 3. 写入缓存
  await redis.setex(key, ttlSeconds, JSON.stringify(data));

  return data;
}

// 使用示例
async function getProduct(id: string) {
  return cached(
    `product:${id}`,
    () => prisma.product.findUnique({ where: { id } }),
    600 // 10 分钟
  );
}

// 缓存失效
async function updateProduct(id: string, data: UpdateProductInput) {
  const product = await prisma.product.update({ where: { id }, data });
  await redis.del(`product:${id}`); // 删除缓存
  return product;
}

// 缓存预热（应用启动时加载热点数据）
async function warmupCache() {
  const hotProducts = await prisma.product.findMany({
    orderBy: { views: 'desc' },
    take: 100,
  });

  const pipeline = redis.pipeline();
  for (const product of hotProducts) {
    pipeline.setex(`product:${product.id}`, 600, JSON.stringify(product));
  }
  await pipeline.exec();
  console.log(`缓存预热完成：${hotProducts.length} 个商品`);
}
```

#### 3. API 性能优化

| 手段 | 说明 |
|------|------|
| 响应压缩 | `compression` 中间件（Gzip） |
| 限流 | `express-rate-limit` 防止滥用 |
| 请求合并 | DataLoader 合并数据库查询 |
| 异步处理 | 耗时操作放入消息队列 |
| HTTP 缓存 | `Cache-Control`、`ETag`、`Last-Modified` |

**代码示例 - HTTP 缓存头：**

```typescript
// 静态资源：长期缓存
app.use('/static', express.static('public', {
  maxAge: '1y',
  immutable: true,
  setHeaders(res, path) {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache'); // HTML 不缓存
    }
  },
}));

// API 响应：短时缓存
app.get('/api/products', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  // ...
});
```

---

### 数据库性能诊断

**慢查询分析（PostgreSQL）：**

```sql
-- 1. 开启慢查询日志
ALTER SYSTEM SET log_min_duration_statement = 200; -- 记录超过 200ms 的查询
SELECT pg_reload_conf();

-- 2. 查看当前运行的查询
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active' AND now() - pg_stat_activity.query_start > interval '5 seconds';

-- 3. 终止长时间运行的查询
SELECT pg_terminate_backend(pid);

-- 4. 分析查询计划
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name;

-- 5. 查看表大小
SELECT
  relname AS table_name,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
  pg_size_pretty(pg_relation_size(relid)) AS table_size,
  pg_size_pretty(pg_indexes_size(relid)) AS index_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;

-- 6. 查看索引使用情况
SELECT
  indexrelname AS index_name,
  idx_scan AS times_used,
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC; -- 找出从未使用的索引
```

---

## 补充章节 F：常见踩坑与调试技巧

### JavaScript / TypeScript 常见踩坑

<details>
<summary><b>1. this 指向问题</b></summary>

```javascript
class UserService {
  name = 'UserService';

  async fetchUsers() {
    // ❌ this 丢失：回调中 this 指向 undefined
    fetch('/api/users').then(function (res) {
      console.log(this.name); // undefined
    });

    // ✅ 箭头函数继承外层 this
    fetch('/api/users').then((res) => {
      console.log(this.name); // 'UserService'
    });
  }
}

// ❌ 事件处理中的 this
button.addEventListener('click', function () {
  console.log(this); // 指向 button 元素，不是类实例
});

// ✅ 使用箭头函数或 bind
button.addEventListener('click', () => {
  console.log(this); // 指向类实例
});
```

</details>

<details>
<summary><b>2. 闭包陷阱</b></summary>

```javascript
// ❌ 经典闭包陷阱
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000); // 输出 5 个 5
}

// ✅ 使用 let（块作用域）
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000); // 输出 0, 1, 2, 3, 4
}

// ✅ 使用 IIFE 创建闭包
for (var i = 0; i < 5; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 1000);
  })(i);
}

// React 中的闭包陷阱
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ 闭包捕获了旧的 count 值
  const handleAlert = () => {
    setTimeout(() => alert(count), 3000);
  };

  // ✅ 使用 useRef 获取最新值
  const countRef = useRef(count);
  countRef.current = count;

  const handleAlertFixed = () => {
    setTimeout(() => alert(countRef.current), 3000);
  };

  // ✅ 或使用函数式更新
  const increment = () => {
    setCount(prev => prev + 1); // 始终基于最新值
  };
}
```

</details>

<details>
<summary><b>3. 异步错误处理</b></summary>

```typescript
// ❌ 未捕获的 Promise 错误
async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`); // 网络错误会抛出异常
  return res.json(); // JSON 解析错误也会抛出异常
}

// ✅ 统一错误处理
async function fetchUserSafe(id: string) {
  try {
    const res = await fetch(`/api/users/${id}`);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${res.status}`);
    }

    return { data: await res.json(), error: null };
  } catch (error) {
    console.error('Fetch user failed:', error);
    return { data: null, error: (error as Error).message };
  }
}

// ✅ 全局未捕获错误处理（Node.js）
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // 生产环境：上报错误、优雅退出
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1); // 必须退出，状态不可预测
});

// ✅ React 全局错误边界
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
    // 上报错误到监控服务
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
```

</details>

<details>
<summary><b>4. TypeScript 类型体操踩坑</b></summary>

```typescript
// ❌ any 滥用
function process(data: any) {
  return data.foo.bar.baz; // 运行时可能报错
}

// ✅ 使用 unknown + 类型守卫
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'foo' in data) {
    const obj = data as { foo: { bar: { baz: string } } };
    return obj.foo.bar.baz;
  }
  throw new Error('Invalid data structure');
}

// ❌ 类型断言滥用
const user = {} as User; // 强制断言，编译器信任你但运行时可能出错

// ✅ 使用 satisfies 操作符（TS 4.9+）
const config = {
  port: 3000,
  host: 'localhost',
  debug: true,
} satisfies Record<string, string | number | boolean>;

// config 的类型仍然是具体字面量类型，而非宽泛的 Record
config.port; // number（不是 string | number | boolean）

// ❌ 可选属性导致运行时错误
interface User {
  name: string;
  address?: { city: string };
}

function getCity(user: User) {
  return user.address.city; // ❌ address 可能是 undefined
}

// ✅ 可选链 + 空值合并
function getCitySafe(user: User) {
  return user.address?.city ?? '未知城市';
}
```

</details>

### Node.js / 后端常见踩坑

<details>
<summary><b>5. 内存泄漏</b></summary>

```typescript
// ❌ 全局变量累积
const cache: Record<string, any> = {};

app.get('/api/data', (req, res) => {
  const key = req.query.id as string;
  cache[key] = expensiveComputation(key); // 永远不会释放！
  res.json(cache[key]);
});

// ✅ 使用 LRU 缓存（有上限）
import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, any>({
  max: 500,           // 最多 500 项
  ttl: 1000 * 60 * 5, // 5 分钟过期
});

// ❌ 事件监听器未清理
function setupHandler(emitter: EventEmitter) {
  const handler = () => console.log('event!');
  emitter.on('data', handler);
  // 函数退出后 handler 未被移除，导致内存泄漏
}

// ✅ 清理事件监听器
function setupHandlerClean(emitter: EventEmitter) {
  const handler = () => console.log('event!');
  emitter.on('data', handler);

  return () => {
    emitter.off('data', handler); // 返回清理函数
  };
}

// 检测内存泄漏
setInterval(() => {
  const mem = process.memoryUsage();
  console.log({
    rss: `${(mem.rss / 1024 / 1024).toFixed(1)}MB`,      // 总内存
    heapUsed: `${(mem.heapUsed / 1024 / 1024).toFixed(1)}MB`, // 堆内存
    heapTotal: `${(mem.heapTotal / 1024 / 1024).toFixed(1)}MB`,
  });
}, 30000);
```

</details>

<details>
<summary><b>6. 数据库连接问题</b></summary>

```typescript
// ❌ 每次请求创建新连接
app.get('/api/users', async (req, res) => {
  const prisma = new PrismaClient(); // 不要这样做！
  const users = await prisma.user.findMany();
  res.json(users);
});

// ✅ 使用单例（Prisma 内部已有连接池）
// prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma; // 开发环境热重载时复用连接
}

// ✅ 优雅关闭
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
```

</details>

### 调试技巧

| 场景 | 工具/方法 |
|------|-----------|
| 前端调试 | Chrome DevTools → Sources → 断点、条件断点、Logpoints |
| 网络请求调试 | Chrome DevTools → Network → 查看请求/响应/时序 |
| React 状态调试 | React DevTools → Components → 查看 props/state |
| Node.js 调试 | `node --inspect` + Chrome DevTools（`chrome://inspect`） |
| API 调试 | Thunder Client / Postman / Hoppscotch |
| 数据库调试 | pgAdmin / DBeaver / Prisma Studio（`npx prisma studio`） |
| Docker 调试 | `docker logs`、`docker exec -it`、`docker stats` |
| 性能分析 | Node.js `--prof`、`clinic.js`、`0x` 火焰图 |

**Node.js 调试命令：**

```bash
# 启动调试模式
node --inspect dist/main.js
node --inspect-brk dist/main.js  # 在第一行暂停

# 使用 Chrome DevTools
# 打开 chrome://inspect → 点击你的进程 → 打开 DevTools

# 使用 VS Code 调试（.vscode/launch.json）
```

**VS Code 调试配置：**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Node.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/main.ts",
      "runtimeArgs": ["-r", "ts-node/register"],
      "env": { "NODE_ENV": "development" },
      "console": "integratedTerminal",
      "restart": true,
      "watch": ["src"]
    },
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "--testPathPattern", "${file}"],
      "console": "integratedTerminal"
    }
  ]
}
```

---

## 补充章节 G：监控与可观测性

> 三大支柱：日志（Logs）、指标（Metrics）、追踪（Traces）

### 应用日志

**代码示例 - 结构化日志（winston / pino）：**

```typescript
// src/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});

// 使用
logger.info({ userId: '123', action: 'login' }, '用户登录成功');
logger.warn({ rateLimit: 100, ip: '1.2.3.4' }, '接近速率限制');
logger.error({ err: error, requestId: 'abc' }, '请求处理失败');

// 中间件：请求日志
import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: Date.now() - start,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
  });

  next();
}
```

### 健康检查

```typescript
// src/routes/health.ts
import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { redis } from '../lib/redis';

const router = Router();

// 基础健康检查（给负载均衡器用）
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 详细健康检查（给运维用）
router.get('/health/details', async (req, res) => {
  const checks = {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabase(),
      redis: await checkRedis(),
    },
  };

  const isHealthy = Object.values(checks.services).every(s => s.status === 'ok');

  res.status(isHealthy ? 200 : 503).json(checks);
});

async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'ok', latency: Date.now() };
  } catch (error) {
    return { status: 'error', error: (error as Error).message };
  }
}

async function checkRedis() {
  try {
    const start = Date.now();
    await redis.ping();
    return { status: 'ok', latency: Date.now() - start };
  } catch (error) {
    return { status: 'error', error: (error as Error).message };
  }
}
```

### 错误监控

| 工具 | 类型 | 特点 |
|------|------|------|
| **Sentry** | 错误追踪 | 前后端通用、Source Map 支持、性能监控 |
| **Grafana + Prometheus** | 指标监控 | 可视化仪表盘、告警规则 |
| **ELK Stack** | 日志分析 | Elasticsearch + Logstash + Kibana |
| **Datadog** | 全栈监控 | APM、日志、指标一体化 |

---

## 补充章节 H：项目架构模式与最佳实践

### 前端项目架构

```
src/
├── app/                    # 应用入口、路由配置、全局 Provider
│   ├── layout.tsx          # 根布局
│   ├── providers.tsx       # 全局 Provider（QueryClient、Theme、Auth）
│   └── router.tsx          # 路由配置
├── components/             # 通用 UI 组件
│   ├── ui/                 # 基础组件（Button、Input、Modal）
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts        # 统一导出
│   └── layout/             # 布局组件（Header、Sidebar、Footer）
├── features/               # 业务模块（按功能划分）
│   ├── auth/
│   │   ├── components/     # 登录表单、注册表单
│   │   ├── hooks/          # useAuth、useLogin
│   │   ├── services/       # authApi
│   │   ├── stores/         # authStore
│   │   ├── types.ts        # 类型定义
│   │   └── index.ts        # 模块导出
│   ├── dashboard/
│   └── user/
├── hooks/                  # 通用自定义 Hooks
├── lib/                    # 工具库（axios 封装、日期处理、格式化）
├── styles/                 # 全局样式、主题变量
├── types/                  # 全局类型定义
└── utils/                  # 工具函数
```

### 后端项目架构（NestJS 分层）

```
src/
├── common/                 # 公共模块
│   ├── decorators/         # 自定义装饰器
│   ├── filters/            # 异常过滤器
│   ├── guards/             # 认证/授权守卫
│   ├── interceptors/       # 拦截器（日志、转换、缓存）
│   ├── pipes/              # 验证管道
│   └── middleware/          # 中间件
├── config/                 # 配置模块
│   ├── app.config.ts
│   ├── database.config.ts
│   └── redis.config.ts
├── modules/
│   ├── auth/               # 认证模块
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── dto/            # 数据传输对象
│   │   ├── entities/       # 实体定义
│   │   ├── guards/
│   │   └── strategies/     # Passport 策略
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── dto/
│   └── posts/
├── prisma/                 # 数据库模块
│   ├── prisma.module.ts
│   ├── prisma.service.ts
│   └── schema.prisma
└── main.ts                 # 应用入口
```

### 环境变量管理

```typescript
// src/config/env.validation.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  CORS_ORIGIN: z.string().default('*'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ 环境变量验证失败:');
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }
  return result.data;
}

// main.ts
import { validateEnv } from './config/env.validation';
const env = validateEnv();
```

**.env 模板（.env.example）：**

```bash
# 应用
NODE_ENV=development
PORT=3000
LOG_LEVEL=info

# 数据库
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key-at-least-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRES_IN=15m

# CORS
CORS_ORIGIN=http://localhost:3000

# 第三方服务
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@example.com
SMTP_PASS=your-smtp-password

# 文件存储
S3_BUCKET=my-app-files
S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
```

### 错误处理最佳实践

```typescript
// 统一错误类
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string,          // 业务错误码
    public isOperational = true,  // 是否可预期
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string, code = 'BAD_REQUEST') {
    return new AppError(400, message, code);
  }

  static unauthorized(message = '未授权', code = 'UNAUTHORIZED') {
    return new AppError(401, message, code);
  }

  static forbidden(message = '权限不足', code = 'FORBIDDEN') {
    return new AppError(403, message, code);
  }

  static notFound(message = '资源不存在', code = 'NOT_FOUND') {
    return new AppError(404, message, code);
  }

  static conflict(message: string, code = 'CONFLICT') {
    return new AppError(409, message, code);
  }

  static internal(message = '服务器内部错误', code = 'INTERNAL_ERROR') {
    return new AppError(500, message, code, false);
  }
}

// 全局异常处理器
export function globalErrorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  // Zod 验证错误
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '参数验证失败',
        details: err.flatten().fieldErrors,
      },
    });
  }

  // 未知错误
  logger.error({ err, requestId: req.id }, '未处理的异常');
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' ? '服务器内部错误' : err.message,
    },
  });
}
```

---

## 补充章节 J：职业发展与软技能

### 薪资参考（2025-2026 国内一线城市）

| 级别 | 工作年限 | 月薪范围（税前） | 典型技术要求 |
|------|----------|------------------|--------------|
| 初级前端/后端 | 0-1 年 | 8K-15K | HTML/CSS/JS、框架基础、Git |
| 中级全栈 | 1-3 年 | 15K-30K | 框架深入、数据库设计、API 设计、基本部署 |
| 高级全栈 | 3-5 年 | 30K-50K | 系统设计、性能优化、技术选型、带人能力 |
| 资深/架构师 | 5-8 年 | 50K-80K | 分布式系统、架构设计、技术决策、跨团队协作 |
| 技术专家/总监 | 8+ 年 | 80K-150K+ | 技术战略、团队管理、业务理解、行业影响力 |

> 注：以上为参考范围，实际薪资受公司规模、行业、城市、个人能力等因素影响。外企/大厂可能更高。

### 软技能清单

| 技能 | 说明 | 如何培养 |
|------|------|----------|
| **沟通表达** | 能清晰地向技术和非技术人员解释方案 | 写技术博客、做技术分享、参与 Code Review |
| **项目管理** | 估算工时、拆分任务、把控进度 | 使用看板工具、参与需求评审、主动承担项目 |
| **团队协作** | Code Review、知识分享、帮助新人 | 积极参与 Review、编写文档、指导初级开发者 |
| **问题解决** | 分析问题、提出方案、评估风险 | 遇到问题先独立思考、记录解决方案、复盘总结 |
| **业务理解** | 理解产品目标、用户需求、商业模式 | 参与产品讨论、分析竞品、关注数据指标 |
| **学习能力** | 快速学习新技术、适应变化 | 保持好奇心、定期学习新技术、参与开源 |
| **抗压能力** | 在压力下保持高效产出 | 合理安排优先级、学会说不、保持工作生活平衡 |

### 简历优化建议

```
好的简历结构：
├── 个人信息（姓名、联系方式、GitHub、博客）
├── 技术栈（分类列出，标注熟练度）
├── 工作经历（STAR 法则）
│   ├── 公司名称 | 职位 | 时间
│   ├── 项目背景（Situation）
│   ├── 你的任务（Task）
│   ├── 你的行动（Action）← 重点
│   └── 项目成果（Result）← 用数据说话
├── 项目经历（2-3 个代表性项目）
└── 教育背景

STAR 法则示例：
❌ "负责前端开发"
✅ "主导电商平台前端重构（S），将 jQuery + JSP 迁移至 React + TypeScript（T），
   设计组件库、引入 CI/CD 流水线、优化首屏性能（A），
   页面加载时间从 3.2s 降至 1.1s，开发效率提升 40%，线上 Bug 率降低 60%（R）"
```

### 开源贡献指南

```
入门步骤：
1. 使用项目 → 发现问题/需求
2. 在 GitHub 上 Fork 项目
3. 阅读 CONTRIBUTING.md 和代码规范
4. 从小 issue 开始（标记为 "good first issue"）
5. 提交 PR → 等待 Review → 修改 → 合并

推荐参与的开源项目类型：
- 你日常使用的工具/库
- 中文技术社区项目
- 新兴技术项目（更容易被接受）
- 文档翻译/校对（门槛最低）
```

---

> **最后提醒：** 技术栈会不断变化，但核心原理（网络协议、数据结构、操作系统、设计模式）是长期不变的。在追逐新技术的同时，不要忽视计算机基础知识的积累。
>
> 全栈工程师不是要精通所有领域，而是具备**端到端交付产品**的能力。找到自己的强项，同时保持对其他领域的基本理解，这就是一个优秀的全栈工程师。
>
> **总预估学习时间：18-24 个月（每天 2-3 小时）**
>
> **文档版本：v2.2 | 最后更新：2026-06-07**

---

## 术语表

> 快速查阅文档中出现的核心术语和缩写。

| 术语 | 全称 | 含义 |
|------|------|------|
| **SPA** | Single Page Application | 单页应用，页面不刷新，通过 JS 动态切换内容 |
| **SSR** | Server-Side Rendering | 服务端渲染，首屏由服务器生成 HTML |
| **SSG** | Static Site Generation | 静态站点生成，构建时生成 HTML |
| **ISR** | Incremental Static Regeneration | 增量静态再生成，Next.js 的混合渲染方案 |
| **CSR** | Client-Side Rendering | 客户端渲染，浏览器端执行 JS 渲染页面 |
| **DOM** | Document Object Model | 文档对象模型，HTML 的树形结构表示 |
| **BOM** | Browser Object Model | 浏览器对象模型，如 window、navigator |
| **API** | Application Programming Interface | 应用程序编程接口 |
| **REST** | Representational State Transfer | 表述性状态转移，一种 API 设计风格 |
| **GraphQL** | Graph Query Language | 图查询语言，Facebook 提出的 API 方案 |
| **JWT** | JSON Web Token | 一种无状态的认证 Token 格式 |
| **ORM** | Object-Relational Mapping | 对象关系映射，如 Prisma、TypeORM |
| **CRUD** | Create, Read, Update, Delete | 增删改查，数据操作的基本模式 |
| **CI/CD** | Continuous Integration / Continuous Deployment | 持续集成/持续部署 |
| **CDN** | Content Delivery Network | 内容分发网络，加速静态资源访问 |
| **DNS** | Domain Name System | 域名系统，将域名解析为 IP 地址 |
| **HTTP** | HyperText Transfer Protocol | 超文本传输协议 |
| **HTTPS** | HTTP Secure | 加密的 HTTP 协议（基于 TLS） |
| **TLS** | Transport Layer Security | 传输层安全协议（SSL 的继任者） |
| **CORS** | Cross-Origin Resource Sharing | 跨域资源共享 |
| **CSP** | Content Security Policy | 内容安全策略，防止 XSS 攻击 |
| **XSS** | Cross-Site Scripting | 跨站脚本攻击 |
| **CSRF** | Cross-Site Request Forgery | 跨站请求伪造 |
| **SQL** | Structured Query Language | 结构化查询语言 |
| **NoSQL** | Not Only SQL | 非关系型数据库（如 MongoDB、Redis） |
| **ACID** | Atomicity, Consistency, Isolation, Durability | 事务的四大特性 |
| **CAP** | Consistency, Availability, Partition tolerance | 分布式系统的三个基本需求 |
| **BFC** | Block Formatting Context | 块级格式化上下文，CSS 布局概念 |
| **LCP** | Largest Contentful Paint | 最大内容绘制，Web Vitals 指标 |
| **FID** | First Input Delay | 首次输入延迟，Web Vitals 指标 |
| **CLS** | Cumulative Layout Shift | 累积布局偏移，Web Vitals 指标 |
| **FCP** | First Contentful Paint | 首次内容绘制 |
| **TTFB** | Time to First Byte | 首字节时间 |
| **RBAC** | Role-Based Access Control | 基于角色的访问控制 |
| **WS** | WebSocket | 全双工通信协议 |
| **SFC** | Single File Component | 单文件组件（Vue 的 .vue 文件） |
| **JSX** | JavaScript XML | JavaScript 的语法扩展（React 使用） |
| **TSX** | TypeScript JSX | TypeScript 的 JSX 语法 |
| **V8** | V8 JavaScript Engine | Chrome 和 Node.js 的 JS 引擎 |
| **NPM** | Node Package Manager | Node.js 包管理器 |
| **PNPM** | Performant NPM | 高性能的 NPM 替代方案 |
| **Vite** | 法语"快"的意思 | 下一代前端构建工具 |
| **Webpack** | Web Pack | 模块打包器（较老但仍广泛使用） |
| **ESLint** | ECMAScript Lint | JavaScript/TypeScript 代码检查工具 |
| **Prettier** | - | 代码格式化工具 |
| **Docker** | - | 容器化平台 |
| **Kubernetes (K8s)** | - | 容器编排平台 |
| **AWS** | Amazon Web Services | 亚马逊云服务 |
| **OSS** | Object Storage Service | 对象存储服务（阿里云） |
| **S3** | Simple Storage Service | 简单存储服务（AWS） |
| **PR** | Pull Request | 拉取请求，代码合并的流程 |
| **MR** | Merge Request | 合并请求（GitLab 中的 PR） |
| **CI** | Continuous Integration | 持续集成 |
| **CD** | Continuous Deployment / Delivery | 持续部署/交付 |
| **TDD** | Test-Driven Development | 测试驱动开发 |
| **BDD** | Behavior-Driven Development | 行为驱动开发 |
| **E2E** | End-to-End | 端到端测试 |
| **CRDT** | Conflict-free Replicated Data Type | 无冲突复制数据类型 |
| **DAG** | Directed Acyclic Graph | 有向无环图 |
| **LRU** | Least Recently Used | 最近最少使用（缓存淘汰策略） |
| **TTL** | Time To Live | 生存时间（缓存过期时间） |
| **WAF** | Web Application Firewall | Web 应用防火墙 |
| **CDP** | Chrome DevTools Protocol | Chrome 开发者工具协议 |
| **AOT** | Ahead-of-Time | 预编译（Angular 的编译方式） |
| **JIT** | Just-in-Time | 即时编译 |
| **SSE** | Server-Sent Events | 服务器推送事件 |
| **PWA** | Progressive Web App | 渐进式 Web 应用 |
| **SEO** | Search Engine Optimization | 搜索引擎优化 |
| **SSO** | Single Sign-On | 单点登录 |
| **OAuth** | Open Authorization | 开放授权协议 |
| **OIDC** | OpenID Connect | 基于 OAuth 2.0 的身份认证协议 |
| **PKCE** | Proof Key for Code Exchange | OAuth 2.0 的安全扩展 |
| **CQRS** | Command Query Responsibility Segregation | 命令查询职责分离 |
| **DDD** | Domain-Driven Design | 领域驱动设计 |
| **SOLID** | SRP, OCP, LSP, ISP, DIP | 面向对象设计五大原则 |
| **DRY** | Don't Repeat Yourself | 不要重复自己 |
| **KISS** | Keep It Simple, Stupid | 保持简单 |
| **YAGNI** | You Aren't Gonna Need It | 你不会需要它 |
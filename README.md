# AI你画我猜游戏

一个有趣的在线你画我猜游戏，玩家在画布上作画，AI系统负责猜测画的是什么内容。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **AI模型**: 硅基流动 - Qwen/QVQ-72B-Preview

## 功能特性

- 🎨 实时画布绘画功能
- 🖌️ 可调节画笔大小和颜色
- 🤖 AI智能识别画作内容
- 🎯 简洁美观的用户界面
- ⚡ 快速响应和流畅体验

## 开始使用

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 文件为 `.env.local`：

```bash
cp .env.example .env.local
```

然后在 `.env.local` 中填入你的硅基流动API密钥：

```
SILICONFLOW_API_KEY=你的API密钥
```

> 在 [硅基流动官网](https://cloud.siliconflow.cn/) 注册并获取API密钥

### 3. 运行开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 使用说明

1. 使用鼠标在画布上自由绘画
2. 可以调整画笔大小和颜色
3. 画完后点击"让AI猜一猜"按钮
4. AI会分析你的画作并给出猜测
5. 如果想重新开始，点击"清空画布"

## 项目结构

```
ai-guess-drawing/
├── app/
│   ├── api/
│   │   └── guess/
│   │       └── route.ts      # API路由：调用硅基流动API
│   ├── layout.tsx             # 根布局
│   ├── page.tsx               # 主页面
│   └── globals.css            # 全局样式
├── components/
│   └── DrawingCanvas.tsx      # 画布组件
├── .env.local                 # 环境变量（需自行创建）
├── .env.example               # 环境变量示例
├── next.config.ts             # Next.js配置
├── tailwind.config.ts         # Tailwind配置
├── tsconfig.json              # TypeScript配置
└── package.json               # 项目依赖
```

## API说明

### POST /api/guess

请求体：
```json
{
  "imageData": "data:image/png;base64,..."
}
```

响应：
```json
{
  "guess": "AI的猜测内容",
  "fullResponse": { ... }
}
```

## 构建生产版本

```bash
npm run build
npm start
```

## 部署

可以部署到 Vercel、Netlify 等平台：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

部署前记得在平台上配置环境变量 `SILICONFLOW_API_KEY`。

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

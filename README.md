![Nextjango Banner](https://raw.githubusercontent.com/YOUR_USERNAME/NEXTJANGO_REPO/main/assets/nextjango-github-banner.png)

# ⚡ Nextjango

> Scaffold modern full-stack apps with Next.js + Django — instantly.

**Nextjango** is a blazing-fast CLI tool that jumpstarts your full-stack development
by scaffolding a modern frontend with **Next.js** and a powerful backend using **Django**.
Built for developers who want flexibility, security, and complete control
— without wasting time on boilerplate.

## 🚀 Features

- ✅ Generate a full-stack project with `Next.js` + `Django` in seconds
- 🧱 Built-in support for **TypeScript**, **Tailwind CSS**, and **PostgreSQL**
- 🔒 Secure backend with Django and admin path obfuscation
- 🔗 API-ready and configurable for REST or GraphQL (coming soon)
- 🧪 Developer-first architecture with batteries included, but replaceable
- 🧰 Easily extendable with custom page and model generators

## 📦 Installation

Install Nextjango globally (optional):

```bash
npm install -g nextjango
```

🛠️ Usage

Initialize Nextjango in a project directory:

```bash
npx nextjango init
```

Create a full-stack page (auto-wired front to back):

```bash
npx nextjango create-page about
```

🏷️ Alias Setup

You can use the installed alias "nj" instead of nextjango:

```json
{
  "scripts": {
    "nj": "nextjango"
  }
}
```

Now you can run:

```bash
pnpm nj create-page about
```

Or with npm (your choice):

```bash
npm run nj -- create-page about
```

Project Structure:

```txt
my-app/
├── frontend/         # Next.js + Tailwind + App Router
│   └── ...
├── backend/          # Django + REST-ready setup
│   └── ...
└── shared/           # Common types, constants, or utils (optional)
```

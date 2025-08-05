![Nextjango Banner](https://github.com/sylkenio/nextjango/blob/master/main/assets/nextjango-github-banner.svg)

# ⚡ Nextjango

# (CURRENTLY IN DEVELOPMENT, STAY TUNED!)

[![npm](https://img.shields.io/npm/v/nextjango.svg)](https://www.npmjs.com/package/nextjango)

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

## 🐍 Optional Python requirement

Python 3 is optional but needed for the Django backend and for running
the Python-dependent test suites. When Python isn't installed, those
tests will automatically be skipped.

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

🧙 The CLI will guide you to select a package manager with the arrow keys if none is found.

You can also specify one manually:

```bash
npx nextjango init --package-manager pnpm
```

## 🧑‍💻 Development

Start both backend and frontend dev servers together:

```bash
npm run dev
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

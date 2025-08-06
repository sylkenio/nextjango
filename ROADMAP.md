# 🛣️ Nextjango Roadmap

This is the official roadmap for **Nextjango** — a full-stack CLI built to instantly scaffold and wire up a Next.js + Django application.

This document will help contributors and users understand where the project is headed and what major features are planned.

---

## ✅ Completed

- `npx nextjango init` command
- Next.js + Django bootstrapping
- Frontend + backend unified `npm run dev`
- Preconfigured structure with `www/`, `cli/`, and `.env` handling
- Landing page and GitHub Discussions launch

---

## 🚧 In Progress / Coming Soon

### 🔨 Generators

- `npx nextjango create-page <page-name>`
  - Auto-generates a new Next.js page
  - Optionally links to a Django view or API route

### 💾 Database Prompts

- Prompt during init to select:
  - PostgreSQL
  - SQLite
  - MySQL
- Auto-generate `.env` variables accordingly
- Option to start with a blank DB setup

### 🧪 Testing & Dev Experience

- Pre-wired testing frameworks (e.g. Vitest / Pytest)
- CLI flag for enabling tests during scaffolding

### 🧱 Component Presets (Optional)

- Prebuilt dashboard shell
- Auth-enabled layout (with `next-auth` + Django sync)

---

## 🔮 Future Ideas

- `npx nextjango deploy` templates (Vercel + Render preconfig)
- CLI config file (`.nextjango`) for persistent options
- Optional Docker setup
- Internal plugin system
- VS Code extension

---

## 💜 Built by [Sylken](https://sylken.io)

Nextjango is built to remove boilerplate friction and speed up full-stack production.  
We welcome feedback and collaboration — see [CONTRIBUTING.md](./CONTRIBUTING.md) to get involved!

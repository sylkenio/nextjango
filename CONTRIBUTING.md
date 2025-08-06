# Contributing to Nextjango

Thanks for your interest in contributing to **Nextjango**! This project is in active development, and community involvement is welcome — especially from fellow full-stack devs who want better tooling without boilerplate pain.

That said: this is a vision-driven project. Please read the guidelines below before submitting PRs, issues, or ideas.

---

## 🧭 Ground Rules

- 🙋‍♂️ **Start with an issue**: For significant changes, open an issue first to discuss. PRs without context or approval may be rejected.
- 🧹 **Keep it clean**: Write clear, consistent, well-commented code. This repo follows modern formatting conventions and minimal abstractions.
- 📦 **No bloat**: Avoid adding unnecessary dependencies or features unless they're clearly scoped and approved.
- 🐛 **Fixes > Features**: Bug reports, performance improvements, and tests are always appreciated.
- ✍️ **Docs matter**: Typos, better examples, or explanations in the docs are just as valuable as code.

---

## 🛠️ Local Dev Setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/sylkenio/nextjango.git
cd nextjango
npm install
```

Start the full-stack dev server:

```bash
npm run dev
```

This will launch both the frontend and backend together — no need for separate terminals.

---

## 📁 Project Structure

This repo contains the full CLI code and landing site:

- `/cli/` – the Nextjango CLI logic
- `/www/` – the Next.js + Django starter app
- `/docs/` – documentation (coming soon)

---

## ✅ Recommended PRs

- Bug fixes
- Typo corrections
- README enhancements
- Testing improvements
- Feature flags or internal tooling

---

## 🚫 Please Avoid (for now)

- Swapping core frameworks
- Adding full themes or visual overhauls
- Adding auth/user layers unless coordinated
- Replacing or rewriting CLI init logic

---

## 🧙‍♂️ Final Say

This project is maintained by [Sylken](https://sylken.io). All PRs are reviewed case-by-case. If something doesn’t align with the core vision, it may be declined — but thoughtful contributions are always appreciated.

---

## 💬 Questions?

Open a [Discussion](https://github.com/sylkenio/nextjango/discussions) or start a new issue to chat about ideas.

Thanks for being here 🙏

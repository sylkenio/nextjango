# Shared Template

Common utilities, types, or constants that are used by both the frontend and backend can be placed here.

## Development helper

Run both the Django and Next.js development servers together:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun dev
```

This command starts `python manage.py runserver` for the backend and the chosen package manager's `dev` command for the frontend, shutting down both when one exits.

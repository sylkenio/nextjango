# Shared Template

Common utilities, types, or constants that are used by both the frontend and backend can be placed here.

## Development helper

Run both the Django and Next.js development servers together:

```bash
./shared/dev.sh
```

This script starts `python manage.py runserver` for the backend and `npm run dev` for the frontend, shutting down both when one exits.

#!/usr/bin/env bash
set -e

# Determine project root relative to this script
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

trap "kill 0" EXIT

(
  cd "$ROOT_DIR/backend"
  python manage.py runserver
) &

(
  cd "$ROOT_DIR/frontend"
  npm run dev
) &

wait

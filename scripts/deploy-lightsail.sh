#!/usr/bin/env bash
# Update production on the Lightsail host (run ON the server as the deploy user).
# Default app path matches DEPLOY.md.
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/nuevetech}"
REPO_URL="${REPO_URL:-https://github.com/getnuevetech/nuevetechw.git}"
BRANCH="${BRANCH:-main}"

cd "$APP_DIR"

# Prefer nuevetechw (where venture/footer updates merged). Fall back if already cloned.
if [ -d .git ]; then
  current="$(git remote get-url origin 2>/dev/null || true)"
  echo "Current origin: ${current:-none}"
  if [[ "$current" != *"nuevetechw"* ]]; then
    echo "Switching origin to $REPO_URL"
    git remote set-url origin "$REPO_URL"
  fi
  git fetch origin "$BRANCH"
  git checkout "$BRANCH"
  git pull --ff-only origin "$BRANCH"
else
  git clone --branch "$BRANCH" "$REPO_URL" .
fi

docker compose up --build -d
docker compose ps
curl -sS -o /dev/null -w "local_http:%{http_code}\n" http://127.0.0.1/
echo "Done. Verify https://nuevetech.io"

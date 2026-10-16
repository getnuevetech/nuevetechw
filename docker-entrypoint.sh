#!/bin/sh
set -eu

# Allow one-off commands that don't need DB (e.g. debugging) via SKIP_DB_WAIT=1
wait_for_db() {
  if [ "${SKIP_DB_WAIT:-0}" = "1" ]; then
    return 0
  fi

  if [ -z "${DATABASE_URL:-}" ]; then
    echo "DATABASE_URL is not set" >&2
    exit 1
  fi

  # Log host/db only (never the password)
  echo "Waiting for database..."
  node --input-type=module -e "
    try {
      const u = new URL(process.env.DATABASE_URL);
      console.log('DATABASE_URL target: ' + u.protocol + '//' + u.username + '@' + u.hostname + ':' + (u.port || '3306') + u.pathname);
    } catch (e) {
      console.error('DATABASE_URL is not a valid URL. Use: mysql://USER:PASSWORD@db:3306/DBNAME');
      process.exit(1);
    }
  "

  i=0
  max="${DB_WAIT_MAX_ATTEMPTS:-60}"
  last_err=""
  while [ "$i" -lt "$max" ]; do
    set +e
    last_err=$(node --input-type=module -e "
      import mysql from 'mysql2/promise';
      try {
        const conn = await mysql.createConnection(process.env.DATABASE_URL);
        await conn.ping();
        await conn.end();
        process.exit(0);
      } catch (e) {
        console.error((e && (e.code || e.message)) || e);
        process.exit(1);
      }
    " 2>&1)
    status=$?
    set -e
    if [ "$status" -eq 0 ]; then
      echo "Database is ready."
      return 0
    fi
    # Print the error every 5 attempts so logs show the real cause
    if [ $((i % 5)) -eq 0 ]; then
      echo "DB not ready yet (${last_err})" >&2
    fi
    i=$((i + 1))
    sleep 2
  done

  echo "Database did not become ready in time. Last error: ${last_err}" >&2
  echo "Check: DATABASE_URL host must be 'db' (not localhost), and USER/PASSWORD must match MYSQL_USER/MYSQL_PASSWORD from the first DB init." >&2
  echo "If you changed passwords after first boot, reset the volume: docker compose down -v && docker compose up -d" >&2
  exit 1
}

push_schema() {
  if [ "${SKIP_DB_WAIT:-0}" = "1" ] || [ "${RUN_DB_PUSH:-1}" != "1" ]; then
    return 0
  fi
  echo "Syncing database schema (drizzle-kit push)..."
  npx --no-install drizzle-kit push --force
}

wait_for_db
push_schema

exec "$@"

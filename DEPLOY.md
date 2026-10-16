# Deploy with Docker (Amazon Lightsail)

This app is a single Node process: Vite-built React UI + Hono/tRPC API (`npm start` → `dist/boot.js` on port **3000**). MySQL is required for the contact form / CMS data.

**Caddy** is included in Compose and is the only public entrypoint (**80/443**). The app and MySQL stay on the internal Docker network — **port 3000 is not published**.

## Quick start (any Docker host)

```bash
cp .env.docker.example .env
# set MySQL passwords

docker compose up --build -d
```

Site: `http://SERVER_IP/` (or your domain).  
Schema sync runs automatically on startup (`RUN_DB_PUSH=1`).

---

## Lightsail instance + Docker Compose (recommended)

### 1. Create the instance
- Blueprint: **Ubuntu 24.04** (or 22.04)
- Size: **2 GB RAM** preferred (image build needs memory)
- Networking: open **SSH (22)**, **HTTP (80)**, **HTTPS (443)** — do **not** open 3000
- Attach a **static IP**; point your domain A record at it (for HTTPS)

### 2. Install Docker
```bash
sudo apt update && sudo apt install -y ca-certificates curl
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# log out/in, then:
docker compose version
```

### 3. Stop host Nginx if it is installed
Caddy needs ports 80/443. If you previously installed Nginx:

```bash
sudo systemctl disable --now nginx
```

### 4. Clone and configure
```bash
sudo mkdir -p /var/www/nuevetech && sudo chown $USER:$USER /var/www/nuevetech
cd /var/www/nuevetech
git clone https://github.com/getnuevetech/nuevetechweb.git .
cp .env.docker.example .env
nano .env
```

Required for the **public marketing site**:
| Variable | Notes |
|----------|--------|
| `MYSQL_*` / `DATABASE_URL` | Must match; host must be `db` |

Caddy listens on **:80** and **:443** (see `Caddyfile`). Port 443 uses a local cert until you switch to a domain for Let’s Encrypt.

Optional (only for `/login` + `/admin` via Kimi OAuth):
| Variable | Notes |
|----------|--------|
| `APP_ID` / `APP_SECRET` | Kimi OAuth app credentials |
| `VITE_APP_ID` / `VITE_KIMI_AUTH_URL` | Baked into the frontend at **image build** time |
| `KIMI_AUTH_URL` / `KIMI_OPEN_URL` | Backend OAuth endpoints |
| `OWNER_UNION_ID` | That user becomes admin on first login |

If using admin login, register:

`https://YOUR_DOMAIN/api/oauth/callback`

### 5. Build and run
```bash
docker compose up --build -d
docker compose ps
docker compose logs -f caddy
docker compose logs -f app
```

Check from the server:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1/
```

### 6. HTTPS domain config
`Caddyfile` is already set for `nuevetech.io` + `www`. Ensure DNS A records point at the Lightsail static IP and ports **80/443** are open, then:

```bash
docker compose up -d caddy
docker compose logs -f caddy
```

For IP-only (no domain), use:

```bash
cp Caddyfile.ip.example Caddyfile
docker compose up -d caddy
```

### 7. Updates
```bash
cd /var/www/nuevetech
git pull
docker compose up --build -d
```

Rebuild is required after changing any `VITE_*` value.

---

## Lightsail Container Service (optional)

Compose MySQL + Caddy do **not** map 1:1 onto Container Service. Prefer the OS instance path above, or use a managed MySQL DB and Lightsail’s own HTTPS endpoint with only the app image.

---

## Useful commands

```bash
docker compose logs -f app
docker compose logs -f caddy
docker compose logs -f db
docker compose exec app sh
docker compose down          # stop (keeps MySQL + Caddy volumes)
docker compose down -v       # stop and DELETE volumes (DB + TLS certs)
```

### If app loops on “Waiting for database…”

`db` can be healthy while the app still cannot log in.

```bash
docker compose logs --tail=50 app
docker compose exec app printenv DATABASE_URL
grep -E '^(MYSQL_|DATABASE_URL=)' .env
```

If you changed MySQL passwords after the first successful `db` start, reset the volume (destroys DB data):

```bash
docker compose down -v
docker compose up -d --build
docker compose logs -f app
```

### If `db` is unhealthy

```bash
docker compose logs db
docker compose ps
free -h
```

Common causes:
- **Low memory** — MySQL 8 needs ~512MB+. Use a **2 GB** Lightsail plan (or add swap).
- **Bad `.env` passwords** — avoid `#`, `"`, `'`, spaces, or `$` in passwords.
- **Corrupt volume after a crashed first boot** — `docker compose down -v && docker compose up -d`

### If Caddy cannot bind to 80/443

Something else (usually host Nginx) is using those ports:

```bash
sudo ss -tlnp | grep -E ':80|:443'
sudo systemctl disable --now nginx
docker compose up -d caddy
```

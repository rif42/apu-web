# APU Web - Local Development Setup

## Prerequisites

- [Bun](https://bun.sh/) (v1.3.9+)
- [Node.js](https://nodejs.org/) (v22.12.0+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for full setup with Directus)

## Quick Start Options

### Option 1: Astro Frontend Only (No CMS)

If you're only working on the UI/frontend and don't need the CMS:

```bash
bun install
bun run astro:dev
```

Open http://localhost:4322

### Option 2: Full Stack (Astro + Directus CMS)

1. **Start the database and CMS:**
   ```bash
   docker compose up -d
   ```

2. **Wait for services to be ready** (about 10-15 seconds)

3. **Run the full dev environment:**
   ```bash
   bun run dev
   ```
   
   This starts both Directus (http://localhost:8055) and Astro (http://localhost:4322)

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run astro:dev` | Astro dev server only (port 4322) |
| `bun run dev` | Full stack: Directus + Astro |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run directus:start` | Start Directus only |

## Default Credentials

- **Directus Admin**: http://localhost:8055/admin
  - Email: `admin@kimiclaw.local`
  - Password: `admin12345`

## Troubleshooting

### Port already in use
If port 4322 or 8055 is taken, check what's using it:
```bash
# Windows
netstat -ano | findstr :4322

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Database connection issues
Make sure Docker is running:
```bash
docker ps
```

If postgres isn't starting, check logs:
```bash
docker compose logs postgres
```

### Reset everything
```bash
docker compose down -v  # Remove volumes
docker compose up -d    # Start fresh
```
# Docker Setup Guide - WrapperDetector

## Quick Start

### Prerequisites
- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (comes with Docker Desktop)

### 1. Set Environment Variables

Create a `.env` file in the root directory:
```bash
cp .env.docker.example .env
```

Edit `.env` and add your Groq API key:
```env
AI_API_KEY=your_groq_api_key_here
VITE_API_URL=http://localhost:8000
```

### 2. Build and Run

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Backend Health Check**: http://localhost:8000/

### 4. Stop Services

```bash
# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

## Individual Service Commands

### Build Individual Services

```bash
# Build backend only
docker-compose build backend

# Build frontend only
docker-compose build frontend
```

### Run Individual Services

```bash
# Run backend only
docker-compose up backend

# Run frontend only
docker-compose up frontend
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## Development Mode

For development with hot reload, you can run services individually:

### Backend (with hot reload)
```bash
cd back
npm install
npm run dev
```

### Frontend (with hot reload)
```bash
cd web
npm install
npm run dev
```

Or use Docker with volume mounts for development (see `docker-compose.dev.yml` below).

---

## Production Build

### Build for Production

```bash
# Build production images
docker-compose -f docker-compose.yml build

# Tag for registry (optional)
docker tag wrapper-detector-backend:latest your-registry/wrapper-detector-backend:latest
docker tag wrapper-detector-frontend:latest your-registry/wrapper-detector-frontend:latest
```

### Run Production Build

```bash
docker-compose up -d
```

---

## Docker Commands Reference

### Build
```bash
# Build all services
docker-compose build

# Build without cache
docker-compose build --no-cache

# Build specific service
docker-compose build backend
```

### Run
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Start and rebuild
docker-compose up --build
```

### Stop/Remove
```bash
# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop, remove containers and volumes
docker-compose down -v

# Remove everything including images
docker-compose down --rmi all
```

### Inspect
```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Execute command in container
docker-compose exec backend sh
docker-compose exec frontend sh

# Check service health
docker-compose ps
```

---

## Troubleshooting

### Port Already in Use
If port 3000 or 8000 is already in use, modify `docker-compose.yml`:
```yaml
ports:
  - "3001:80"  # Change 3000 to 3001
  - "8001:8000"  # Change 8000 to 8001
```

### Environment Variables Not Working
- Ensure `.env` file exists in root directory
- Check variable names match in `docker-compose.yml`
- Restart containers: `docker-compose restart`

### Build Fails
```bash
# Clean build without cache
docker-compose build --no-cache

# Check logs
docker-compose build 2>&1 | tee build.log
```

### Container Won't Start
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Check container status
docker-compose ps

# Inspect container
docker-compose exec backend sh
```

### Frontend Can't Connect to Backend
- Ensure `VITE_API_URL` in `.env` matches backend URL
- For Docker, use service name: `http://backend:8000` (internal) or `http://localhost:8000` (external)
- Rebuild frontend after changing `VITE_API_URL`: `docker-compose build frontend`

### Permission Issues (Linux)
```bash
# Fix permissions
sudo chown -R $USER:$USER .
```

---

## Dockerfile Details

### Backend Dockerfile
- **Base**: `node:18-alpine` (lightweight)
- **Port**: 8000
- **Health Check**: HTTP GET to `/`
- **Volumes**: `prompt.txt` mounted for easy updates

### Frontend Dockerfile
- **Build Stage**: Node.js 18 Alpine
- **Production Stage**: Nginx Alpine
- **Port**: 80 (mapped to 3000)
- **Health Check**: HTTP GET to `/`
- **SPA Support**: Nginx configured for React Router

---

## Advanced Configuration

### Custom Network
The `docker-compose.yml` creates a custom bridge network. Services can communicate using service names:
- Backend: `http://backend:8000`
- Frontend: `http://frontend:80`

### Volume Mounts
For development, you can mount source code:
```yaml
volumes:
  - ./back:/app
  - ./web:/app
```

### Resource Limits
Add to `docker-compose.yml`:
```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 512M
```

---

## Deployment with Docker

### Option 1: Docker Hub
```bash
# Tag images
docker tag wrapper-detector-backend:latest yourusername/wrapper-detector-backend:latest
docker tag wrapper-detector-frontend:latest yourusername/wrapper-detector-frontend:latest

# Push to Docker Hub
docker push yourusername/wrapper-detector-backend:latest
docker push yourusername/wrapper-detector-frontend:latest
```

### Option 2: Private Registry
```bash
# Tag for private registry
docker tag wrapper-detector-backend:latest registry.example.com/wrapper-detector-backend:latest

# Push
docker push registry.example.com/wrapper-detector-backend:latest
```

### Option 3: Cloud Platforms
- **Railway**: Supports Docker Compose
- **Render**: Supports Dockerfiles
- **Fly.io**: Supports Dockerfiles
- **DigitalOcean App Platform**: Supports Docker Compose

---

## Health Checks

Both services include health checks:
- **Backend**: Checks `/` endpoint every 30s
- **Frontend**: Checks nginx root every 30s

View health status:
```bash
docker-compose ps
```

---

## Security Notes

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use secrets management** in production (Docker secrets, Kubernetes secrets, etc.)
3. **Keep images updated** - Regularly update base images
4. **Scan images** - Use `docker scan` to check for vulnerabilities
5. **Limit resources** - Set CPU/memory limits in production

---

## Performance Tips

1. **Use multi-stage builds** - Already implemented (reduces image size)
2. **Layer caching** - Order Dockerfile commands from least to most frequently changing
3. **Alpine images** - Use lightweight Alpine base images (already done)
4. **Build cache** - Use `--cache-from` for CI/CD pipelines
5. **Production builds** - Use `npm ci` instead of `npm install` (already done)

---

## Next Steps

1. ✅ Build and test locally: `docker-compose up --build`
2. ✅ Verify health checks: `docker-compose ps`
3. ✅ Test API: `curl http://localhost:8000/`
4. ✅ Test frontend: Open http://localhost:3000
5. Deploy to your preferred platform (see `DEPLOYMENT.md`)


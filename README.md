# 🚀 Full‑Stack User Manager

A production-ready Docker Swarm application with:

- **Frontend**: Next.js 15 + Tailwind CSS (TypeScript)  
- **Backend**: Express + Mongoose + Redis + MongoDB (TypeScript)  
- **Proxy**: nginx routing for `frontend` and `backend` subdomains  
- **Orchestration**: Docker Swarm (`docker stack deploy`), overlay network, volumes, and replicas

---

## 📁 Folder Structure

```bash
project-root/
├── backend/
│ ├── src/
│ │ ├── app.ts
│ │ ├── routes/users.ts
│ │ ├── utils/db.ts
│ │ └── utils/cache.ts
│ ├── models/User.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── .env
├── frontend/
│ ├── app/
│ │ ├── api/proxy/route.ts
│ │ ├── layout.tsx
│ │ ├── head.tsx
│ │ ├── page.tsx
│ │ └── users/[…] – listing, detail, edit pages
│ ├── components/
│ │ ├── NavBar.tsx
│ │ ├── UserList.tsx
│ │ └── UserForm.tsx
│ ├── package.json
│ ├── tsconfig.json
│ ├── tailwind.config.js
│ ├── next.config.js
│ └── .env.local
├── nginx/
│ ├── nginx.conf
│ ├── proxy_params
│ └── Dockerfile (optional if using official image)
├── sample-compose.yml
└── README.md
```


---

## ⚙️ Prerequisites

Before proceeding, ensure you have installed:

- Docker (>= 20.10) & Docker Compose  
- Docker Swarm support  
- Node.js (>= 18) and npm (for local dev)  
- Git *(optional)*

---

## 🔧 Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend API runs at http://localhost:4000/users




## Frontend

```bash
cd frontend
npm install
npm run dev
```

Access the app at http://localhost:3000, which proxies API calls via /api/proxy/users.


## 🐳 Docker Swarm Deployment

### 1. Initialize Swarm & Deploy Stack

```bash
docker swarm init
docker stack deploy -c sample-compose.yml sample
```

This sets up:

- Services: mongo, redis, backend, frontend, and nginx
- Two replicas each for frontend and backend
- Persistent volumes, overlay network, and port 80 via nginx

 ### 2. Inspect Deployment

```bash
docker stack services sample
docker stack ps sample
```

 ### 3. Teardown

 ```bash
docker stack rm sample
docker volume prune
docker network prune
```


## 🔍 Project Overview

- backend/src/app.ts
Boots Express server, initializes MongoDB and Redis, sets middleware, and registers user routes

- backend/src/routes/users.ts
Provides CRUD API with Mongoose and Redis caching

- frontend/app/
Implements listing, detail, and edit user pages using Next.js App Router

- frontend/app/api/proxy/route.ts
Proxies frontend API calls to backend for clean routing

- nginx/nginx.conf
Defines reverse-proxy rules for front.example.com and back.example.com


## ⚙️ Configuration Settings

### Backend (backend/.env)

```bash
PORT=4000
MONGO_URI=mongodb://mongo:27017/appdb
REDIS_URL=redis://redis:6379
CACHE_TTL=60
```


### Frontend (frontend/.env.local)

```bash
NEXT_PUBLIC_API_BASE_URL=http://back.example.com
```


## ✅ Summary

### You now have a robust, production-grade architecture featuring:

- Full TypeScript stack

- Caching with Redis

- Docker Swarm orchestration

- nginx for subdomain routing

- Volume-backed storage


## 🧩 Optional Add-ons

- HTTPS with Let’s Encrypt

- Health checks or metrics with Prometheus/Grafana

- CI/CD integration with GitHub Actions


Feel free to ask if you'd like assistance with any of these enhancements!


## 🙏 Contributions & Support

Contributions are welcome—please submit issues or pull requests.
For questions or guidance, feel free to contact me.
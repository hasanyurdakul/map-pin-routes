## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Docker Deployment

### Build and run with Docker

```bash
docker build -t map-pin-routes .
docker run -p 3000:3000 map-pin-routes
```

### Using Docker Compose

```bash
docker-compose up -d
docker-compose down
```

# CO2 Carbonation Calculator

A web app to calculate CO2 equilibrium pressure and carbonation time for homebrewed beer.

Live at: **https://smph.gcourtot.fr**

## Why

When I started kegging instead of bottling my beers I had to figure out which pressure to apply to my keg in order to get a good beer. I used [this spreadsheet](https://www.brassageamateur.com/forum/download/file.php?id=296) from the [brassageamateur.com](https://www.brassageamateur.com/forum/viewtopic.php?f=56&t=7652&p=84017&hilit=boite+%C3%A0+outils+carbo#p84017) community. It works but I need to have a computer. So I decided to port it to a web tool.

<p align="center">
  <img src="screenshot.jpeg" width="45%"/>
</p>

## What it does

- Calculates CO2 equilibrium pressure based on temperature and desired carbonation
- Estimates carbonation time based on keg parameters
- Available as a PWA — add it to your home screen from your browser

## Usage

1. Select your beer style and adjust the desired carbonation level
2. Enter temperature, volume, exchange surface, initial pressure and keg pressure
3. Hit **Calculate**

## Stack

| Component   | Technology |
|-------------|------------|
| Frontend    | HTML / CSS / Vanilla JavaScript |
| Server      | Apache HTTPd (Docker image `httpd:alpine3.21`) |
| CI/CD       | GitHub Actions |
| Registry    | Docker Hub |
| Deployment  | n8n (webhook → Watchtower) |

## Run locally

```bash
docker build -t carbo .
docker run -d -p 8080:80 carbo
# Open http://localhost:8080
```

## CI/CD

### Pull Request → `main`

1. Build the Docker image
2. Start the container
3. Verify that `/version.txt` contains the correct commit SHA

### Push to `main`

1. Tag the current `latest` image as `previous` (for rollback)
2. Build and push the new `latest` image to Docker Hub
3. Trigger deployment via n8n webhook
4. Verify in production that `/version.txt` matches the expected SHA
5. **Automatic rollback** if the production check fails: `previous` is re-tagged as `latest` and redeployed

### Required secrets

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN`    | Docker Hub access token |
| `N8N_WEBHOOK_ID`     | n8n webhook ID triggering the redeployment |

---

MIT License — Nem0oo

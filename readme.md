```bash
docker build -t iol-scraper .
docker run --env-file .env -p 3000:3000 iol-scraper
```

FROM mcr.microsoft.com/playwright:v1.44.1-jammy

WORKDIR /app

COPY package*.json ./

ENV PLAYWRIGHT_BROWSERS_PATH=0

RUN npm ci

COPY . .

RUN npx tsc

EXPOSE 3000

CMD ["node", "./dist/index.js"]

FROM mcr.microsoft.com/playwright:v1.44.1-jammy

WORKDIR /app

COPY . .

ENV PLAYWRIGHT_BROWSERS_PATH=0

RUN npm install

RUN npx tsc

EXPOSE 3000

CMD ["npm", "start"]

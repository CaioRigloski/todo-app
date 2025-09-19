FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ libssl-dev netcat-openbsd

COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm install -g @nestjs/cli

COPY . .

# Build
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

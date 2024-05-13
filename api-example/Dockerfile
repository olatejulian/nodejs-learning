FROM node:lts-alpine AS builder

WORKDIR /build

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

FROM node:lts-alpine AS runner

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules

COPY --from=builder /build/dist ./dist

RUN apk add -U dumb-init tzdata

ENV TZ=America/Sao_Paulo

RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000

CMD ["/usr/bin/dumb-init", "node", "dist/main"]

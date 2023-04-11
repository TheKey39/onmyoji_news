FROM node:14.17.0 AS builder
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/onmyoji-arena-front /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
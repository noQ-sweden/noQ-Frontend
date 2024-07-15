FROM node:22-alpine as frontend

WORKDIR /frontend

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=frontend /frontend/dist /usr/share/nginx/html
EXPOSE 10000
CMD ["nginx", "-g", "daemon off;"] 
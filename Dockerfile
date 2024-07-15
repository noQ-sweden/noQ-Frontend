FROM node:22-alpine as frontend

WORKDIR /frontend

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

RUN adduser --disabled-password --no-create-home app && \
    mkdir -p /vol/web/frontend && \
    chown -R app:app /vol/web/frontend && \
    chmod -R 755 /vol/web/frontend && \
    cp -rf dist/* /vol/web/frontend

USER app

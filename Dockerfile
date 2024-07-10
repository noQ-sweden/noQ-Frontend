FROM node:20-bookwork-slim 

WORKDIR /app
COPY . .

RUN npm install

CMD ["npm", "run", "build"]

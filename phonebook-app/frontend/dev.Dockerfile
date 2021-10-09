FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

CMD ["npm", "start"]

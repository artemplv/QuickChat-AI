FROM node:14-alpine

WORKDIR /opt/messenger-web-app/

COPY package.json package-lock.json /opt/messenger-web-app/

RUN npm install

COPY . /opt/messenger-web-app

ARG CLIENT_PORT
EXPOSE ${CLIENT_PORT}

CMD ["npm", "run", "start"]

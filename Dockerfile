FROM node:12

WORKDIR /opt/messenger-web-app/

COPY package.json /opt/messenger-web-app
COPY package-lock.json /opt/messenger-web-app
COPY . /opt/messenger-web-app

ARG CLIENT_PORT

EXPOSE ${CLIENT_PORT}

RUN npm install

CMD ["npm", "run", "start"]

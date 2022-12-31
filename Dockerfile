FROM node:14-alpine

WORKDIR /opt/messenger-web-app/

COPY package.json package-lock.json /opt/messenger-web-app/

RUN npm install

COPY . /opt/messenger-web-app

EXPOSE $PORT

CMD ["npm", "run", "start"]

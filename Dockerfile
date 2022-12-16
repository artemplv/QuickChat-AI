FROM node:12

WORKDIR /opt/messenger-web-app/

COPY package.json /opt/messenger-web-app
COPY package-lock.json /opt/messenger-web-app
COPY . /opt/messenger-web-app

EXPOSE 3001

RUN npm install

CMD ["npm", "run", "start"]

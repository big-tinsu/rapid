FROM node:22.13.1

ENV ENV=production

WORKDIR /frontend

COPY package.json /frontend
COPY . .

RUN npm install

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]

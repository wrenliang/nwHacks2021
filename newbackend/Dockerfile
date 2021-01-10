FROM node:12-alpine

RUN mkdir -p /home/node/nwhacks/node_modules && chown -R node:node /home/node/nwhacks

WORKDIR /home/node/nwhacks

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD ["node", "src/app.js"]
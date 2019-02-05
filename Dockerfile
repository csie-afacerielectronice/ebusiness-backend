FROM node:11

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run dev" ]

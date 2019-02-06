FROM node:11.9-alpine

WORKDIR /app

COPY package.json package.json

RUN npm install --quiet

COPY . .

RUN npm run db:migrate

EXPOSE 5000

CMD [ "npm", "run", "dev" ]

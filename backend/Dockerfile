FROM node:alpine

WORKDIR /app/back

COPY package*.json ./

RUN yarn install --verbose

COPY . .

EXPOSE 5000

RUN npm install prisma

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start:dev" ]

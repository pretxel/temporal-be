FROM node:20-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./

COPY . .
RUN npm install
RUN npm run db:deploy || true
RUN npm run build
RUN npm install pm2 -g
EXPOSE 8080
CMD ["pm2-runtime", "ecosystem.config.js"]
# CMD ["pm2-runtime","npm start"]

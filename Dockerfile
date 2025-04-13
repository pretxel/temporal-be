FROM node:20-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./

COPY . .
RUN npm install
RUN if [ -e "/usr/.aptible.env" ]; then cp /usr/.aptible.env .env; else echo "El archivo /usr/.aptible.env no existe."; fi
RUN if [ -e "/usr/.aptible.env" ]; then npm run db:deploy; else echo "El archivo /usr/.aptible.env no existe."; fi
RUN if [ -e "/usr/.aptible.env" ]; then npm run db:seed; else echo "El archivo /usr/.aptible.env no existe."; fi
RUN npm run db:deploy || true
RUN npm run compile
RUN npm install pm2 -g
EXPOSE 8080
CMD ["pm2-runtime", "ecosystem.config.js"]
# CMD ["pm2-runtime","npm start"]

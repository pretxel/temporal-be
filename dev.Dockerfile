FROM node:20-alpine
ARG DATABASE_URL
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY  ["package-lock.json", "package.json", "./"]
COPY package.json ./
COPY package-lock.json ./


# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# Copy source files


# Install app dependencies

RUN npm install

COPY . .

RUN rm -rf node_modules/sharp && \
    npm install --platform=linuxmusl --arch=x64 --sharp-install-force sharp 

EXPOSE 8080

CMD ["npm", "run", "dev"]

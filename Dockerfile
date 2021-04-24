FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy Package JSON and run NPM Install
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]

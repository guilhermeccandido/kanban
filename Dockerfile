FROM node:lts

# install the application
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
COPY . /app
RUN npm ci

# PORT can be change in .env
EXPOSE ${PORT}

# build and start
RUN npm run build

# start
CMD ["npm", "run", "dev"]

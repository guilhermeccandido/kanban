FROM node:lts

# install the application
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm ci
COPY . /app

# 3000 is the port we need for nextjs
EXPOSE 3000

# build and start
RUN npm run build

# start
CMD ["npm", "run", "dev"]
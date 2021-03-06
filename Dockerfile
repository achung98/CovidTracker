FROM node:10-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY /dist /app
EXPOSE 5000
CMD ["npm", "start"]

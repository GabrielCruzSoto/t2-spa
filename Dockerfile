FROM node:18-alpine
WORKDIR /app
ARG BASE_URL=""
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]

FROM node:19-bullseye

WORKDIR /app
COPY package*.json ./
RUN npm install -f
COPY . .
EXPOSE 3000
CMD npm run dev
FROM node:14-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --silent --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
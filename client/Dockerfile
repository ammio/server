# FROM node:14-alpine
# WORKDIR /app
# COPY ["package.json", "package-lock.json", "./"]
# RUN npm install --silent
# COPY . .
# EXPOSE 8080
# CMD ["npm" "run" "serve"]

FROM node:14-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --silent
RUN npm install @vue/cli-service -g
COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
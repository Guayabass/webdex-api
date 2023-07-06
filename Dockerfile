FROM node:18-alpine as deps
# node pero mas pequeno y facil de correr. deps viene siendo como dependencias (nombre)
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci 
#copiamos los dos archivos a /app, e hacemos npm install y mantenemos en cache

#------------------------------------------

FROM node:18-alpine as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN npm run build
# copia toda la raiz del proyecto excepto lo que se ingreso en .dockerignore y lo copia en /app

#-----------------------------------

FROM node:18-alpine as runner
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/main" ]
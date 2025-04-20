
FROM node:19

WORKDIR /app

# Copy only the server files to /app
COPY server/package*.json ./
RUN npm install

COPY server ./
COPY views ./views

EXPOSE 3000

CMD ["node", "server.js"]

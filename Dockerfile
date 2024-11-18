FROM node:18-alpine

WORKDIR /app
RUN npm install -g serve
COPY build/ ./build/
COPY serve.json ./

EXPOSE 3000
CMD ["serve", "-l", "3000"]

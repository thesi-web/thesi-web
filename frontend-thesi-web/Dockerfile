FROM node:18-alpine

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

#o primeiro . representa toda a aplicação (pasta) "front-end-thesi-web" e 
#o segundo . representa o destino, no caso o WORKDIR /app/thesi-ux
COPY . .

#exponho o container na porta 5173
EXPOSE 5173

#não foi usado RUN pois ele "roda" apenas no momento de criação do container
#criação é executada e mandtido online com o CMD
CMD ["npm", "run", "dev"]




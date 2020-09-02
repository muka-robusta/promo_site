FROM node

EXPOSE 80/tcp

COPY . .

RUN ["npm", "install"]

CMD ["node", "app"]
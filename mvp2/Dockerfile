FROM node:5.11.1

RUN npm set progress=false && npm install pm2 -g && npm install mocha -g

ADD package.json /app/package.json
RUN cd /app && npm install --production --unsafe-perm

ADD . /app

EXPOSE 3000

CMD cd /app/ && \
    pm2 start app.js -f --node-args='--harmony' && \
    pm2 logs
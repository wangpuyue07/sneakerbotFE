FROM node:8.4.0

RUN npm set progress=false && npm install pm2 -g && npm install mocha -g

ADD package.json /app/package.json
RUN cd /app && npm install --production --unsafe-perm

ADD . /app

EXPOSE 3000

CMD cd /app/ && \
    pm2-docker start app.js



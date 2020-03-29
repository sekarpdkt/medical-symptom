FROM node:latest

# Create app directory
WORKDIR /usr/src/app
COPY . .

RUN mkdir -p /usr/src/app/files && mkdir -p /usr/src/app/includeJS/files && chmod 777 /usr/src/app && chmod 777 /usr/src/app/files && chmod 777 /usr/src/app/includeJS/files &&  mkdir -p /usr/src/app/certificates && chown -R node:node /usr/src/app/
# Bundle app source
EXPOSE 8080 8088
USER node
CMD [ "/bin/bash", "run.sh" ]

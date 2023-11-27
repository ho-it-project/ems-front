###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:20-alpine as development
WORKDIR /app

######################
#BUILD FOR PRODUCTION#
######################
FROM development as build
WORKDIR /app
COPY ./ ./


ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV = production


# Install app dependencies
RUN npm install --frozen-lockfile
RUN npm run build
RUN npm prune --production
USER node

######################
#BUILD FOR PRODUCTION#
######################
FROM development as production


COPY --chown=node:node --from=build /app/.next /app/.next
COPY --chown=node:node --from=build /app/public /app/public
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/.env /app/.env
COPY --chown=node:node --from=build /app/package.json /app/package.json


USER node

CMD [ "npm", "run", "start" ]


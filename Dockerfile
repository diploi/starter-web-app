# This will be set by the GitHub action to the folder containing this component.
ARG FOLDER=/app

FROM node:24-slim AS dependencies
ARG FOLDER
COPY . /app
WORKDIR ${FOLDER}
RUN npm ci

FROM node:24-slim AS build
ARG FOLDER
COPY --from=dependencies . /app
WORKDIR ${FOLDER}
RUN npm run build

FROM node:24-slim
ARG FOLDER
COPY --from=build . /app
WORKDIR ${FOLDER}
CMD ["npm", "run", "start"]
FROM node:20-alpine
WORKDIR /app

# Copy the service-specific package.json (e.g., auth-service)
COPY ./package.json .
# Install dependencies for the service, including devDependencies
RUN yarn install --production=false 
# Copy the rest of the application
COPY ./src ./src
COPY tsconfig.json nodemon.json tsoa.json ./

CMD ["yarn", "dev"]
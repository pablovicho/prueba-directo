# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Install additional dependencies
RUN yarn add amqplib @nestjs/microservices @nestjs/config amqp-connection-manager winston

# Build the NestJS application
RUN yarn run build

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["yarn", "run", "start:dev"]
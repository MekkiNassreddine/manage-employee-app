# Use an official Node.js image with a specified version
FROM node:16.13.1-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the remaining application code to the working directory
COPY . .

# Build the React app
RUN yarn build

# Expose the port that the app will run on (adjust if needed)
EXPOSE 3001

# Define the command to run your application
CMD ["yarn", "start"]

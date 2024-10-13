# Dockerfile for React
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY frontend/package.json .
RUN npm install

# Copy the entire frontend code
COPY frontend/ .

# Expose the port React runs on
EXPOSE 5173

# Start the React app
CMD ["npm", "run", "dev"]

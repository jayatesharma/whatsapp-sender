# Use Node.js base image
FROM node:18

# Install dependencies for Puppeteer
RUN apt-get update && apt-get install -y wget gnupg ca-certificates fonts-liberation \
    libappindicator3-1 libasound2 libnspr4 libnss3 libxss1 xdg-utils libatk-bridge2.0-0 libgtk-3-0 chromium

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Set Puppeteer executable path
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install Node.js packages
RUN npm install

# Expose app port
EXPOSE 3000

# Start app
CMD ["npm", "start"]

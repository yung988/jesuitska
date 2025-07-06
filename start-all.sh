#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Pension Jesuitska Full Stack...${NC}"

# Function to kill processes on exit
cleanup() {
    echo -e "\n${BLUE}Stopping all processes...${NC}"
    kill 0
    exit
}

# Set up trap to call cleanup on Ctrl+C
trap cleanup INT

# Start backend
echo -e "${GREEN}Starting Strapi backend...${NC}"
cd /Users/jangajdos/projects/jesuitska/penzion-backend
pnpm run develop &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 5

# Start frontend
echo -e "${GREEN}Starting Next.js frontend...${NC}"
cd /Users/jangajdos/Projects/jesuitska/pension-jesuitska-new
pnpm run dev &
FRONTEND_PID=$!

echo -e "${BLUE}===============================================${NC}"
echo -e "${GREEN}✓ Backend running at: http://localhost:1337${NC}"
echo -e "${GREEN}✓ Frontend running at: http://localhost:3000${NC}"
echo -e "${BLUE}===============================================${NC}"
echo -e "${BLUE}Press Ctrl+C to stop all services${NC}"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

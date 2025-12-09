#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🧪 WrapperDetector Local Testing Script${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}\n"

# Test Backend
echo -e "${YELLOW}📦 Testing Backend...${NC}"
cd back

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found in back/ directory${NC}"
    echo -e "${YELLOW}   Create back/.env with: AI_API_KEY=your_key${NC}"
    cd ..
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo -e "${YELLOW}📥 Installing backend dependencies...${NC}"
    npm install
fi

# Check if prompt.txt exists
if [ ! -f prompt.txt ]; then
    echo -e "${RED}❌ prompt.txt not found in back/ directory${NC}"
    cd ..
    exit 1
fi

echo -e "${GREEN}✅ Backend dependencies and files check passed${NC}\n"

# Test Frontend
echo -e "${YELLOW}🌐 Testing Frontend...${NC}"
cd ../web

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo -e "${YELLOW}📥 Installing frontend dependencies...${NC}"
    npm install
fi

echo -e "${GREEN}✅ Frontend dependencies check passed${NC}\n"

# Summary
echo -e "${GREEN}✅ All checks passed!${NC}\n"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Start backend: ${GREEN}cd back && npm start${NC}"
echo -e "2. Start frontend: ${GREEN}cd web && npm run dev${NC}"
echo -e "3. Test in browser at ${GREEN}http://localhost:3000${NC}\n"

cd ..


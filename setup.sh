#!/bin/bash

echo "🚀 Campus Navigation System - Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Backend setup
echo "📦 Setting up backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "⚠️  Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your credentials:"
    echo "   - MongoDB URI"
    echo "   - Mapbox Token"
    echo ""
fi

echo "📥 Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend installation failed"
    exit 1
fi

cd ..

# Frontend setup
echo ""
echo "📦 Setting up frontend..."
cd frontend

echo "📥 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend installation failed"
    exit 1
fi

cd ..

# Success message
echo ""
echo "=========================================="
echo "✅ Setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit backend/.env with your credentials"
echo "2. Start backend: cd backend && npm start"
echo "3. Start frontend: cd frontend && npm run dev"
echo "4. Open http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "- README.md - Main documentation"
echo "- QUICK_START.md - Quick start guide"
echo "- UI_IMPROVEMENTS.md - UI features"
echo "- COMPONENT_GUIDE.md - Component reference"
echo ""
echo "Happy coding! 🎉"

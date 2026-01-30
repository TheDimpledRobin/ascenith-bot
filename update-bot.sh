#!/bin/bash
# Quick Update Script for Ascenith Bot on Digital Ocean
# Run this on your droplet to update the bot from GitHub

echo "🚀 Ascenith Bot Update Script"
echo "================================"
echo ""

# Navigate to bot directory
cd ~/ascenith-bot || { echo "❌ Error: Bot directory not found"; exit 1; }

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

if [ $? -ne 0 ]; then
    echo "❌ Git pull failed. Please check your GitHub credentials."
    exit 1
fi

echo ""
echo "📦 Installing/updating dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed. Please check the error messages above."
    exit 1
fi

echo ""
echo "🔄 Restarting bot with PM2..."
pm2 restart ascenith-bot

if [ $? -ne 0 ]; then
    echo "❌ PM2 restart failed. Bot may not be running."
    echo "Try: pm2 start src/index.js --name ascenith-bot"
    exit 1
fi

echo ""
echo "✅ Bot updated successfully!"
echo ""
echo "📊 Current status:"
pm2 status ascenith-bot

echo ""
echo "📝 View logs with: pm2 logs ascenith-bot"
echo "🔍 Monitor with: pm2 monit"

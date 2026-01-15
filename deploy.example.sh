#!/bin/bash
set -e

echo "🔨 Building frontend..."
cd frontend
npm run build
cd ..

echo "📦 Creating deployment archive..."
tar -czf deploy.tar.gz \
  frontend/build/ \
  frontend/package.json \
  backend/src/ \
  backend/package.json \
  backend/package-lock.json \
  ecosystem.config.cjs

echo "📤 Uploading to server..."
scp deploy.tar.gz YOUR_USER@YOUR_HOST:~/sites/YOUR_SITE/

echo "🚀 Deploying on server..."
ssh YOUR_USER@YOUR_HOST << 'EOF'
cd ~/sites/YOUR_SITE

echo "⏸️  Stopping apps..."
npx pm2 stop olympique-backend olympique-frontend 2>/dev/null || true

echo "📦 Extracting..."
tar -xzf deploy.tar.gz
rm deploy.tar.gz

echo "📥 Installing backend dependencies..."
cd backend
npm ci --omit=dev
cd ..

echo "🚀 Starting apps..."
npx pm2 start ecosystem.config.cjs

echo "💾 Saving PM2 config..."
npx pm2 save

echo "✅ Deployment complete!"
npx pm2 status
EOF

echo "🎉 Done!"
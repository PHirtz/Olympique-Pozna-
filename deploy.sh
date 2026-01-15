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
scp deploy.tar.gz ao4W1F99k4X_olympique@57-105542.ssh.hosting-ik.com:~/sites/olympiquepoznan.pl/

echo "🚀 Deploying on server..."
ssh ao4W1F99k4X_olympique@57-105542.ssh.hosting-ik.com << 'EOF'
cd ~/sites/olympiquepoznan.pl

echo "⏸️  Stopping apps..."
npx pm2 stop olympique-backend olympique-frontend 2>/dev/null || true

echo "📦 Extracting..."
tar -xzf deploy.tar.gz
rm deploy.tar.gz

echo "📥 Installing backend dependencies..."
cd backend
npm ci --omit=dev
cd ..

echo "🚀 Starting backend first..."
npx pm2 start ecosystem.config.cjs --only olympique-backend

echo "⏳ Waiting for backend to be ready..."
sleep 3

echo "🚀 Starting frontend..."
npx pm2 start ecosystem.config.cjs --only olympique-frontend

echo "💾 Saving PM2 config..."
npx pm2 save

echo "✅ Deployment complete!"
npx pm2 status
EOF

echo ""
echo "🎉 Deployment finished!"
echo "👉 Check: https://olympiquepoznan.pl"
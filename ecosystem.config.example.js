module.exports = {
  apps: [
    {
      name: 'olympique-backend',
      script: './backend/src/server.js',
      cwd: '/srv/customer/sites/olympiquepoznan.pl',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        DB_DIALECT: 'mysql',
        DB_HOST: 'YOUR_DB_HOST',
        DB_PORT: '3306',
        DB_NAME: 'YOUR_DB_NAME',
        DB_USER: 'YOUR_DB_USER',
        DB_PASSWORD: 'YOUR_DB_PASSWORD',
        JWT_SECRET: 'YOUR_JWT_SECRET',
        JWT_REFRESH_SECRET: 'YOUR_JWT_REFRESH_SECRET',
        JWT_EXPIRES_IN: '7d',
        FRONTEND_URL: 'https://yoursite.com',
        SMTP_HOST: 'YOUR_SMTP_HOST',
        SMTP_PORT: '587',
        SMTP_USER: 'YOUR_SMTP_USER',
        SMTP_PASS: 'YOUR_SMTP_PASS',
        SMTP_FROM: '"Your Site" <noreply@yoursite.com>',
        ADMIN_EMAIL: 'admin@yoursite.com'
      }
    },
    {
      name: 'olympique-frontend',
      script: './frontend/build/index.js',
      cwd: '/srv/customer/sites/olympiquepoznan.pl',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
        ORIGIN: 'https://yoursite.com',
        BODY_SIZE_LIMIT: '0',
        PUBLIC_API_URL: '/api',
        PUBLIC_DEFAULT_LANGUAGE: 'fr',
        PUBLIC_ENV: 'production',
        PUBLIC_MAP_CENTER_LAT: '52.406376',
        PUBLIC_MAP_CENTER_LNG: '16.925167',
        PUBLIC_MAP_ZOOM: '6'
      }
    }
  ]
};
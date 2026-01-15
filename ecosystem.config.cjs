module.exports = {
  apps: [
    // Backend Express API - démarre en premier
    {
      name: 'olympique-backend',
      script: './backend/src/server.js',
      cwd: '/home/customers/5/7/a/olympiquepoznan.pl/httpd.www/sites/olympiquepoznan.pl',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        
        // Database MariaDB Infomaniak
        DB_DIALECT: 'mysql',
        DB_HOST: 'localhost',
        DB_PORT: '3306',
        DB_NAME: '1c4a3g.myd.infomaniak.com',
        DB_USER: '1c4a3g_opz_user',
        DB_PASSWORD: 'OlympiqueP0znan2025!',
        
        // JWT
        JWT_SECRET: '9d85e73216d4d8544c13824899cf2ff5ca4389bc5f86a93e49e3199c248c7bac7a5a2d38027477b0c8fe99b47e02df8f282d8926a9633ee68c428e3ac698c40a',
        JWT_REFRESH_SECRET: 'autre_secret_pour_refresh_token_32_chars',
        JWT_EXPIRES_IN: '7d',
        
        // CORS
        FRONTEND_URL: 'https://olympiquepoznan.pl',
        
        // Email
        SMTP_HOST: 's.wutezi@wutezi.com',
        SMTP_PORT: '587',
        SMTP_USER: 's.wutezi@wutezi.com',
        SMTP_PASS: 'w94@mail',
        SMTP_FROM: '"Olympique Poznan" <noreply@olympiquepoznan.com>',
        ADMIN_EMAIL: 's.wutezi@wutezi.com'
      }
    },
    
    // Frontend SvelteKit - démarre APRÈS le backend
    {
      name: 'olympique-frontend',
      script: './frontend/build/index.js',
      cwd: '/home/customers/5/7/a/olympiquepoznan.pl/httpd.www/sites/olympiquepoznan.pl',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        ORIGIN: 'https://olympiquepoznan.pl',
        BODY_SIZE_LIMIT: '10MB',
        
        // Variables publiques (accessibles côté client)
        PUBLIC_API_URL: '/api', // Important: chemin relatif pour le proxy
        PUBLIC_DEFAULT_LANGUAGE: 'fr',
        PUBLIC_ENV: 'production',
        PUBLIC_MAP_CENTER_LAT: '52.406376',
        PUBLIC_MAP_CENTER_LNG: '16.925167',
        PUBLIC_MAP_ZOOM: '6'
      }
    }
  ]
};
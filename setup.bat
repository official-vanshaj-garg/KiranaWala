@echo off

:: Create main project directories
mkdir public\css
mkdir public\js
mkdir views\customer
mkdir views\store-owner
mkdir server\models
mkdir server\routes

:: Create files
echo. > public\css\styles.css
echo. > public\js\customer.js
echo. > public\js\store-owner.js
echo. > views\index.html
echo. > views\customer\login.html
echo. > views\customer\register.html
echo. > views\customer\dashboard.html
echo. > views\store-owner\login.html
echo. > views\store-owner\register.html
echo. > views\store-owner\dashboard.html
echo. > server\models\user.js
echo. > server\models\store.js
echo. > server\models\product.js
echo. > server\routes\customerRoutes.js
echo. > server\routes\storeRoutes.js
echo. > server\server.js

:: Initialize npm and install dependencies
call npm init -y
call npm install express mongoose bcryptjs jsonwebtoken cors

echo Project structure created successfully!
pause
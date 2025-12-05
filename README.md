🚀 laravel12-react-crud

A modern full-stack CRUD application built with Laravel 12, React, and Inertia.js.
This project demonstrates a clean integration between Laravel backend and React frontend, providing SPA-like navigation, soft deletes, and RESTful CRUD operations for managing products.

📌 Features

Create, Read, Update, Delete (CRUD) operations for products

Soft delete support

Flash messages for success/error notifications

SPA-like navigation using Inertia.js

Responsive UI with Tailwind CSS

⚡ Installation & Setup

1️⃣ Create Project

composer create-project laravel/laravel laravel12-react-crud "12.*"

cd laravel12-react-crud

2️⃣ Install Breeze (React + Tailwind UI scaffolding)

composer require laravel/breeze --dev

php artisan breeze:install react

3️⃣ Install Node Packages

npm install

4️⃣ Install Inertia.js

npm install @inertiajs/inertia @inertiajs/react

5️⃣ Optional: Install Axios

npm install axios

6️⃣ Run Vite (React Frontend)

npm run dev

7️⃣ Configure Database

Update your .env file:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel12_react_crud
DB_USERNAME=root
DB_PASSWORD=

8️⃣ Run Migrations

php artisan migrate

9️⃣ Start Laravel Server

php artisan serve

Open the app in your browser at:

http://localhost:8000

📂 Folder Structure

laravel12-react-crud/

│── app/
│   ├── Http/Controllers/ProductController.php
│   └── Models/Product.php
│

│── database/migrations/xxxx_create_products_table.php
│

│── routes/web.php
│

│── resources/js/
│   ├── Pages/Products/
│   │     ├── Index.jsx
│   │     ├── Create.jsx
│   │     ├── Edit.jsx
│   │     └── Show.jsx
│   └── app.jsx
│

│── package.json

│── vite.config.js

│── .env

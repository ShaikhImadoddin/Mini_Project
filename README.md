# User Management System

A simple CRUD (Create, Read, Update, Delete) web application built with **Node.js, Express.js, and MySQL**.  
It allows users to **add, edit, delete, and view user records** in a responsive table interface.

---

## 🚀 Features
- Add new users with name and email
- Edit existing user details
- Delete users from the table
- View all users in a tabular format
- Responsive frontend interface

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. Install dependencies
    ```
    npm install
    ```
3. Create MySQL database
    ```
    CREATE DATABASE user_management;
    USE user_management;

    CREATE TABLE user(
        id VARCHAR(50) PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL
    );

    ```
4. Configure database connection
    Update your database credentials in config/db.js or wherever your MySQL connection is set.

5. Start the server
    ```
    node app.js
    ```
The app will run at http://localhost:8080

📌 Future Enhancements

Add search and filter functionality

Add form validation and user authentication

🤝 Author

Imadoddin Shaikh
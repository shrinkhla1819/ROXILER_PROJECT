# ⭐ Store Rating Platform

A full-stack web application where users can register, log in, browse stores, and submit ratings (1–5). The platform includes three roles: **System Administrator**, **Normal User**, and **Store Owner**, each with role-specific dashboards and functionalities.

## 🚀 Tech Stack

* **Frontend:** React.js + TailwindCSS / Material UI
* **Backend:** Express.js (Node.js)
* **Database:** PostgreSQL (can be switched to MySQL)
* **Authentication:** JWT (JSON Web Tokens)
* **ORM:** Sequelize / Prisma

---

## 🔑 Features

### System Administrator

* Add new stores, users (normal/admin).
* Dashboard showing:

  * Total users
  * Total stores
  * Total ratings
* Manage users & stores with filters (Name, Email, Address, Role).
* View store list with ratings.
* View user details with role (and ratings if Store Owner).

### Normal User

* Sign up & login.
* Update password.
* Browse/search stores (by name/address).
* Submit or update ratings (1–5).
* View store details with:

  * Name, Address, Overall Rating, User’s Submitted Rating.

### Store Owner

* Login & update password.
* Dashboard with:

  * List of users who rated their store.
  * Average store rating.

---

## 🗂 Database Schema

### Users Table

* `id` (PK)
* `name`
* `email`
* `password`
* `address`
* `role` (`admin`, `user`, `store_owner`)

### Stores Table

* `id` (PK)
* `name`
* `email`
* `address`
* `owner_id` (FK → Users)

### Ratings Table

* `id` (PK)
* `store_id` (FK → Stores)
* `user_id` (FK → Users)
* `rating` (1–5)

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/store-rating-platform.git
cd store-rating-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=store_rating
JWT_SECRET=your_secret_key
```

* Run migrations:

```bash
npx sequelize db:migrate   # if using Sequelize
```

* Start backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Form Validations

* **Name:** 20–60 characters.
* **Address:** max 400 characters.
* **Password:** 8–16 characters, 1 uppercase, 1 special character.
* **Email:** must be valid.

---

## 📊 Dashboards

* **Admin Dashboard:** total users, stores, ratings.
* **User Dashboard:** browse/search stores, rate them.
* **Store Owner Dashboard:** see store ratings & average score.

---

## 🎨 UI/UX

* Fully responsive design.
* Beautiful store & user listings with sorting (ascending/descending).
* Creative use of TailwindCSS / Material UI components.

---

## 📜 License

This project is licensed under the MIT License.

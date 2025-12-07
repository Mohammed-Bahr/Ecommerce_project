# Ecommerce Project

A modern, full-stack e-commerce web application built primarily with TypeScript, featuring a cleanly separated **frontend** and **backend** architecture.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

---

## Features

- User-friendly shopping experience: browse, search, add to cart, and purchase products
- User authentication and authorization
- Order management system (users/admin)
- Product CRUD for admin users
- Secure payment integration
- Responsive design for all device sizes
- RESTful APIs with proper validation and error handling

---

## Project Structure

```
Ecommerce_project/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── app.ts
│   ├── prisma/ (if using Prisma ORM)
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── ...
```

### Frontend

Located in the `frontend/` directory, built with **React** (TypeScript):

- **Components:** Reusable UI elements (ProductCard, CartItem, Navbar, etc.)
- **Pages:** Application routes (Home, Product Details, Checkout, etc.)
- **Hooks:** Custom React hooks for state management and side-effects
- **Services:** Abstraction for API requests
- **Utils:** Helper functions (formatting, validations, etc.)

### Backend

Located in `backend/`, built with **Node.js** (TypeScript, Express):

- **Controllers:** Handle request logic for auth, products, orders, etc.
- **Routes:** API endpoint routes (RESTful)
- **Models:** Database models (User, Product, Order, etc.)
- **Middleware:** Authentication, error handling, logging, etc.
- **Prisma/:** (If using Prisma ORM) for database schema and migrations

---

## Tech Stack

- **Frontend:** React, TypeScript, Axios, Styled Components or TailwindCSS, etc.
- **Backend:** Node.js, Express, TypeScript, Prisma ORM (or Mongoose/Sequelize), JWT, bcrypt, etc.
- **Database:** PostgreSQL / MySQL / MongoDB (modify as appropriate)
- **Other:** Docker (optional), Jest for testing, CI/CD tools

---

## Getting Started

### Prerequisites

- Node.js (recommend v18+)
- npm or yarn
- (Optional) Docker and Docker Compose
- A database server (e.g., PostgreSQL)

### Installation

1. **Clone the repository**

    ```sh
    git clone https://github.com/Mohammed-Bahr/Ecommerce_project.git
    cd Ecommerce_project
    ```

2. **Install Frontend Dependencies**

    ```sh
    cd frontend
    npm install
    # or
    yarn install
    ```

3. **Install Backend Dependencies**

    ```sh
    cd ../backend
    npm install
    # or
    yarn install
    ```

4. **Configure Environment Variables**

    - Create `.env` files in both `frontend/` and `backend/` as per templates provided.

5. **Run the Application**

    **Frontend:**

    ```sh
    cd frontend
    npm run dev
    ```

    **Backend:**

    ```sh
    cd backend
    npm run dev
    ```

---

> Built with ♥ by [Mohammed-Bahr](https://github.com/Mohammed-Bahr)

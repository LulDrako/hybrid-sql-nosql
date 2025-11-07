# Bookly+ API Sécurisée

API hybride PostgreSQL + MongoDB avec JWT, bcrypt, CORS, rate limiting.

## Installation

```bash
npm install
```

Copier .env.example vers .env et configurer.

## Configuration PostgreSQL

```sql
CREATE DATABASE bookly_sql;
\c bookly_sql;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Configuration MongoDB

MongoDB se connecte automatiquement à bookly_nosql.

## Démarrage

```bash
npm run dev
```

## Endpoints

### Auth
- POST /auth/register
- POST /auth/login

### Users (SQL)
- GET /api/users
- GET /api/users/:id
- POST /api/users (auth)
- PUT /api/users/:id (auth)
- DELETE /api/users/:id (admin)

### Books (SQL)
- GET /api/books
- GET /api/books/:id
- POST /api/books (admin)
- PUT /api/books/:id (admin)
- DELETE /api/books/:id (admin)

### Profiles (MongoDB)
- GET /api/profiles/:userId (auth)
- POST /api/profiles (auth)
- PUT /api/profiles/:userId (auth)

### Mixte
- GET /api/user-full/:id

## Sécurité

- JWT authentication
- bcrypt (sel=10)
- CORS
- Rate limiting (100 req/min, 10 login/15min)
- RBAC (user/admin)
- Validation (express-validator)
- Helmet
- Morgan

Voir SECURITY.md pour détails.

## Tests

Importer Bookly_Secure_API.postman_collection.json dans Postman.

## Structure

```
src/
├── server.js
├── config/
├── middlewares/
├── models/
├── controllers/
└── routes/
```

## Technologies

Express, PostgreSQL (pg), MongoDB (mongoose), JWT, bcrypt, helmet, cors, morgan, express-rate-limit, express-validator

# Mesures de sécurité

## 1. Authentification JWT

Routes auth :
- POST /auth/register
- POST /auth/login

Middleware auth vérifie le token dans Authorization header.

Fichiers : src/middlewares/auth.js, src/controllers/auth.controller.js

## 2. Hachage bcrypt

Mots de passe hachés avec bcrypt (sel = 10).

Fichier : src/controllers/auth.controller.js

## 3. CORS

Origines autorisées : localhost:3000, localhost:5173

Fichier : src/server.js

## 4. Rate Limiting

Global : 100 requêtes/minute
Auth : 10 tentatives login/15 minutes

Fichier : src/middlewares/rateLimiter.js

## 5. RBAC (Rôles)

Rôles : user, admin

Routes admin only :
- DELETE /api/users/:id
- POST/PUT/DELETE /api/books

Fichier : src/middlewares/requireRole.js

## 6. Validation

express-validator sur routes auth.
Code 422 si validation échoue.

Fichier : src/routes/auth.routes.js

## 7. Logs et headers

Morgan pour logs HTTP.
Helmet pour headers de sécurité.

Fichier : src/server.js

## Tests de sécurité

Test 1 : Route sans token
GET /api/profiles/1 sans Authorization → 401

Test 2 : Token invalide
GET /api/profiles/1 avec token invalide → 401

Test 3 : Rôle insuffisant
DELETE /api/books/1 avec role=user → 403

Test 4 : Rate limit
POST /auth/login x11 → 429

Test 5 : Validation
POST /auth/register avec email invalide → 422

## Codes HTTP

200 - OK
201 - Created
204 - No Content
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
409 - Conflict
422 - Unprocessable Entity
429 - Too Many Requests
500 - Internal Server Error

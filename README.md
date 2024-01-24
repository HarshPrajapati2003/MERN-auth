# Authentication Workflow with JWT and Cookies

This repository outlines a simple authentication workflow using JSON Web Tokens (JWT) and HTTP-only cookies. The implementation is divided into backend (Express) and frontend (React) components.

## Backend (Express)

### 1. Registration Endpoint (`/api/register`)

- Receive a POST request with user registration data (name, email, password).
- Hash the password using bcrypt for security.
- Create a new user in the database with the hashed password.
- Generate a JWT containing the user's ID.
- Set the JWT as an HTTP-only cookie with a limited expiration time.
- Respond with a success message, user details, and the JWT.

### 2. Login Endpoint (`/api/login`)

- Receive a POST request with user login credentials (email, password).
- Find the user in the database based on the provided email.
- Verify the provided password against the stored hashed password using bcrypt.
- If credentials are valid, generate a new JWT with the user's ID.
- Set the JWT as an HTTP-only cookie with a limited expiration time.
- Respond with the user details.

### 3. Protected Endpoint (`/`)

- Use middleware (`verifyCookie`) to check the validity of the JWT included in the request cookie.
- If the JWT is valid, grant access to the protected route; otherwise, respond with an authentication error.

### 4. Logout Endpoint (`/api/logout`)

- Clear the JWT cookie by removing it from the client's browser.
- Respond with a success message.

## Frontend (React) Workflow

### Registration

- User fills out a registration form and submits it.
- The frontend sends a POST request to the `/api/register` endpoint.
- Upon successful registration, the user is provided with a JWT cookie, and they are considered authenticated.

### Login

- User enters login credentials and submits the login form.
- The frontend sends a POST request to the `/api/login` endpoint.
- Upon successful login, the user is provided with a new JWT cookie, and they are considered authenticated.

### Home Page (Protected Route)

- When accessing a protected route, the frontend automatically sends a request to the server to check the validity of the JWT cookie.
- If the JWT is valid, the user is granted access to the protected page; otherwise, they are redirected to the login page.

### Logout

- User clicks the logout button.
- The frontend sends a POST request to the `/api/logout` endpoint, which clears the JWT cookie.
- The user is redirected to the login page.

## Notes

- The use of JWTs allows stateless authentication by storing user information securely in a token.
- The HTTP-only cookie prevents client-side scripts from accessing the token directly.
- The workflow ensures that only authenticated users can access protected routes, providing a secure and seamless user experience.

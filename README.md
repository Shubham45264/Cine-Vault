# CineVault

## MERN Stack Movie Application with Role-Based Access Control

---

## 1. Introduction

CineVault is a full-stack **MERN Stack Movie Application** developed to demonstrate role-based access control, secure authentication, and efficient movie data management. The application allows users to view, search, and sort movies sourced from **IMDb Top 250 Movies**, while administrators are provided with secure privileges to manage movie records.

This project adheres strictly to the specifications outlined in the MERN Stack Movie Application assignment.

---

## 2. Objective

The primary objective of this project is to:

* Develop a scalable movie web application using the MERN stack
* Implement **JWT-based authentication and authorization**
* Provide **separate user and admin functionalities**
* Ensure responsive UI using **Material-UI**
* Follow best practices in API design, security, and documentation

---

## 3. Features

### 3.1 User Features

* View movie details fetched from IMDb Top 250 Movies
* Search movies by name or description
* Sort movies by:

  * Name
  * Rating
  * Release Date
  * Duration
* Pagination support for movie listings
* Responsive design for desktop and mobile devices

### 3.2 Admin Features

* Secure admin login using JWT authentication
* Role-based access control
* Add new movie records
* Edit existing movie details
* Delete movies from the database
* Access restricted admin routes only after authentication

---

## 4. Technology Stack

### Frontend

* React.js
* TypeScript
* Material-UI (MUI)
* React Router DOM
* Context API for state management

### Backend

* Node.js
* Express.js
* MongoDB (MongoDB Atlas)
* Mongoose
* JSON Web Token (JWT)

---

## 5. Application Modules

### User Module

* Home Page: Displays all movies with pagination
* Search Page: Allows searching and filtering movies

### Admin Module

* Add Movie Page
* Edit/Delete Movie Page
* Admin Dashboard with protected routes

---

## 6. Authentication and Authorization

* JWT-based authentication is implemented for admin login
* Middleware is used to protect admin-only routes
* Unauthorized users are restricted from accessing secured endpoints
* Token validation is performed for every protected API request

---

## 7. REST API Endpoints

### Movie APIs

| HTTP Method | Endpoint       | Description                                    | Access |
| ----------- | -------------- | ---------------------------------------------- | ------ |
| GET         | /movies        | Retrieve all movies                            | Public |
| GET         | /movies/sorted | Sort movies by name, rating, date, or duration | Public |
| GET         | /movies/search | Search movies by name or description           | Public |
| POST        | /movies        | Add a new movie                                | Admin  |
| PUT         | /movies/:id    | Update movie details                           | Admin  |
| DELETE      | /movies/:id    | Delete a movie                                 | Admin  |

---

## 8. Data Handling and Performance

* Movie data is populated using a **lazy insertion (seeding) mechanism**
* MongoDB queries are optimized for performance
* The backend is designed to handle concurrent user requests
* Robust error handling is implemented for:

  * Unauthorized access
  * Invalid inputs
  * Server-side failures

---

## 9. Local Setup Instructions

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd CineVault
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

(Optional) Seed IMDb Top 250 movie data:

```bash
node seeder.js
```

---

### Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 10. Deployment

* Frontend deployed using Vercel or Netlify
* Backend deployed using Railway / Render / Heroku
* Database hosted on MongoDB Atlas

**Live Application URL:**  https://cine-vault-lemon.vercel.app/  
**Backend API URL:**  https://cine-vault-2vc4.onrender.com  


---

## 11. Evaluation Criteria Compliance

| Requirement                | Status    |
| -------------------------- | --------- |
| MERN Stack Implementation  | Completed |
| JWT Authentication         | Completed |
| Role-Based Access Control  | Completed |
| Responsive UI using MUI    | Completed |
| REST API Design            | Completed |
| Scalability Considerations | Completed |
| GitHub Version Control     | Completed |
| README Documentation       | Completed |
| Deployment Support         | Completed |

---

## 12. Future Enhancements

* Distributed queue-based data insertion using Redis/Bull
* User watchlist and favorites feature
* Movie ratings and reviews
* Enhanced admin analytics dashboard

---

## 13. Developer Information

**Name:** Shubham Jamdar  
**Qualification:** Computer Engineering  
**Project Type:** MERN Stack Academic Assignment  


---

## 14. Reference

IMDb Top 250 Movies
[https://www.imdb.com/chart/top?ref_=nv_mv_250](https://www.imdb.com/chart/top?ref_=nv_mv_250)

---


Just tell me what you need next.

# E-Commerce Web Application

This is a full-stack E-Commerce application built using **Spring Boot** for the backend and **React.js** for the frontend. The application provides a complete shopping experience with product management, cart functionality, user authentication, and modern UI features.

---

## Features

### Backend (Spring Boot)
- **Product Management**: Add, update, delete, and retrieve products.
- **Search Functionality**: Search products by keyword.
- **User Authentication**: Login and signup functionality using **JWT tokens** for secure access.
- **Image Upload**: Upload and fetch product images.
- **REST API Endpoints**: Exposed for frontend interaction.

### Frontend (React.js)
- **Product Listing & Details**: View all products, individual product details.
- **Search Bar**: Easily find products by name or keyword.
- **Shopping Cart**: Add and remove products from cart.
- **Dark Theme**: Modern UI with dark mode support.
- **Login & Signup Pages**: User-friendly authentication forms integrated with JWT tokens.

### Deployment
- **Dockerized Application**: The project can be deployed using Docker for consistent and easy setup.

---

## Tech Stack

- **Backend**: Spring Boot, Spring Data JPA, H2 In-Memory Database
- **Frontend**: React.js, Redux
- **Authentication**: JWT (JSON Web Token)
- **File Upload**: Multipart file handling for product images
- **Deployment**: Docker
- **Other Tools**: Maven, Postman (for API testing)

---

## Project Structure

### Backend
- `controller/` - REST API controllers (`ProductController`, `AuthController`)
- `service/` - Business logic layer
- `model/` - Entity classes (`Product`, `User`)
- `repo/` - Spring Data JPA repositories
- `security/` - JWT authentication utilities

### Frontend
- `components/` - React components for pages and UI elements
- `redux/` - State management
- `services/` - API service calls
- `styles/` - CSS and theming (including dark mode)

---

## API Endpoints

### Product
- `GET /api/products` - Get all products
- `GET /api/product/{id}` - Get product by ID
- `POST /api/product` - Add a new product
- `PUT /api/product/{id}` - Update a product
- `DELETE /api/product/{id}` - Delete a product
- `GET /products/search?keyword=` - Search products by keyword
- `GET /product/{id}/image` - Get product image

### Authentication
- `POST /auth/register` - User signup
- `POST /auth/login` - User login (returns JWT token)

---

## How to Run

### Backend
1. Clone the repository.
2. Navigate to the backend folder.
3. H2 in-memory database is used, so no external database setup is required.
4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
5. Access H2 console (optional) at: http://localhost:8080/h2-console

### Frontend

1. Navigate to the frontend folder.

2. Install dependencies:

npm install

3. Start the React application:

npm start

## Docker Deployment

Build Docker image:

docker build -t ecom-fullstack .

Run Docker container:

docker run -p 8080:8080 ecom-fullstack



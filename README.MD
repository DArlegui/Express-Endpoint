# Express Endpoint Project

## Description

This project is an example of an Express.js application that serves as an API for managing car records. It utilizes MySQL for database storage, with CRUD operations implemented for handling cars. The application is structured with middleware for database connection management, CORS handling, and request parsing.

## Features

**MySQL Database Integration:**

- The project establishes a connection to a MySQL database using a connection pool.
- SQL queries are used to perform operations on a 'car' table, including retrieval, insertion, update, and soft deletion.

**Middleware Architecture:**

- Middleware is implemented for managing database connections, ensuring proper handling and releasing of connections to prevent leaks.
- CORS middleware is employed to handle Cross-Origin Resource Sharing, allowing requests from different origins.

**Handlebars Templating Engine:**

- The application uses the Handlebars templating engine for rendering HTML views.

**Endpoint Routes:**

- Home route (`/`) renders a view displaying a list of cars retrieved from the database.
- Cars route (`/cars`) returns a JSON response with all cars in the database.
- Cars by ID route (`/cars/:id`) retrieves a specific car by its ID.
- POST, DELETE, and PUT routes for creating, marking as deleted, and updating car records.

**Error Handling:**

- Appropriate HTTP status codes and error messages are used for responses, ensuring proper handling of client-side errors.

**Port Configuration:**

- The application listens on the specified port (configured in the environment variable `PORT`).

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up a MySQL database and configure the environment variables in a `.env` file.
4. Run the application using `npm start`.
5. Access the API at `http://localhost:{PORT}` in your browser or API client.

Feel free to explore and extend this project for your own use or as a learning resource.

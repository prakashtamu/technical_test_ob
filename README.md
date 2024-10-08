# Technical Test Instructions for Node.js/TypeScript Developer

## Objective

Your task is to extend an existing Node.js web application by adding new features that simulate a real-world scenario. You will:

- Add a new endpoint that allows users to receive personalized recommendations based on their interests.
- Save these recommendations in a database.
- Add another endpoint to retrieve saved recommendations for each user.
- Integrate with a mock Large Language Model (LLM) agent using a provided Docker Compose setup.

This task assesses your ability to integrate external services, handle HTTP requests/responses, work with databases, and write clean, maintainable code following best practices.

## Project Overview

You are provided with a basic project structure of a web application built using Express.js and TypeScript. The application currently has a few endpoints set up. Your job is to:

1. **Add a new endpoint `/recommendations`** that generates and saves personalized recommendations.
    - Integrate with a mock LLM agent, accessible via Docker Compose, to generate recommendations.
    - Save recommendations in a database (you'll need to add a database service to the Docker Compose file).
  
2. **Add another endpoint `/users/:user_id/recommendations`** to retrieve saved recommendations.
    - Ensure proper error handling and input validation.
  
3. **Write unit tests** for your new code.
  
4. **Document your work** and provide instructions on how to run the application.

## Task Details

### 1. Start the Mock LLM Agent

- Use the provided `docker-compose.yml` file to start the mock LLM agent.
- LLM Agent URL: The mock LLM agent will be accessible at `http://localhost:1080`.

### 2. Create a New Endpoint `/recommendations`

- **Method**: POST
- **Description**: Accepts a JSON payload containing user preferences, generates personalized recommendations using the mock LLM agent, saves them in the database, and returns them in the response.
- **Request Body Example**:
  ```json
  {
    "user_id": "12345",
    "preferences": ["science fiction", "artificial intelligence", "space exploration"]
  }
  ```
- **Response Body Example**:
  ```json
  {
    "user_id": "12345",
    "recommendations": [
      "Book: 'Dune' by Frank Herbert",
      "Article: 'The Future of AI in Space Travel'",
      "Movie: 'Interstellar'"
    ]
  }
  ```

#### Real-World Scenario

This endpoint simulates a feature in a content platform where users receive content recommendations based on their interests.

### 3. Save Recommendations in the Database

- **Database Setup**:
  - Add a MongoDB database service to the `docker-compose.yml` file.
  - Configure the database connection in your application.
  - Define models/schemas using Mongoose.
- **Data Persistence**:
  - Save each user's recommendations in the database with the `user_id` as a reference.
  - Ensure that data is stored securely and efficiently.

### 4. Create Another Endpoint `/users/:user_id/recommendations`

- **Method**: GET
- **Description**: Retrieves saved recommendations for a given `user_id`. If the user hasn't requested any recommendations yet, return a 404 error.
- **Response Body Example (Success)**:
  ```json
  {
    "user_id": "12345",
    "recommendations": [
      "Book: 'Dune' by Frank Herbert",
      "Article: 'The Future of AI in Space Travel'",
      "Movie: 'Interstellar'"
    ]
  }
  ```
- **Error Response Example (User Not Found)**:
  ```json
  {
    "error": "No recommendations found for user_id 12345."
  }
  ```

### 5. Integrate with the Mock LLM Agent

- **LLM Agent Interaction**:
  - Send a POST request to `http://localhost:1080/llm/generate` with the user's preferences.
  - The mock LLM agent will return a list of recommendations based on the provided preferences.
- **LLM Agent Request Example**:
  ```json
  {
    "preferences": ["science fiction", "artificial intelligence", "space exploration"]
  }
  ```
- **LLM Agent Response Example**:
  ```json
  {
    "recommendations": [
      "Book: 'Dune' by Frank Herbert",
      "Article: 'The Future of AI in Space Travel'",
      "Movie: 'Interstellar'"
    ]
  }
  ```

### 6. Error Handling and Input Validation

- **Input Validation**:
  - Ensure that `user_id` is provided and is a non-empty string.
  - Ensure that `preferences` is a non-empty array of strings.
- **Error Handling**:
  - Handle scenarios where the LLM agent returns an error or is unreachable.
  - Handle database errors (e.g., connection issues, query failures).
  - Return appropriate HTTP status codes and error messages.
  - **Error Response Example**:
    ```json
    {
      "error": "Unable to fetch recommendations at this time. Please try again later."
    }
    ```

### 7. Write Unit Tests

- **Testing Framework**: Use Jest.
- **Requirements**:
  - Mock external calls to the LLM agent and the database to ensure tests are reliable and fast.
  - Cover successful responses, input validation errors, and failure scenarios (e.g., LLM agent down, database errors).

### 8. Documentation

- **Update README.md**:
  - Provide instructions on how to set up and run the application, including starting the services via Docker Compose.
  - Explain how to run the tests.
  - Document any assumptions or decisions made during development.

## Requirements

- **Programming Language**: Node.js with TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB (using Mongoose)
- **Testing Framework**: Jest
- **External Tools**: MockServer: Accessible at `http://localhost:1080` via Docker Compose.
- **Code Style**: Adhere to standard TypeScript and Node.js coding conventions.
- **Version Control**: Provide your solution in a Git repository format.

## Submission Guidelines

- **Source Code**: Submit all source code files, including the updated project structure.
- **Documentation**: Ensure the README.md is clear and provides all necessary instructions.
- **Dependencies**: Include a `package.json` file listing all dependencies.
- **Testing**: All tests should be runnable using a single command (e.g., `npm test`).
- **Docker Compose**: Include your updated `docker-compose.yml` file with the database service added. Ensure that all services can be started with `docker-compose up`.
- **Git Commits**: Make meaningful commit messages that reflect the changes made.

## Evaluation Criteria

- **Functionality**: The endpoints work as specified.
  - Correct integration with the mock LLM agent.
  - Data is correctly saved and retrieved from the database.
- **Code Quality**: Clean, readable, and well-organized code following best practices.
  - Proper use of comments and documentation where appropriate.
- **Error Handling**: Robust input validation and error management.
  - Appropriate HTTP status codes are returned.
- **Testing**: Comprehensive unit tests covering various scenarios.
  - Tests run successfully without errors.
- **Documentation**: Clear instructions and explanations in the README.md.
  - Any assumptions or design decisions are well-documented.
- **Integration**: Effective use of the provided MockServer to simulate the LLM agent.
  - Successful addition of a database service to Docker Compose.

## Notes

### Additional Libraries

You may use additional Node.js libraries if necessary (e.g., Axios for HTTP requests, Express Validator for input validation), but please justify their use in your documentation.

### Assumptions

If any part of the task is unclear, make reasonable assumptions and note them in the README.md.

### Focus Areas

Demonstrate your understanding of API development, external service integration, database interactions, and testing.

### Time Management

While quality is important, this task is also an opportunity to show how you manage your time to deliver a working solution efficiently.

We look forward to reviewing your submission. If you have any questions, feel free to reach out. Good luck!

## Getting Started

(For Your Reference)

Below is a brief guide to help you set up the project environment.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Set Up the Environment

- **Node.js Dependencies**:
  ```bash
  npm install
  ```

- **Docker Services**: Start all services (including the mock LLM agent and database) using Docker Compose:
  ```bash
  docker-compose up
  ```

### 3. Run the Application

Start the Node.js application:
```bash
npm run dev
```

### 4. Test the Endpoints

- **Generate Recommendations**:
  ```bash
  curl -X POST "http://localhost:8000/recommendations" \
  -H "Content-Type: application/json" \
  -d '{ "user_id": "12345", "preferences": ["science fiction", "artificial intelligence", "space exploration"] }'
  ```

- **Retrieve Recommendations**:
  ```bash
  curl -X GET "http://localhost:8000/users/12345/recommendations"
  ```

### 5. Run Tests

```bash
npm test
```

**: Note**: Replace `<repository-url>` and `<repository-directory>` with the actual URL and directory name of your Git repository.

## Additional Information

- **Mock LLM Agent Endpoint**: `http://localhost:1080/llm/generate`
- **Database Service**: Ensure the database is correctly configured in both `docker-compose.yml` and your application settings.
- Feel free to enhance the project structure and configuration as you see fit, as long as the core requirements are met. It is recommended to look at the different options for the LLM Agent Endpoints!

### Additional Notes

- **Database Connection**: Make sure to update the MongoDB connection string in `src/utils/database.ts` if necessary.
- **Error Handling**: The application includes basic error handling. Feel free to enhance it to cover more edge cases.
- **Testing**: The tests provided are basic and serve as a starting point. Expand them to cover more scenarios as required.
- **Logging**: Currently, console logs are used for simplicity. In a production environment, consider using a logging library.
- **Environment Variables**: For sensitive data and configuration, use environment variables or a configuration management system.

Good luck!
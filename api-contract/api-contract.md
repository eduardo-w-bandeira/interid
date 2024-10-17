# API Contract for InterId Platform

## Endpoints

### 1. User Management

#### Register User
- **POST** `/users`
- **Request Body:**
  ```json
  {
    "user_type": "individual" | "legal_entity",
    "first_name": "string",        // Required if individual
    "last_name": "string",         // Required if individual
    "birth_date": "YYYY-MM-DD",    // Required if individual
    "gov_id": "string",            // Required if individual
    "issuing_authority": "string", // Required if individual
    "country": "string",           // Required if individual
    "legal_name": "string",        // Required if legal_entity
    "business_name": "string",     // Required if legal_entity
    "reg_num": "string",           // Required if legal_entity
    "reg_date": "YYYY-MM-DD"       // Required if legal_entity
  }
  ```
- **Response:**
  - **201 Created**: Returns user details with `user_id`.
  - **400 Bad Request**: Validation errors.

#### Get User by ID
- **GET** `/users/{id}`
- **Response:**
  - **200 OK**: User details.
  - **404 Not Found**: User does not exist.

### 2. Declarations

#### Create Declaration
- **POST** `/declarations`
- **Request Body:**
  ```json
  {
    "user_id": "int",
    "title": "string",
    "cont": "string",
    "allow_comments": "boolean" // Optional, defaults to true
  }
  ```
- **Response:**
  - **201 Created**: Returns created declaration details.
  - **400 Bad Request**: Validation errors.

#### Get Declaration by ID
- **GET** `/declarations/{id}`
- **Response:**
  - **200 OK**: Declaration details.
  - **404 Not Found**: Declaration does not exist.

### 3. Agreements

#### Create Agreement
- **POST** `/agreements`
- **Request Body:**
  ```json
  {
    "title": "string",
    "cont": "string"
  }
  ```
- **Response:**
  - **201 Created**: Returns created agreement details.
  - **400 Bad Request**: Validation errors.

#### Get Agreement by ID
- **GET** `/agreements/{id}`
- **Response:**
  - **200 OK**: Agreement details.
  - **404 Not Found**: Agreement does not exist.

### 4. Agreement Participants

#### Add Participant to Agreement
- **POST** `/agreements/{agreement_id}/participants`
- **Request Body:**
  ```json
  {
    "user_id": "int"
  }
  ```
- **Response:**
  - **201 Created**: Returns participant details.
  - **400 Bad Request**: Validation errors.
  - **409 Conflict**: User already participating in agreement.

### 5. Declaration Comments

#### Add Comment to Declaration
- **POST** `/declarations/{declaration_id}/comments`
- **Request Body:**
  ```json
  {
    "user_id": "int",
    "cont": "string",
    "parent_comment_id": "int" // Optional
  }
  ```
- **Response:**
  - **201 Created**: Returns created comment details.
  - **400 Bad Request**: Validation errors.

#### Get Comments for Declaration
- **GET** `/declarations/{declaration_id}/comments`
- **Response:**
  - **200 OK**: List of comments associated with the declaration.

## Error Handling
- **400 Bad Request**: Invalid input or validation errors.
- **401 Unauthorized**: Authentication required or invalid token.
- **404 Not Found**: Resource does not exist.
- **409 Conflict**: Resource conflict (e.g., duplicate entries).

## Notes
- Ensure to handle pagination for endpoints that return lists (e.g., comments).
- All timestamps returned should be in ISO 8601 format.
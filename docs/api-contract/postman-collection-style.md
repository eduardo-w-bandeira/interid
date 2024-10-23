### Requests
#### 1. Register User
- **Method:** POST
- **Endpoint:** `/users`
- **Description:** Register a new user (individual or legal entity).
- **Request Body:**
  ```json
  {
    "user_type": "individual", // or "legal_entity"
    "first_name": "John",
    "last_name": "Doe",
    "birth_date": "1980-01-01",
    "gov_id": "ID123456",
    "issuing_authority": "ICBC",
    "country": "Canada",
    "legal_name": "Doe Enterprises",
    "business_name": "Doe's Books",
    "reg_num": "REG123",
    "reg_date": "2020-01-01"
  }
  ```
- **Response:**
  - **201 Created:** User details.
  - **400 Bad Request:** Validation errors.

***

#### 2. Get User by ID
- **Method:** GET
- **Endpoint:** `/users/{id}`
- **Description:** Retrieve user details by ID.
- **Path Parameters:**
  - `id`: User ID
- **Response:**
  - **200 OK:** User details.
  - **404 Not Found:** User does not exist.

***

#### 3. Create Declaration
- **Method:** POST
- **Endpoint:** `/declarations`
- **Description:** Create a new declaration.
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "title": "Declaration Title",
    "cont": "This is the content of the declaration.",
    "allow_comments": true
  }
  ```
- **Response:**
  - **201 Created:** Declaration details.
  - **400 Bad Request:** Validation errors.

***

#### 4. Get Declaration by ID
- **Method:** GET
- **Endpoint:** `/declarations/{id}`
- **Description:** Retrieve declaration details by ID.
- **Path Parameters:**
  - `id`: Declaration ID
- **Response:**
  - **200 OK:** Declaration details.
  - **404 Not Found:** Declaration does not exist.

***

#### 5. Create Agreement
- **Method:** POST
- **Endpoint:** `/agreements`
- **Description:** Create a new agreement.
- **Request Body:**
  ```json
  {
    "title": "Agreement Title",
    "cont": "This is the content of the agreement."
  }
  ```
- **Response:**
  - **201 Created:** Agreement details.
  - **400 Bad Request:** Validation errors.

***

#### 6. Get Agreement by ID
- **Method:** GET
- **Endpoint:** `/agreements/{id}`
- **Description:** Retrieve agreement details by ID.
- **Path Parameters:**
  - `id`: Agreement ID
- **Response:**
  - **200 OK:** Agreement details.
  - **404 Not Found:** Agreement does not exist.

***

#### 7. Add Participant to Agreement
- **Method:** POST
- **Endpoint:** `/agreements/{agreement_id}/participants`
- **Description:** Add a participant to an agreement.
- **Request Body:**
  ```json
  {
    "user_id": 1
  }
  ```
- **Response:**
  - **201 Created:** Participant details.
  - **400 Bad Request:** Validation errors.
  - **409 Conflict:** User already participating.

***

#### 8. Add Comment to Declaration
- **Method:** POST
- **Endpoint:** `/declarations/{declaration_id}/comments`
- **Description:** Add a comment to a declaration.
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "cont": "This is a comment.",
    "parent_comment_id": null // Optional
  }
  ```
- **Response:**
  - **201 Created:** Comment details.
  - **400 Bad Request:** Validation errors.

***

#### 9. Get Comments for Declaration
- **Method:** GET
- **Endpoint:** `/declarations/{declaration_id}/comments`
- **Description:** Retrieve all comments for a declaration.
- **Path Parameters:**
  - `declaration_id`: ID of the declaration
- **Response:**
  - **200 OK:** List of comments.

***
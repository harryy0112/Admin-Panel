# Admin Panel Application

This project is a web application that implements user authentication and admin panel functionalities using React, Redux, MongoDB, Express.js, and Node.js.

## Features

- **User Authentication**:

  - Register: Allows new users to register with a first name, last name, email, and password.
  - Login: Registered users can log in using their email and password.
  - Logout: Logged-in users can log out.

- **Admin Panel**:

  - User Management:
    - Create: Admin can add new users.
    - Read: Admin can view the list of users with pagination and search functionality.
    - Update: Admin can edit user details.
    - Delete: Admin can delete users.

- **Additional Functionalities**:
  - Password Encryption: User passwords are securely hashed and stored in the database using bcrypt.
  - Role-based Access Control (RBAC): Implemented roles (Admin, User) to restrict access to admin functionalities.
  - Form Validation: Frontend and backend validation for registration and login forms.
  - Error Handling: Proper error handling and display of user-friendly error messages.

## Technologies Used

- Frontend:

  - React.js
  - React Router
  - Redux for state management
  - Bootstrap for styling

- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose for database management
  - JWT (JSON Web Tokens) for authentication
  - bcrypt for password hashing

## Setup Instructions

### Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14.x or later)
- MongoDB (Make sure MongoDB server is running locally or accessible)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd admin-panel
   ```

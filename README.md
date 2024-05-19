
# Chat.io

#### Overview

Chat.io is a real-time chat application that facilitates seamless communication within public chat rooms. It is designed to provide an engaging and interactive user experience with real-time updates, user authentication, and responsive design for both mobile and desktop devices.

## Features

- Real-time Messaging: Instant messaging with real-time updates using Socket.IO.
- Public Chat Rooms: Join or create public chat rooms to communicate with others.
- User Authentication: Secure user login and registration with JWT (JSON Web Token).
- Responsive Design: Optimized for both mobile and desktop views.
- File Uploads: Share images and files using Firebase Bucket Storage.
## Screenshots

Here are some screenshots of the application:

### Login Page
![Login Page](./client/src/assets/Screenshot%20(155).png)

---

![Login Page](./client/src/assets/Screenshot%20(157).png)

---

### Chat Rooms
![Chat Rooms](./client/src/assets/Screenshot%20(158).png)

---

![Chat Rooms](./client/src/assets/Screenshot%20(159).png)

---

![Chat Rooms](./client/src/assets/Screenshot%20(160).png)

---


## Technologies Used

- Frontend: React, Vite, Tailwind CSS, Socket.IO Client
- Backend: Node.js, Express, MongoDB, Socket.IO
- Authentication: JWT (JSON Web Token)
- Hosting: Vercel, Render
- File Storage: Firebase Bucket Storage
- Security: Sanitize and validate all inputs to prevent XSS and other injection attacks using DOMPurify and Validator.

## Demo Credentials

For quick access and testing, you can use the following guest login credentials:

- Email: ram@gmail.com
- Password: ram

## Setup Instructions

### Prerequisites

- Node.js (>=14.x)
- npm

### Cloning Repository


git clone https://github.com/ravikirananaparthi/Chat.io.git


## Environment Variables

To run the application locally, you need to set up environment variables for both the frontend and backend.

#### Frontend Environment Variables

Create a `.env` file in the `client` directory with the following content:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_SERVER_VARIABLE=http://localhost:4000/api/v1
VITE_SOCKET_SERVER=http://localhost:4000
```

#### Backend Environment Variables

Create a `.env` file in the `server` directory with the following content:

```env
PORT=4000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Application Locally

#### Frontend

1. Navigate to the client directory:
    ```sh
    cd client
    ```

2. Install dependencies**:
    ```sh
    npm install
    ```

3. **Run the frontend development server**:
    ```sh
    npm run dev
    ```

#### Backend

1. **Navigate to the server directory**:
    ```sh
    cd ../server
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Run the backend development server**:
    ```sh
    npm run dev
    ```

### Access the Application

Open your browser and navigate to `http://localhost:5173`.

```

This README file now includes detailed instructions on setting up and running your application locally, including the necessary environment variables for both the frontend and backend.
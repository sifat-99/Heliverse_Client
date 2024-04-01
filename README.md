# Full Stack Web Application

This is a full-stack web application built using React.js for the frontend and Node.js/Express.js for the backend. The application allows users to view and interact with a list of users, perform CRUD operations on the user data, search for users by name, filter users based on domain, gender, and availability, create teams by selecting users, and view team details.

## Frontend

### Technologies Used
- React.js: A JavaScript library for building user interfaces.
- Redux Toolkit: A package that provides tools and capabilities for managing state in React applications.

### Features
- Display users in cards format with pagination.
- Search for users by name.
- Implement filters for domain, gender, and availability.
- Create teams by selecting users from the list.
- Show team details.
- Responsive design for different screen sizes.

## Backend

### Technologies Used
- Node.js: A JavaScript runtime for building server-side applications.
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing user data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.

### API Endpoints
- `GET /api/users`: Retrieve all users with pagination support.
- `GET /api/users/:id`: Retrieve a specific user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update an existing user.
- `DELETE /api/users/:id`: Delete a user.
- `POST /api/team`: Create a new team by selecting users with unique domains and availability.
- `GET /api/team/:id`: Retrieve the details of a specific team by ID.

## Tech Stack

### Frontend
- React.js
- Redux Toolkit

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## How to Run

### Frontend
1. Clone this repository.
3. Install dependencies using `npm install`.
4. Start the development server using `npm run dev`.


## Live Link
- Frontend Live link: [Heliverse](https://stately-kataifi-f4bf93.netlify.app/)
- Backend Live Link: [Server](https://heliverse-server-khaki.vercel.app/)

Enjoy interacting with the users and managing teams in the application!

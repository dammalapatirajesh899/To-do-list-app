# To-Do List Application

This is a **To-Do List Application** built with:

- **Frontend:** React.js with TypeScript
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (optional for persistent storage)

## Features

✅ Add, edit, delete, and mark tasks as completed
✅ Interactive UI with React and TypeScript
✅ RESTful API for backend operations
✅ MongoDB for data persistence (optional)
✅ Error handling and validation

## Project Structure


/todo-app
├── /frontend   # React.js with TypeScript
├── /backend    # Node.js with Express.js
└── README.md   # Project Documentation



## 🏗️ Setup Instructions

### 🔹 Prerequisites
Ensure you have the following installed:

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (optional, if using a database)


## 🚀 Running the Backend (Node.js with Express.js)

1️⃣ Navigate to the `backend` folder:
bash
cd backend


2️⃣ Install dependencies:
bash
npm install


3️⃣ Configure the `.env` file (if required, for MongoDB URL, PORT, etc.):

PORT=5000
MONGO_URI=mongodb://localhost:27017/todolist


4️⃣ Start the backend server:
bash
npm start


By default, the backend will run on **http://localhost:5000**


## 🌐 Running the Frontend (React.js with TypeScript)

1️⃣ Navigate to the `frontend` folder:
bash
cd frontend


2️⃣ Install dependencies:
bash
yarn install  # or npm install


3️⃣ Start the frontend server:
bash
yarn start  # or npm start


By default, the frontend will run on **http://localhost:3000**


## 📡 API Endpoints (Backend)

| Method  Endpoint        Description          
|--------|--------------|----------------------|
| GET    | `/api/tasks` | Get all tasks        |
| POST   | `/api/tasks` | Add a new task       |
| PUT    | `/api/tasks/:id` | Update a task   |
| DELETE | `/api/tasks/:id` | Delete a task   |

---
## 📌 Technologies Used

### **Frontend**
- React.js (TypeScript)
- Axios for API requests
- Material-UI for styling

### **Backend**
- Node.js with Express.js
- MongoDB (optional, with Mongoose)
- CORS for cross-origin requests

---
 Contributing
Feel free to submit pull requests or report issues.

---
 License
This project is licensed under the MIT License.
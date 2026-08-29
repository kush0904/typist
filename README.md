<div align="center">
  <img src="https://raw.githubusercontent.com/kush-0904/typist/main/client/public/favicon.png" alt="Typista Logo" width="120" />

  # ⌨️ TYPISTA
  
  **A beautifully modern, immersive, real-time multiplayer typing test experience.**

  [![Live Demo](https://img.shields.io/badge/Play_Now-Live_Site-4285F4?style=for-the-badge&logo=googlechrome)](https://typistaa.netlify.app/)
  [![Tech Stack](https://img.shields.io/badge/Stack-MERN%20%7C%20Socket.io-20232A?style=for-the-badge&logo=react)](https://reactjs.org/)
</div>

<br />

Welcome to **Typista**, a sleek and modern web application built to help you measure and improve your typing speed (WPM) in a highly interactive environment. Featuring real-time multiplayer racing, 3D particle backgrounds, and a beautiful liquid-glass UI.

---

## ✨ Features

- 🏎️ **Real-Time Multiplayer:** Compete against your friends in live typing races using WebSockets.
- 🎯 **Single Player Practice:** Hone your skills with instant WPM, Error, and Accuracy tracking.
- 📊 **Performance Dashboard:** Track your historical typing progression over time with automated trend charts and analytics.
- 🌌 **Interactive 3D UI:** Stunning, interactive particle backgrounds powered by `React Three Fiber`.
- 🪟 **Glassmorphism Design:** A premium, modern UI/UX featuring frosted glass components and smooth Framer Motion animations.
- 🔒 **Secure Authentication:** Integrated with Firebase Auth for Google Sign-In and secure Email/Password registration.

## 🛠️ Tech Stack

**Frontend (Client)**
- **React.js (Vite)** - Fast, modern framework
- **Tailwind CSS** - Styling and Glassmorphism effects
- **Framer Motion** - Fluid animations and transitions
- **React Three Fiber & Drei** - 3D Canvas rendering
- **Zustand** - State management
- **Firebase** - Authentication

**Backend (Server)**
- **Node.js & Express** - REST API and server architecture
- **Socket.io** - Real-time WebSocket communication for multiplayer rooms
- **MongoDB & Mongoose** - Database for storing user game history

---

## 🚀 Getting Started

Follow these instructions to run the full-stack application on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/typist.git
cd typist
```

### 2. Setup the Backend (Server)
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add your MongoDB credentials:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```
Start the backend server:
```bash
npm start
```

### 3. Setup the Frontend (Client)
Open a new terminal window and navigate to the client directory:
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory and add your Firebase credentials:
```env
VITE_SERVER_URL=http://localhost:5001
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
```
Start the development server:
```bash
npm run dev
```

### 4. Play!
Open `http://localhost:5173` in your browser.

---

<div align="center">
  <i>Built with ❤️ for speed typists everywhere.</i>
</div>

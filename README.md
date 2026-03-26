# Service Match

**Service Match** is a dynamic web-based marketplace built to connect local, skilled workers with clients needing everyday tasks completed. 

The platform allows unorganized service providers (such as plumbers, cleaners, and carpenters) to create digital profiles showcasing their specific skills and experience. Simultaneously, clients can easily browse this interactive directory to find and hire the right talent for their jobs.

## Features
* **Secure User Accounts:** Create a custom account and log in securely.
* **Worker Registration:** Upgrade your profile by registering professional skills and experience.
* **Service Discovery:** Visually browse an integrated, dynamic directory of all available workers.

## Tech Stack
* **HTML5 & CSS3:** Frontend structure and styling.
* **JavaScript (ES6):** Client-side interactivity.
* **Node.js & Express.js:** Backend server and routing framework.
* **Firebase Firestore:** Scalable NoSQL cloud database for storing profiles.
* **Firebase Admin SDK:** Secure backend connectivity to the database.
* **Bcrypt & Express-Session:** Used to securely hash passwords and manage logins.

## Project Structure
```text
fsd401/ 
├── server.js                 # Main server configuration
├── firebase.js               # Firebase database connection setup
├── routes/                   
│   ├── auth.js               # User authentication logic
│   └── worker.js             # Worker dashboard and listing logic
├── public/                   # Static frontend HTML, CSS, and JS files
└── package.json              # Project dependencies
```

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Obtain your `serviceAccountKey.json` from Firebase and place it in the root directory.
4. Run `node server.js` to start the local backend server.
5. Visit `http://localhost:3000` in your web browser.

# Notes-App  

An intuitive, full-stack note-taking app built with the MERN stack.  
Users can register, login, and manage their own private notes.  

## 🚀 Live Demo  
Check it out: [Live version](https://notes-app-fawn-eight.vercel.app/login)  

## 🧰 Tech Stack  
- **Frontend**: React + React Router + Axios for API calls + Tailwind CSS for styling  
- **Backend**: Node.js + Express.js for server/API + MongoDB (via Mongoose) for database  
- **Auth**: JWT for authentication + bcrypt for password hashing  
- **Deployment**: Frontend + Backend deployed (e.g., on Vercel/Render)  

## 📁 Folder Structure  
```bash
/notes-app
├── frontend/              ← React app  
│   └── src/  
│       ├── components/  
│       └── pages/  
│  
├── backend/               ← Express server  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   └── server.js  
│  
└── .gitignore
```


## ✅ Features  
- User registration & login (with hashed passwords)  
- JWT-based authentication and protected routes  
- Create, read, update, delete (CRUD) notes  
- Each user has their own private notes  
- Clean, responsive UI using Tailwind CSS  

## 🔧 Installation & Setup  
1. Clone this repository:  
   ```bash
   git clone https://github.com/GhostRider9211/notes-app.git
   ```
2. Create a .env file in the backend folder with:
   ```bash
   MONGO_URI=your_mongo_connection_string  
   JWT_SECRET=your_secret_key  
   ```
3. Install dependencies and run:
   ```bash
   # Backend
   cd backend  
   npm install  
   npm run dev
 

   # Frontend
   cd ../frontend  
   npm install  
   npm run dev
   ```
4.Open your browser and head to http://localhost:3000 (or as configured) to use the app.
  ```bash
# API Endpoints
POST   /api/users/login       – User login  
POST   /api/users             – User registration  
GET    /api/notes             – Get all notes for logged-in user  
POST   /api/notes             – Create a new note  
PUT    /api/notes/:id         – Update an existing note  
DELETE /api/notes/:id         – Delete a note  

  ```
## 🛡️ Authentication & Security  

- Passwords hashed using **bcrypt**  
- **JSON Web Tokens (JWTs)** used to secure routes  
- Notes are tied to specific users; only the owner can modify them  

---

## 🎯 Future Enhancements  

- Add tagging / categorisation of notes  
- Introduce dark mode / theme switcher  
- Add search/filter functionality for notes  
- Offer collaborative/shared notes  
- Improve UI/UX further (animations, richer editor, attachments)  

---

## 🤝 Contributing  

Contributions are welcome! If you’d like to add a feature or fix something:  

1. **Fork** the repo  
2. **Create a new branch and commit your changes, then push:**  
   ```bash
   git checkout -b feature-yourFeature
   git commit -am "Add yourFeature"
   git push origin feature-yourFeature
   ```
   3.**Open a Pull Request and describe your change**


   


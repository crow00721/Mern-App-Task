# Mern-App-Task


##  Setup & Run

### 1. Clone the repository

```
git clone https://github.com/crow00721/Mern-App-Task.git
cd Mern-App-Task
```

---

## 🔧 Backend Setup

```
cd server
npm install
```

Create a `.env` file inside `server` folder:

```
MONGO_URI=your_mongodb_connection
OPENROUTER_API_KEY=your_api_key
PORT=5000
```

Run backend:

```
npm start
```

---

## 💻 Frontend Setup

```
cd client
npm install
npm run dev
```

---

## 🌐 Run the App

* Frontend: http://localhost:5173
* Backend: http://localhost:5000

---

## 🧪 Test API

POST request:

```
http://localhost:5000/api/ask-ai
```

Body:

```
{
  "prompt": "Hello AI"
}
```

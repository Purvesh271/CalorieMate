# 🥗 CalorieMate

CalorieMate is a full-stack nutrition tracking web application that helps users log daily food intake, automatically calculate personalized nutrition goals, and track weekly progress through a clean and intuitive interface.

The application focuses on simplicity, accuracy, and real-world usability rather than manual calculations.

---

## ✨ Features

 🧮 **Automatic Nutrition Goal Calculation:** Daily calorie, protein, and water goals are calculated automatically based on current and target weight.

- 👤 **Secure User Authentication:** Users can sign up, log in, and access protected routes using secure token-based authentication.

- 📝 **Profile Management:** Edit personal details like name, current weight, and target weight. All nutrition goals update automatically.

- 🤖 **AI-Powered Food Logging:** Log food using natural language (e.g., *“100g paneer and 2 eggs”*) with automatic calorie and protein calculation using Gemini AI.

- 📊 **Daily Nutrition Dashboard:** Track daily consumption and compare it against personalized goals with real-time progress indicators.

- 📅 **Weekly Nutrition History:** View the last 7 days of nutrition data, analyze trends, and monitor consistency over time.

- 📱 **Responsive Design:**  Fully responsive layout that works smoothly across desktop, tablet, and mobile devices.

- 🔔 **Modern Notifications:** Clean, non-blocking toast notifications provide instant user feedback.

---

## 🛠 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Authentication:** JWT, Bcrypt  
- **AI Integration:** Gemini AI  
- **Others:** React Toastify, HTTP Status Codes

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/caloriemate.git
cd caloriemate
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
npm run dev
```
Create a .env file in the backend folder:
```bash
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 3️⃣ Setup Frontend
```bash
cd caloriemate-react-app
npm install
npm run dev
```

---

## 📌 Future Enhancements

- 🥗 Micronutrient tracking (fiber, fats, vitamins)   
- 🔔 Smart reminders for meal logging and hydration    
- 📈 Monthly and long-term nutrition analytics  
- 🤖 Advanced AI-based nutrition insights and suggestions  

---

## 👤 Author

**Purvesh Patil**

---

## 📃 License

This project is licensed under the **MIT License**.
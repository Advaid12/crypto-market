# crypto-market
---

🚀 CryptoPulse – Crypto Market Overview

> A full-stack cryptocurrency market dashboard built using React.js and Node.js (Express).
Displays real-time crypto prices, watchlist management, portfolio tracking, and simulated exchange functionality.




---

🌍 Live Demo

🔗 Frontend: https://your-frontend-url.vercel.app

🔗 Backend API: https://crypto-market-production.up.railway.app



---

📸 Preview

<!-- Optional: Add screenshot here --><!-- ![App Screenshot](./screenshot.png) -->
---

✨ Features

📊 Real-time cryptocurrency market data

🔄 Auto-refresh every 30 seconds

🔍 Search cryptocurrencies

⭐ Add/Remove assets from Watchlist

💾 Persistent watchlist using localStorage

💼 Portfolio value calculation

💱 Simulated Exchange interface

📡 API live/offline status indicator



---

🛠 Tech Stack

Frontend

React.js

React Router DOM

JavaScript (ES6+)

CSS


Backend

Node.js

Express.js

Axios

CORS

CoinGecko API


Deployment

Vercel (Frontend)

Railway (Backend)



---

📂 Project Structure

crypto-market/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── styles.css
│   └── package.json
│
├── server/                 # Express Backend
│   ├── server.js
│   └── package.json
│
└── README.md


---

⚙️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/Advaid12/crypto-market.git
cd crypto-market


---

2️⃣ Run Backend

cd server
npm install
node server.js

Backend runs on:

http://localhost:5000


---

3️⃣ Run Frontend

Open new terminal:

cd client
npm install
npm start

Frontend runs on:

http://localhost:3000


---

🔌 API Endpoint

GET /api/coins

Fetches real-time cryptocurrency data from CoinGecko API.


---

🧠 Key Implementation Highlights

Watchlist Persistence

localStorage.setItem("watchlist", JSON.stringify(watchlistIds));

Derived Watchlist from Fresh Data

const watchlist = coins.filter((coin) =>
  watchlistIds.includes(coin.id)
);

Auto Data Refresh

setInterval(fetchCoins, 30000);


---

🚀 Deployment Architecture

User
  ↓
Vercel (React Frontend)
  ↓
Railway (Express Backend)
  ↓
CoinGecko API


---

⚠️ Known Limitations

CoinGecko API rate limits (HTTP 429 possible)

Exchange feature is simulated

No authentication implemented



---

📈 Future Enhancements

🔐 User authentication (JWT)

📈 Interactive price charts

🌙 Dark/Light theme toggle

📊 Portfolio quantity tracking

⚡ Backend caching

🔔 Price alerts



---

👨‍💻 Author

Advaith Manoj
GitHub: https://github.com/Advaid12


---

📜 License

This project is built for educational and evaluation purposes.


---

import React, { useState, useEffect, useMemo } from "react";
import "./Header.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("authData"));
    if (storedData) {
      const currentTime = new Date().getTime();
      if (currentTime < storedData.expiry) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("authData");
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "crunchybites" && password === "1727") {
      setIsLoggedIn(true);
      const expiryTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem(
        "authData",
        JSON.stringify({ username, expiry: expiryTime })
      );
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem("authData");
  };

  const data = useMemo(
    () => ({
      labels: [
        "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
      ],
      datasets: [
        {
          label: "Revenue (₹)",
          data: [
            12000, 15000, 13000, 18000, 20000, 22000,25000, 27000, 30000, 32000, 35000, 38000,
          ],
          borderColor: "#5cb85c",
          backgroundColor: "rgba(92,184,92,0.2)",
          tension: 0.4,
        },
      ],
    }),
    []
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Revenue Trend (Jan - Dec)",
        },
      },
    }),
    []
  );

  return (
    <div className="dashboard">
    <div className="main">
      {isLoggedIn ? (
        <>
          <header className="header">
            <h1>Dashboard</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </header>

          <section className="cards">
            <div className="card">
              <h3>Total Users</h3>
              <p>120</p>
            </div>
            <div className="card">
              <h3>Total Sales</h3>
              <p>85</p>
            </div>
            <div className="card">
              <h3>Revenue</h3>
              <p>₹50,000</p>
            </div>
            <div className="card">
              <h3>Feedbacks</h3>
              <p>27</p>
            </div>
          </section>


          <section className="charts" >
            <Line data={data} options={options} />
          </section>
        </>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
    </div>
  );
};

export default Header;


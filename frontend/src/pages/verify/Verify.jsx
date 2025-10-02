import React, { useContext, useEffect, useState } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContextProvider.jsx';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const success = searchParams.get("success");
        const userId = searchParams.get("userId");
        const items = JSON.parse(searchParams.get("items") || "[]");
        const amount = parseFloat(searchParams.get("amount") || 0);
        const address = JSON.parse(searchParams.get("address") || "{}");

        if (!success || !userId || !items.length || !amount || !address) {
          setMessage("Invalid payment details. Redirecting...");
          setTimeout(() => navigate("/"), 2000);
          return;
        }

        // Send order info to backend verify API
        const response = await axios.post(url + "/api/order/verify", {
          success,
          userId,
          items,
          amount,
          address
        });

        if (response.data.success) {
          setMessage("Payment successful! Redirecting to your orders...");
          setTimeout(() => navigate("/myorders"), 2000);
        } else {
          setMessage("Payment failed. Redirecting to home...");
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (error) {
        console.error("Verify Payment Error:", error);
        setMessage("Something went wrong. Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      }
    };

    verifyPayment();
  }, [searchParams, url, navigate]);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Verify;

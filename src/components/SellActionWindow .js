import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import "./SellActionWindow.css";
import GeneralContext from "./GeneralContext";

const SellActionWindow = ({ uid }) => {
  const { closeSellWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleSellClick = async () => {
    try {
      const res = await axios.post("http://localhost:3000/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "SELL",
      });

      setMessage(res.data.message);

      setStockQuantity(1);
      setStockPrice(0);

      setTimeout(() => {
        closeSellWindow();
        setMessage("");
      }, 2000);
    } catch (err) {
      console.error("SELL error full:", err);
      if (err.response) {
        setError(err.response.data.message || "Failed to place SELL order");
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("Unexpected error occurred while placing SELL order.");
      }
    }
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="buttons">
        {message && (
          <p
            style={{
              color: message.includes("successfully") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
        <span>Margin check on SELL not required</span>
        <div>
          <Link className="btn btn-red" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;

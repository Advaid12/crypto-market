import { useState } from "react";

function Exchange({ coins }) {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState("");

  const handleTrade = () => {
    if (!selectedCoin || amount <= 0) {
  alert("Enter valid trade amount");
  return;
}
    alert(`Trade placed: ${amount} ${selectedCoin}`);
    setAmount("");
  };

  return (
    <div className="container">
      <h2>Exchange</h2>

      <div className="exchange-card">
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
        >
          <option value="">Select Coin</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.symbol}>
              {coin.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleTrade}>Trade</button>
      </div>
    </div>
  );
}

export default Exchange;
import React, { useState } from 'react';
import countryList from './countryList';
import './App.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRateMsg, setExchangeRateMsg] = useState(`1 USD = 80 INR`);

  const updateExchangeRate = async () => {
    let amountInput = document.querySelector(".amount input");
    let amountVal = amountInput.value;
    if (amountVal === "" || amountVal < 1) {
      amountVal = 1;
      setAmount(1);
    }

    const apiKey = 'e6d5e8bc8f82f3c8fe796cf39243076c';
    const apiUrl = `https://api.forexrateapi.com/v1/latest?api_key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const fromRate = data.rates[fromCurrency];
    const toRate = data.rates[toCurrency];

    if (fromRate && toRate) {
      const rate = toRate / fromRate;
      let finalAmount = amountVal * rate;
      setExchangeRateMsg(`${amountVal} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency}`);
    } else if (fromCurrency === 'USD') {
      // Provide a default conversion if 'USD' is the source currency
      let finalAmount1 = amountVal * 83.08;
      setExchangeRateMsg(`${amountVal} ${fromCurrency} = ${finalAmount1.toFixed(2)} ${toCurrency}`);
    } else {
      setExchangeRateMsg("Error fetching exchange rates");
    }
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    updateExchangeRate();
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <form>
        <div className="amount">
          <p>Enter Amount</p>
          <input value={amount} type="text" onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="dropdown">
          <div className="from">
            <p>From</p>
            <div className="select-container">
              <img src={`https://flagsapi.com/${countryList[fromCurrency]}/flat/64.png`} alt="" />
              <select name="from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {Object.keys(countryList).map((currcode) => (
                  <option key={currcode} value={currcode}>
                    {currcode}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <i className="fa-solid fa-arrow-right-arrow-left"></i>
          <div className="to">
            <p>To</p>
            <div className="select-container">
              <img src={`https://flagsapi.com/${countryList[toCurrency]}/flat/64.png`} alt="" />
              <select name="To" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {Object.keys(countryList).map((currcode) => (
                  <option key={currcode} value={currcode}>
                    {currcode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="msg">{exchangeRateMsg}</div>
        <button onClick={handleButtonClick}>Get Exchange Rate</button>
      </form>
    </div>
  );
};

export default CurrencyConverter;

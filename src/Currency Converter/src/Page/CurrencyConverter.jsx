import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css'
const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch('https://interview.switcheo.com/prices.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setCurrencies(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleConvert = () => {
    const fromRate = currencies.find(curr => curr.currency === fromCurrency)?.price || 1;
    const toRate = currencies.find(curr => curr.currency === toCurrency)?.price || 1;
    const result = (amount * fromRate) / toRate;
    setConvertedAmount(result.toFixed(5)); // Adjust as needed
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <form onSubmit={e => { e.preventDefault(); handleConvert(); }}>
        <label>
          Convert from:
          <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
            {currencies.map(currency => (
              <option key={currency.currency} value={currency.currency}>
                {currency.currency}
              </option>
            ))}
          </select>
        </label>
        <label>
          Convert to:
          <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
            {currencies.map(currency => (
              <option key={currency.currency} value={currency.currency}>
                {currency.currency}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input type="number" id="amount" name="amount" min="0" required  value={amount} onChange={e => setAmount(e.target.value)} />
        </label>
        <button type="submit">Convert</button>
      </form>
      {convertedAmount && (
        <p>
          {amount} {fromCurrency} equals {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;

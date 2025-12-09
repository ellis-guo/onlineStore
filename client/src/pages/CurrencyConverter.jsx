import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getExchangeRates } from "../api/currency.api";
import "./CurrencyConverter.css";

function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Popular currencies to show
  const popularCurrencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  ];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const data = await getExchangeRates();
        setRates(data);
        setError(null);
      } catch (err) {
        setError("Failed to load exchange rates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convertAmount = () => {
    if (!rates[targetCurrency]) return 0;
    return (amount * rates[targetCurrency]).toFixed(2);
  };

  const getCurrencySymbol = (code) => {
    const currency = popularCurrencies.find((c) => c.code === code);
    return currency ? currency.symbol : code;
  };

  if (loading) {
    return (
      <div className="currency-page">
        <Navbar />
        <main className="currency-main">
          <div className="loading-container">
            <div className="loading"></div>
            <p>Loading exchange rates...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="currency-page">
        <Navbar />
        <main className="currency-main">
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="currency-page">
      <Navbar />
      <main className="currency-main">
        <div className="currency-container">
          <h1 className="currency-title">Currency Converter</h1>
          <p className="currency-subtitle">Convert CAD to other currencies</p>

          <div className="converter-card">
            {/* Amount Input */}
            <div className="input-group">
              <label htmlFor="amount">Amount (CAD)</label>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">C$</span>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="amount-input"
                />
              </div>
            </div>

            {/* Currency Selection */}
            <div className="input-group">
              <label htmlFor="currency">Convert to</label>
              <select
                id="currency"
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="currency-select"
              >
                {popularCurrencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Result */}
            <div className="result-box">
              <div className="result-label">Converted Amount</div>
              <div className="result-amount">
                {getCurrencySymbol(targetCurrency)} {convertAmount()}
              </div>
              <div className="exchange-rate">
                1 CAD = {rates[targetCurrency]?.toFixed(4)} {targetCurrency}
              </div>
            </div>
          </div>

          {/* Quick Reference Table */}
          <div className="quick-reference">
            <h2>Quick Reference</h2>
            <div className="reference-grid">
              {popularCurrencies.map((currency) => (
                <div key={currency.code} className="reference-item">
                  <div className="ref-currency">
                    {currency.symbol} {currency.code}
                  </div>
                  <div className="ref-amount">
                    {currency.symbol}{" "}
                    {(amount * (rates[currency.code] || 0)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CurrencyConverter;

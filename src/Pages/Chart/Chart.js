import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import "./Chart.css";

const Chart = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if TradingView is already loaded
    if (typeof window !== "undefined" && !window.TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        initializeCharts();
        setLoading(false); // Set loading to false once the script is loaded and charts initialized
      };
      document.body.appendChild(script);
    } else {
      initializeCharts();
      setLoading(false); // If script is already loaded, set loading to false
    }
  }, []);

  const initializeCharts = () => {
    if (!window.TradingView) {
      console.error("TradingView script still not loaded");
      return;
    }

    new window.TradingView.widget({
      container_id: "forex-chart",
      width: "100%",
      height: 400,
      symbol: "OANDA:EURUSD", // Change as needed
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
    });

    new window.TradingView.widget({
      container_id: "crypto-chart",
      width: "100%",
      height: 400,
      symbol: "BINANCE:BTCUSDT", // Change as needed
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
    });
  };

  return (
    <>
      <div className="chart-container">
        <h1 className="chart-heading">Forex & Crypto Exchange Charts</h1>

        {/* Loading bar */}
        {loading && <div className="loading-bar"></div>}

        <div>
          <h2>Forex Chart</h2>
          <div id="forex-chart"></div>
        </div>

        <div>
          <h2>Crypto Exchange Chart</h2>
          <div id="crypto-chart"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chart;

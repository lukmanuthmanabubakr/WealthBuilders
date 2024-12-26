import React, { useState, useEffect } from 'react';
import './HomePageAdvert.css';

const HomePageAdvert = () => {
  const investmentUpdates = [
    // Original investment updates
    "Michael invested $20,000 in the Diamond Plan.",
    "Emily just made a $15,000 investment in the Diamond Plan.",
    "John secured $60,000 in the Platinum Investment Plan.",
    // Additional investment updates with more variety
    "Sarah started her journey with a $5,000 Silver Plan investment.",
    "The Thompson family secured their future with a $100,000 Elite Plan.",
    "Robert diversified his portfolio with a $45,000 multi-plan strategy.",
    "Emma's retirement fund grew with a $30,000 Gold Plan addition.",
    "The Wilson Group added $75,000 to their corporate investment.",
    "Jessica's smart choice: $12,000 in the Strategic Growth Plan.",
    "Peter maximized returns with a $50,000 Platinum Plus investment.",
    "Global Traders LLC secured $200,000 in the Enterprise Plan.",
    "Rachel's financial journey began with an $8,000 Starter Plan.",
    "Marcus upgraded to the Premium Tier with $35,000 investment.",
    "Victoria's portfolio expanded with a $28,000 Diamond Elite Plan.",
    "International Holdings added $150,000 to their master account."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % investmentUpdates.length);
    }, 3000); // Changes every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-advert">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {investmentUpdates[currentIndex]}
        </div>
      </div>
    </div>
  );
};

export default HomePageAdvert;
import React, { useEffect, useState } from "react";
import "./MaintenanceMode.css"; // Create this CSS file

const MaintenanceMode = () => {
  const [timeLeft, setTimeLeft] = useState(6 * 60 * 60); // 6 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="maintenance-overlay">
      <div className="maintenance-content">
        <h1>🚧 Site Under Maintenance 🚧</h1>
        <p>
          Our investment platform is currently under maintenance to serve you
          better. We will be back online in:
        </p>
        <div className="countdown">{formatTime(timeLeft)}</div>
        <p>We appreciate your patience. Thank you for staying with us! 🙏</p>
      </div>
    </div>
  );
};

export default MaintenanceMode;

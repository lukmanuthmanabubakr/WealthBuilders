import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'info', duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`notification ${type} ${visible ? 'slide-down' : ''}`}>
      <span>{message}</span>
      <button onClick={() => { setVisible(false); onClose(); }}>X</button>
    </div>
  );
};

export default Notification;

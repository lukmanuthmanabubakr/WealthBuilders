import React, { useEffect, useState } from 'react';
import './Advert.css';

const Advert = () => {
    const sentences = [
        "Michael invested $20,000 in the Diamond Plan.",
        "Emily just made a $15,000 investment in the Diamond Plan.",
        "John secured $60,000 in the Platinum Investment Plan.",
        "Sophie added $10,000 to her investment portfolio.",
        "Lucas expanded his investments with a $25,000 deposit.",
        "Chloe increased her funds with a $40,000 Diamond Plan.",
        "David secured $4,000 in the Strategic Silver Plan.",
        "Mia started her portfolio with a $12,000 deposit.",
        "Noah invested $22,000 in the Diamond Plan Plan.",
        "Ella placed $500 into her starter investment.",
        "Liam boosted his portfolio with $50,000 in the Platinum Plan.",
        "Charlotte secured a $4,500 investment in the Silver Plan.",
        "Oliver expanded his investments with $17,000 in the Gold Plan Plan.",
        "Amelia committed $60,000 to the Platinum Plan.",
        "Henry increased his wealth with a $28,000 investment.",
        "Isabella added $8,000 to her diversified portfolio.",
        "James secured a $90,000 spot in the Platinum Plan.",
        "Ava contributed $9,000 to her Gold Plan.",
        "Benjamin boosted his portfolio with a $20,000 deposit.",
        "Sophia invested $25,000 in the Advanced Diamond Plan.",
        "William entered the market with $60,000 in the Platinum Plan.",
        "Evelyn added $27,000 to her future investments.",
        "Alexander secured $15,000 in a stable Diamond investment.",
        "Harper chose the Diamond Plan with a $33,000 investment.",
        "Jack started a diversified plan with $14,000."
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        }, 2000); // Change text every 2 seconds

        return () => clearInterval(interval);
    }, [sentences.length]);

    return (
        <div className="advert-container">
            <div className="rotating-text">{sentences[index]}</div>
        </div>
    );
};

export default Advert;

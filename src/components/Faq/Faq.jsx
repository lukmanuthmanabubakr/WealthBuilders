import React, { useState } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import "./Faq.css";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container" id="faq">
      <div className="faq">
        <h1>FAQ Questions</h1>
        <p>Unlock Valuable Investment Knowledge.</p>

        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <p>{item.question}</p>
              {openIndex === index ? (
                <MdOutlineArrowDropUp />
              ) : (
                <MdOutlineArrowDropDown />
              )}
            </div>
            <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const faqData = [
  {
    question: "How does it work with two wallets?",
    answer:
      "Our system allows you to connect and manage two separate wallets simultaneously. This means you can keep funds in one wallet for investments and use the other for transactions or withdrawals. It’s a flexible setup designed to give you control over your assets while keeping them organized.",
  },
  {
    question: "What are the benefits of joining?",
    answer:
      "By joining, you gain access to exclusive benefits, such as personalized investment insights, priority support, and a range of tools to help grow your investments. Our platform is secure and user-friendly, providing a reliable environment to manage and monitor your portfolio.",
  },
  {
    question: "Is my money safe?",
    answer:
      "Absolutely. We prioritize the safety of your funds with industry-standard security measures, including encryption, two-factor authentication, and regular security audits. Your data and transactions are fully protected, and we comply with all relevant data protection regulations to ensure your money is safe.",
  },
  {
    question: "Can I withdraw at any time?",
    answer:
      "Yes, you can initiate withdrawals at any time through your account dashboard. Our system processes requests swiftly, and funds are typically available within 1-2 business days depending on the payment method chosen. Withdrawals are hassle-free, giving you access to your money when you need it.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Our support team is available 24/7 to help with any questions or issues. You can reach us through live chat, email, or our dedicated phone line. We’re committed to providing fast and reliable assistance to ensure a smooth experience on our platform.",
  },
];

export default Faq;

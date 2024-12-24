import React, { useState } from "react";
import contactPage from "../../Assets/undraw_profile_d7qw.svg";
import "./Contact.css";
import Footer from "../../components/Footer/Footer";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formDetails, setFormDetails] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_wq7xhrw",
        "template_l8rcahn",
        formDetails,
        "3qC7soOdki8uls5LY" // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitted(true);
          setNotification("Message sent successfully!");
          setTimeout(() => setNotification(""), 5000); // Clear the notification after 5 seconds
        },
        (err) => {
          console.error("FAILED...", err);
          setNotification("Message failed to send. Please try again.");
          setTimeout(() => setNotification(""), 5000); // Clear the notification after 5 seconds
        }
      );
  };

  return (
    <>
      <div className="contactPage">
        <h1>Contact Us</h1>
        <div className="contactContainer">
          <div className="contactImage">
            <img src={contactPage} alt="Contact Page" />
          </div>
          <div className="contactFormContainer">
            <form className="contactForm" onSubmit={handleSubmit}>
              <input
                type="text"
                className="name"
                placeholder="Your name"
                name="from_name"
                value={formDetails.from_name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="email"
                placeholder="Your email"
                name="from_email"
                value={formDetails.from_email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your message"
                className="msg"
                value={formDetails.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" disabled={isSubmitted}>
                {isSubmitted ? "Sent!" : "Submit"}
              </button>
            </form>
          </div>
        </div>
        {notification && (
          <div className="notification-pop">
            {notification}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Contact;

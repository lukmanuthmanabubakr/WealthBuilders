import React from "react";
import contactPage from "../../Assets/undraw_profile_d7qw.svg";
import "./Contact.css";
import Footer from "../../components/Footer/Footer";


const Contact = () => {
  return (
   <>
     <div className="contactPage">
      <h1>Contact Us</h1>
      <div className="contactContainer">
        <div className="contactImage">
          <img src={contactPage} alt="Contact Page" />
        </div>
        <div className="contactFormContainer">
          <form className="contactForm">
            <input type="text" className="name" placeholder="Your name" name="from_name" />
            <input type="email" className="email" placeholder="Your email" name="from_email" />
            <textarea name="message" rows="5" placeholder="Your message" className="msg"></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
   </>
  );
};

export default Contact;

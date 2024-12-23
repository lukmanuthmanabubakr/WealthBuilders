import React from "react";
import { FaWhatsapp, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div
          className="footer-section about"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <h2>About WealthBuilders</h2>
          <p>
            We are committed to providing reliable investment solutions with
            transparency and security. Our mission is to empower individuals
            with tools to grow their financial future confidently.
          </p>
        </div>

        <div
          className="footer-section links"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/plans">Plans</a>
            </li>
            <li>
              <a href="/Hierarchy">Hierarchy</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div
          className="footer-section contact"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2>Contact Us</h2>
          <p>Email: wealtybuilders@gmail.com</p>
          <p>Phone: +1 (234) 567‑8910 </p>
          <p>Address: 123 Investment St, New York, NY 10001</p>
          <div className="social-icons">
            <a
              href="https://wa.me/14482232477"
              aria-label="WhatsApp"
              target="_blank"
            >
              <FaWhatsapp />
            </a>
            <a href="https://www.x.com" aria-label="Twitter" target="_blank">
              <FaSquareXTwitter />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2024 WealthBuilders Investment Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

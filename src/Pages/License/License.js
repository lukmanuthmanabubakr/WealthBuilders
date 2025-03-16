import React from "react";
import LicenseImage from "../../Assets/license.jpg";
import "./License.css"; // Import the CSS file
import Footer from "../../components/Footer/Footer";

const License = () => {
  return (
    <>
          <div className="license-container">
      <h2 className="license-title">Company License & Registration</h2>
      <p className="license-text">
        <strong>Company Name:</strong> WealthBuilders <br />
        <strong>Registration Number:</strong> RS593INT <br />
        <strong>Tax Payment Number:</strong> 46587324334 <br />
        <strong>Date of Incorporation:</strong> August 1, 2007 <br />
        <strong>Legal Framework:</strong> Incorporated under the International Business Companies 
        Amendment and Consolidation Act, Chapter 149 of the Revised Laws of the USA, 2014.
      </p>
      <img src={LicenseImage} alt="Company License" className="license-image" />
    </div>
    <Footer />
    </>
  );
};

export default License;

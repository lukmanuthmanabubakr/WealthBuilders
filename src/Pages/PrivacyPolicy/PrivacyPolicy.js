import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './PrivacyPolicy.css'; // Adjust the path as necessary
import Footer from '../../components/Footer/Footer';

const PrivacyPolicy = () => {
  return (
   <>
     <div className="privacy-policy-container">
      <h1 className="privacy-heading">Privacy Policy</h1>
      <p>At <Link to="/" className="company-link">WealthBuilders</Link>, accessible at <a href="https://hyiprio.com" target="_blank" rel="noopener noreferrer">hyiprio.com</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected and recorded by WealthBuilders and how we use it.</p>
      <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at <a href="mailto:info@hyiprio.com">info@hyiprio.com</a>.</p>

      <p>This privacy policy applies only to our online activities and is valid for visitors to our website regarding the information that they shared and/or collect on hyiprio.com. This policy is not applicable to any information collected offline or via channels other than this website.</p>

      <h2 className="section-heading">Consent</h2>
      <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

      <h2 className="section-heading">Information We Collect</h2>
      <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
      <p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

      <h2 className="section-heading">How We Use Your Information</h2>
      <p>We use the information we collect in various ways, including to:</p>
      <ul>
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Develop new products, services, features, and functionality</li>
        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
        <li>Send you emails</li>
        <li>Find and prevent fraud</li>
      </ul>

      <h2 className="section-heading">Log Files</h2>
      <p>WealthBuilders follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

      <h2 className="section-heading">Cookies and Web Beacons</h2>
      <p>Like any other website, WealthBuilders uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

      <h2 className="section-heading">Advertising Partners Privacy Policies</h2>
      <p>You may consult this list to find the Privacy Policy for each of the advertising partners of WealthBuilders.</p>
      <p>Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on WealthBuilders, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>

      <h2 className="section-heading">Third-Party Privacy Policies</h2>
      <p>WealthBuilders's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.</p>

      <h2 className="section-heading">CCPA Privacy Policy (Do Not Sell My Personal Information)</h2>
      <p>Under the CCPA, California consumers have rights regarding their personal data. If you would like to exercise any of these rights, please contact us.</p>

      <h2 className="section-heading">GDPR Privacy Policy (Data Protection Rights)</h2>
      <p>We ensure you are fully aware of all of your data protection rights under GDPR. If you would like to exercise any of these rights, please contact us.</p>

      <h2 className="section-heading">Children's Information</h2>
      <p>WealthBuilders does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child has provided this kind of information on our website, please contact us, and we will promptly remove it from our records.</p>
    </div>
    <Footer />
   </>
  );
};

export default PrivacyPolicy;

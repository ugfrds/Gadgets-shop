// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './styles/Footer.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Welcome to iGadgets</h4>
          <p>
            We pride ourselves on providing exceptional products and unparalleled customer service. Our store is a haven for those who appreciate quality, style, and innovation.
          </p>
          <div className="social-media">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Products</h4>
          <ul>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <a href="#">New Products</a>
            <a href = "#" > Popular Products</a>
            <a href = "#">Featured products</a>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li><Link to="/order-status">Order Status</Link></li>
            <li><Link to="/product-support">Product Support</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
            <li><Link to="/legal-notice">Legal Notice</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Store information</h4>
          <p><FaMapMarkerAlt /> 08 11th Street, San iGadget,
            507-Union Trade Center,
            Wisecorp  Mars - 896</p>
          <ul>
            <li><FaPhoneAlt /> (+00) 123-489-0090</li>
            <li><FaPhoneAlt /> (+1)-012-306-6889</li>
            <li><FaEnvelope /> demo@example.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Wisecorp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

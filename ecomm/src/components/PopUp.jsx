import React, { useEffect, useState } from 'react';
import './styles/Popup.css'; // Add your CSS for styling

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check local storage to see if the user has visited before
    
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowPopup(true);
      localStorage.setItem('hasVisited', 'true'); // Set flag to prevent showing again
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    
  };

  if (!showPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Welcome to Our E-Commerce Gadgets Shop!</h2>
        <p>Thank you for visiting! This project is dedicated to providing an exceptional online shopping experience for electronic gadgets.</p>
        <h3>About the Project:</h3>
        <p>Our platform aims to simplify your gadget shopping journey, offering a diverse selection of products and seamless user interaction.</p>
        <h3>Collaboration:</h3>
        <p>If you're interested in collaborating or have any inquiries, please feel free to reach out!</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:wisecorp896@gmail.com">wisecorp896@gmail.com</a></li>
          <li><strong>Twitter:</strong> <a href="https://twitter.com/justlikewiseman">@justlikewiseman</a></li>
          <li><strong>Instagram:</strong> <a href="https://www.instagram.com/@justlikewiseman">@justlikewiseman</a></li>
          <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/justlikewiseman">@justlikewiseman</a></li>
        </ul>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
};

export default Popup;

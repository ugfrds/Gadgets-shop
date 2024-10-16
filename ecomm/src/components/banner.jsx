import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTruck, FaDollarSign, FaShieldAlt, FaGift } from 'react-icons/fa';
import './styles/Banner.css'; // Import the CSS file

const Banner = () => {
  return (
    <Container fluid className="banner">
      <Row className="banner-row text-center row" >
        {/* Column 1: Free Delivery */}
        <Col md={3} className="banner-column d-flex">
        <div>
        <FaTruck size={40} className="banner-icon" />
        </div>
          
          <div>
            <h5 className="banner-heading">Fast & Free Delivery</h5>
            <p className="banner-subheading">
              On  eligible orders.
            </p>
          </div>
        </Col>

        {/* Column 2: Easy Returns */}
        <Col md={3} className="banner-column ">
          <FaDollarSign size={40} className="banner-icon" />
          <div>
            <h5 className="banner-heading ">Easy Returns</h5>
            <p className="banner-subheading">
              Return or exchange items effortlessly 
            </p>
          </div>
        </Col>

        {/* Column 3: Trusted Warranty */}
        <Col md={3} className="banner-column">
          <FaShieldAlt size={40} className="banner-icon" />
          <div>
            <h5 className="banner-heading">Trusted Warranty</h5>
            <p className="banner-subheading">
              Upto 2 Years
            </p>
          </div>
        </Col>

        {/* Column 4: Special Gifts */}
        <Col md={3} className="banner-column">
          <FaGift size={40} className="banner-icon" />
          <div>
            <h5 className="banner-heading">Special Surprises</h5>
            <p className="banner-subheading">
              Contact Us Anytime
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;

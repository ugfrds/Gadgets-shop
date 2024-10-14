import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './styles/Banner2.css'; // Import the CSS file

const Banner2 = () => {
  return (
    <Container fluid className="two-column-banner">
      <Row className="two-column-banner-row">
        {/* First Column */}
        <Col md={4} xs={6} className="banner-column first-column">
          <p className="small-text">Limited Time Offer!</p>
          <h1 className="big-text">Amazing Product</h1>
          <Button variant="primary" className="cta-button">Shop Now</Button>
        </Col>

        {/* Second Column */}
        <Col md={8} xs={6} className="banner-column second-column">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Product"
            className="c-product-image"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Banner2;

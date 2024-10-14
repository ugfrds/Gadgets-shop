import React, { useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './styles/Testimonials.css';

const testimonials = [
  { name: "John Doe", feedback: "Amazing service!", rating: 4.5, image: "path_to_image1.jpg" },
  { name: "Jane Smith", feedback: "I'm so happy with my purchase.", rating: 5, image: "path_to_image2.jpg" },
  { name: "Mike Johnson", feedback: "Great value for money.", rating: 4, image: "path_to_image3.jpg" },
  { name: "Sarah Williams", feedback: "Customer support was excellent!", rating: 4.5, image: "path_to_image4.jpg" },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <Container>
        <h2 className="testimonials-title">What Our Customers Say</h2>
        <div className="divider"></div>
        <div className="testimonials-carousel">
          <Button className="carousel-control prev" onClick={handlePrev}>
            <FaChevronLeft />
          </Button>

          <Row className="justify-content-center">
            {/* Show 3 cards on large screens, 1 card on small screens */}
            {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
              <Col md={4} sm={12} className="testimonial-card-container" key={index}>
                <Card className="testimonial-card">
                  <Card.Body>
                    <img src={testimonial.image} alt={testimonial.name} className="testimonial-img" />
                    <Card.Title className="testimonial-name">{testimonial.name}</Card.Title>
                    <Card.Text className="testimonial-feedback">
                      <i>"{testimonial.feedback}"</i>
                    </Card.Text>
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Button className="carousel-control next" onClick={handleNext}>
            <FaChevronRight />
          </Button>
        </div>
      </Container>
    </section>
  );
};

// Helper function to render star ratings
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="star-icon" />);
  }
  if (halfStar) {
    stars.push(<FaStarHalfAlt key="half" className="star-icon" />);
  }
  return stars;
};

export default Testimonials;

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './styles/Testimonials.css'; // Import your custom CSS file
import testImage from '../assets/pic.jpg';

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "This is the best service I've ever used!",
      image: testImage,
      rating: 5,
    },
    {
      name: "Jane Smith",
      feedback: "Amazing quality and fantastic customer support.",
      image: testImage,
      rating: 4,
    },
    {
      name: "Alice Johnson",
      feedback: "I would highly recommend this to anyone.",
      image: testImage,
      rating: 5,
    },
    {
      name: "Bob Brown",
      feedback: "Excellent experience from start to finish.",
      image: testImage,
      rating: 5,
    },
    {
      name: "Charlie Brown",
      feedback: "Great service! Will use again.",
      image: testImage,
      rating: 4,
    },
    {
      name: "Emily Davis",
      feedback: "Fantastic quality! Very satisfied.",
      image: testImage,
      rating: 5,
    },
    {
      name: "Michael Johnson",
      feedback: "Very good service. Highly recommend.",
      image: testImage,
      rating: 4,
    },
    {
      name: "Linda White",
      feedback: "I'm very happy with the service.",
      image: testImage,
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  function getItemsPerPage() {
    return window.innerWidth > 768 ? 3 : 1;
  }

  const nextTestimonial = () => {
    if (currentIndex < testimonials.length - itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevTestimonial = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container className="testimonial-container">
      <Button className="testimonial-control left" onClick={prevTestimonial}>
        <FaArrowLeft />
      </Button>

      <Row className="justify-content-center">
        {testimonials.slice(currentIndex, currentIndex + itemsPerPage).map((testimonial, index) => (
          <Col key={index} md={4} sm={12} className="testimonial-card-container ">
            <Card className="testimonial-card slide-in">
              <Card.Body>
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-img rounded" />
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

      <Button className="testimonial-control right" onClick={nextTestimonial}>
        <FaArrowRight />
      </Button>
    </Container>
  );
};

// Function to render stars based on rating
const renderStars = (rating) => {
  return Array.from({ length: rating }, (_, index) => (
    <span key={index} className="star">★</span>
  ));
};

export default Testimonials;

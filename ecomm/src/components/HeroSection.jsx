import React from 'react';
import { Carousel } from 'react-bootstrap';

import './styles/HeroSection.css';
import MockupImage from '../assets/pic.jpg';

const heroItems = [
  {
    id: 1,
    title: "New Arrival",
    heading: "Latest Mobile Gadget",
    price: "$299",
    image: MockupImage // Adjusted width
  },
  {
    id: 2,
    title: "Hot Sale",
    heading: "Top Smartphone",
    price: "$399",
    image: MockupImage
  },
  {
    id: 3,
    title: "Limited Edition",
    heading: "Exclusive Gadget",
    price: "$499",
    image: MockupImage
  },
];

const HeroSection = () => {
  return (
    <Carousel interval={3000}>
      {heroItems.map(item => (
        <Carousel.Item className="hero-slide" key={item.id}>
          <div className="hero-content">
            <img
              className="hero-image"
              src={item.image}
              alt={`Slide ${item.id}`}
            />
            <div className="hero-text">
              <h5 className="small-title">{item.title}</h5>
              <h3 className="big-heading">{item.heading}</h3>
              <p className="subheading">
                Starting at: <span className="price animate-price">{item.price}</span>
              </p>
              <button className="cta-btn">Shop Now</button>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSection;

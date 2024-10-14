import React from 'react';
import ProductRow from './ProductRow';
import products from './products'; 
import { Container, Row,Col } from 'react-bootstrap';
import './styles/NewArrivals.css';

const NewArrivals = () => {
  // Filter products where newArrival is true in the tags
  const newArrivalProducts = products.filter(product => product.tags && product.tags.newArrival);
  
  

  return (
    <div>
      <Container id="new-arrivals">
        <Row>
          <Col lg ={12} >
          <h2 className="featured-title">New Arrivals</h2>
          <ProductRow products={newArrivalProducts} />
          </Col>
        </Row>
        
      </Container>
    </div>
  );
};

export default NewArrivals;

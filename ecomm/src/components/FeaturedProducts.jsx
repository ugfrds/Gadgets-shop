import React from 'react';
import ProductRow from './ProductRow';
import ProductColumn from './ProductColumn'; // Import the ProductColumn component
import products from './products';
import { Container, Row, Col } from 'react-bootstrap';
import './styles/NewArrivals.css';

const FeaturedProducts = () => {
  // Filter products where featured is true
  const featuredProducts = products.filter(
    (product) => product.tags && product.tags.featured
  );

  return (
    <Container>
      <h2 className='featured-title' id='featured-products'>Featured Products</h2>
      <Row>
        {/* Use ProductRow for larger screens */}
        <Col lg={12} className="d-none d-lg-block">
          <ProductRow products={featuredProducts} />
        </Col>

        {/* Use ProductColumn for smaller screens */}
        <Col xs={12} className="d-lg-none">
          <ProductColumn products={featuredProducts} />
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturedProducts;

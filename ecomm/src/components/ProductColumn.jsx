import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import './styles/ProductColumn.css'; 

const ProductColumn = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState(4); // Initial number of products to display

  const handleShowMore = () => {
    setVisibleProducts((prev) => prev + 4); // Load 4 more products
  };

  return (
    <div className="c-container">
      {products.slice(0, visibleProducts).map((product) => (
        <Card key={product.id} className="c-product-card mb-3">
          <div className="c-card-content">
            <div className="c-image-container">
              <Card.Img src={product.image} alt={product.name} className="c-image" />
              {/* Display the brand new or UK used label */}
              <span className={`c-product-label ${product.tags?.brandNew ? 'c-brand-new' : 'c-uk-used'}`}>
                {product.tags?.brandNew ? 'Brand New' : 'UK Used'}
              </span>
            </div>
            <div className="c-details-container">
              <Card.Body>
                <Card.Title className="c-product-name">{product.name}</Card.Title>
                <Card.Text className="c-product-price">
                  {product.priceRange ? `$${product.priceRange}` : product.price ? `$${product.price}` : ''}
                </Card.Text>
                <Card.Text className={`c-product-availability ${product.availability? 'in-stock': 'out-of-stock'}`}>
                  {product.availability ? 'In Stock' : 'Out of Stock'}
                </Card.Text>
                <Button as={Link} to={`/Gadgets-shop/product/${product.id}`} variant="primary" className="buy-now-button">
                       Buy Now
                  </Button>
              </Card.Body>
            </div>
          </div>
        </Card>
      ))}
      {visibleProducts < products.length && (
        <Button className="c-show-more-button" onClick={handleShowMore}>
          Show More
        </Button>
      )}
    </div>
  );
};

export default ProductColumn;

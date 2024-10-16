import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useVariation } from '../context/VariationContext'; 
import './styles/ProductCard.css';

const ProductCard = ({ product, addToCompare, showCompareButton = false }) => { // Add props for compare functionality
  const { selectedVariation } = useVariation();
  const { variations } = product;
  

  // Find the price of the selected variation
  const variationPrice = selectedVariation
    ? variations.find((variation) => {
        const { image, ...rest } = variation;
        return JSON.stringify(rest) === selectedVariation;
      })?.price
    : null;

  // Determine product condition label
  const conditionLabel = product.tags?.brandNew ? "Brand New" : "UK Used";

  return (
    <Card className="product-card mb-4 border-d-none">
      <div className="image-container">
        <Card.Img variant="top" src={product.image} alt={product.name} className="product-image" />
        {/* Condition Label */}
        <div className={`condition-label ${product.brandNew ? 'new' : 'used'}`}>
          {conditionLabel}
        </div>
      </div>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <div className="star-rating mb-2">
          {/* Example star rating, replace with dynamic rating if needed */}
          <span className="filled-star">★</span>
          <span className="filled-star">★</span>
          <span className="filled-star">★</span>
          <span className="filled-star">★</span>
          <span className="empty-star">☆</span>
        </div>
        
        <Card.Text className="product-price">
          {variationPrice 
            ? `$${variationPrice}` 
            : product.priceRange 
              ? `$${product.priceRange}` 
              : ''}
        </Card.Text>
        
        <Button href={`/Gadgets-shop/product/${product.id}`} variant="primary" className="buy-now-button">
          Buy Now
        </Button>

        {/* Conditionally render the Compare button */}
        {showCompareButton && (
          <Button 
            variant="outline-secondary" 
            onClick={() => addToCompare(product)}
            className="compare-button"
          >
            Compare
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

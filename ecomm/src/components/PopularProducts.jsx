import React, { useState } from 'react';
import products from './products';
import './styles/PopularProducts.css';
import { Carousel , Container } from 'react-bootstrap';
import ProductCard from './ProductCard'; 


const PopularProducts = () => {
  const [activeTab, setActiveTab] = useState('Smartphone'); // Default tab is Smartphone
  const [activeBrand, setActiveBrand] = useState(''); // No brand filter initially

  const categories = [...new Set(products.map(product => product.category))];

  // Filter products based on active tab and active brand
  const filteredProducts = products.filter(product => 
    product.category === activeTab && (!activeBrand || product.brand === activeBrand)
  );
 
  // Group products by items per slide
  const itemsPerPage = window.innerWidth < 768 ? 2 : 4; // 2 for small screens, 4 for large
  const groupedProducts = [];
  
  for (let i = 0; i < filteredProducts.length; i += itemsPerPage) {
    groupedProducts.push(filteredProducts.slice(i, i + itemsPerPage));
  }

  // Get unique brands for the selected category
  const brands = [...new Set(products.filter(product => product.category === activeTab).map(product => product.brand))];

  return (
    <Container>
      <h2 className="popular-products-title">Popular Products</h2>

      {/* Category Tabs */}
      <div className="tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`tab ${activeTab === category ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(category);
              setActiveBrand(''); // Reset the brand filter when changing category
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Brand Subcategories */}
      {brands.length > 0 && (
        <div className="brands">
          {brands.map(brand => (
            <button
              key={brand}
              className={`brand-filter ${activeBrand === brand ? 'active' : ''}`}
              onClick={() => setActiveBrand(brand === activeBrand ? '' : brand)} // Toggle brand filter
            >
              {brand}
            </button>
          ))}
        </div>
      )}

      {/* Carousel for Products */}
      {groupedProducts.length > 0 ? (
        <Carousel controls dark>
          {groupedProducts.map((group, index) => (
            <Carousel.Item key={index}>
              <div className="product-row">
                {group.map(product => (
                  <ProductCard key={product.id} product={product} /> 
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>No products available for this brand.</p>
      )}
    </Container>
  );
};

export default PopularProducts;

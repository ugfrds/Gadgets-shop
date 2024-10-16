import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Import the ProductCard component
import './styles/ProductRow.css';

const ProductRow = ({ products, addToCompare, showCompareButton }) => {
  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 2 : 4); // Initial value based on screen size

  // Update itemsPerPage on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 2 : 4);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  // Animation state
  const [animate, setAnimate] = useState(false);

  // Handle next/previous buttons for pagination
  const handleNext = () => {
    if (currentPage < totalPages) {
      setAnimate(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setAnimate(true);
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Reset animation state after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 300); // Duration of the animation

    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <div className="product-row-container">
      <div className={`product-row ${animate ? 'slide-in' : ''}`}>
        {selectedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            showCompareButton={showCompareButton} // Pass the prop to ProductCard
            addToCompare={addToCompare} // Pass the addToCompare function if the button is shown
          />
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
 
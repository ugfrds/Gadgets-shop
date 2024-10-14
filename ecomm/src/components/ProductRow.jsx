import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Import the ProductCard component
import './styles/ProductRow.css';

const ProductRow = ({ products }) => {
  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = window.innerWidth < 768 ? 2 : 4; // 2 item on small screens, 4 on large screens

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
      setCurrentPage(currentPage + 1);
      
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setAnimate(true);
      setCurrentPage(currentPage - 1);
     
    }
  };

  // Reset animation state after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 300); // Duration of the animation
    console.log('reloaded');

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="product-row-container">
      <div className={`product-row ${animate ? 'slide-in' : ''}`}>
        {selectedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
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

/* ProductCard.css */

/* Overall card styling */
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  transition: transform 0.2s ease;
  width: 100%;
  max-width: 350px;
}

.product-card:hover {
  transform: scale(1.05);
}

/* Image container */
.product-image-container {
  width: 100%;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

/* Product info */
.product-info {
  text-align: left;
  width: 100%;
  margin-top: 10px;
}

.product-name {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
}

.star-rating {
  font-size: 1em;
  color: #ffd700;
}

.product-price {
  font-size: 1.2em;
  color: #ff5733;
  margin-top: 10px;
}

/* Buy now button */
.buy-now-container {
  width: 100%;
  margin-top: 10px;
}

.buy-now-button {
  width: 100%;
  padding: 8px;
  background-color: #ff9900;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  text-align: center;
}

.buy-now-button a {
  color: white;
  text-decoration: none;
}

.buy-now-button:hover {
  background-color: #e68a00;
}

/* Media Query for mobile */
@media (max-width: 768px) {
  .product-card {
    flex-direction: row; /* Horizontal layout for mobile */
    justify-content: flex-start;
    align-items: center;
    max-width: 100%; /* Full-width on mobile */
  }

  .product-image-container {
    flex: 1; /* Allow image to take appropriate space */
    max-width: 150px;
    margin-right: 10px;
  }

  .product-info {
    flex: 2; /* Remaining space for product info */
    margin-top: 0; /* Align items next to each other */
    margin-left: 10px;
  }

  .buy-now-container {
    flex: 1;
    margin-left: auto;
    margin-top: 0;
    max-width: 120px;
  }

  .buy-now-button {
    font-size: 0.9em;
  }
}

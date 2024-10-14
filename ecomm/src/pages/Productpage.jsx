import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../components/products'; 
import './styles/ProductPage.css'; 
import ProductRow from '../components/ProductRow'; 
import FeaturedProducts from '../components/FeaturedProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const [color , setColor] = useState('');
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedVariation, setSelectedVariation] = useState(product.variations[0]);
  const [quantity, setQuantity] = useState(1);

  const handleVariationChange = (key, value) => {
    const newVariation = product.variations.find((variation) => variation[key] === value);
    if (newVariation) {
      setSelectedVariation(newVariation);
      setColor(newVariation.color)
    }
  };

  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter similar products by brand but exclude the current product

  
  const relatedProducts = products.filter((p) =>  product.category ===product.category && p.id !== product.id); 
  console.log(relatedProducts);

  // Calculate total price based on selected variation and quantity
  const totalPrice = selectedVariation.price * quantity;

  return (
    <div className="container product-detail-page">
      <div className="row">
       <div className='product-info'> 
        {/* Product Gallery */}
        
          
        <div className="col-md-1 thumbnail-gallery" >
              {product.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="thumbnail"
                  onClick={() => setSelectedVariation({ ...selectedVariation, image: img })}
                />
              ))}
          </div>
          
       

        {/* Main Product Image */}
        <div className="col-md-3 c-main-image">
          <img src={selectedVariation.image || product.image} alt={product.name} className="main-image" />
        </div>

        {/* Sidebar with Product Details */}
        <div className="col-md-6 product-details">
          <h1>{product.name}</h1>
          <div className="star-rating mb-2">
          {/* Example star rating, replace with dynamic rating if needed */}
          <span>({product.reviews} reviews)</span>
          <span className="filled-star">★</span>
          <span className="filled-star">★</span>
          <span className="filled-star">★</span>
          <span className="filled-star">★</span>
          <span className="empty-star">☆</span>
        </div>
          <h2 className="price">${totalPrice.toFixed(2)}</h2>
          <p className={`c-product-availability ${product.availability? 'in-stock': 'out-of-stock'}` }>
            Availability: {product.availability} </p> 

          {/* Variations */}
          <div className="variation-select">
            {product.variations.length > 0 && (
              <>
                {product.variations.some(v => v.ram) && (
                  <div>
                    <div htmlFor="ram">RAM:</div>
                    <select
                      id="ram"
                      value={selectedVariation.ram}
                      onChange={(e) => handleVariationChange('ram', e.target.value)}
                    >
                      {product.variations.map((v, idx) => (
                        v.ram && <option key={idx} value={v.ram}>{v.ram}</option>
                      ))}
                    </select>
                  </div>
                )}
                {product.variations.some(v => v.storage) && (
                  <div> 
                    <div htmlFor="storage">Storage:</div>
                    <select
                      id="storage"
                      value={selectedVariation.storage}
                      onChange={(e) => handleVariationChange('storage', e.target.value)}
                    >
                      {product.variations.map((v, idx) => (
                        v.storage && <option key={idx} value={v.storage}>{v.storage}</option>
                      ))}
                    </select> 
                  </div>
                )}
                <div>
                <div >Color: <span className='color-name'>{color}</span> </div> 
                {product.variations.some(v => v.color) && (
                  <div className="color-options">
                    
                    {product.variations.map((v, idx) => (
                      v.color && (
                        <div
                          key={idx}
                          className={`color-square ${selectedVariation.color === v.color ? 'selected' : ''}`}
                          style={{ backgroundColor: v.color }}
                          onClick={  () => {
                            handleVariationChange('color', v.color)
                            
                         }}
                          
                        />
                        
                      )
                    ))}
                  </div>
                )}
                </div>
              </>
            )}
          </div>
          
        </div>
      

       <div className="col-md-2 sidebar">
          <h2 className="price">${totalPrice.toFixed(2)}</h2>
          {/* Quantity Control */}
          <div className="quantity-control">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="quantity-input"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Math.max(1, e.target.value))}
            />
          </div>
           {/* Add to Cart and Buy Now Buttons */}
            <button className="c-btn btn-primary">Add to Cart</button>
            <button className="c-btn btn-success">Buy Now</button>
          </div>
       </div>
      </div>

      
      
      {/* Product Description */}
      <div className="product-description">
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>

      {/* Specifications Table */}
      <div className="specifications">
        <h2>Specifications</h2>
        <table className="table table-bordered spec-table">
          <tbody>
            <tr>
              <td><strong>Brand</strong></td>
              <td>{product.brand}</td>
            </tr>
            <tr>
              <td><strong>Model</strong></td>
              <td>{product.model}</td>
            </tr>
            <tr>
              <td><strong>Dimensions</strong></td>
              <td>{product.dimensions}</td>
            </tr>
            <tr>
              <td><strong>Weight</strong></td>
              <td>{product.weight}</td>
            </tr>
            <tr>
              <td><strong>Warranty</strong></td>
              <td>{product.warranty}</td>
            </tr>
            <tr>
              <td><strong>Return Policy</strong></td>
              <td>{product.returnPolicy}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Reviews Section */}
      <div className="reviews">
        <h2>Customer Reviews</h2>
        {product.reviewsArray?.map((review, idx) => (
          <div key={idx} className="review-item">
            <p><strong>{review.user}</strong> - {review.rating} ★</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Frequently Asked Questions (FAQ) */}
      <div className="faq">
        <h2>FAQ</h2>
        {product.faq?.map((item, idx) => (
          <div key={idx} className="faq-item">
            <p><strong>Q: {item.question}</strong></p>
            <p>A: {item.answer}</p>
          </div>
        ))}
      </div>

      {/* Similar Products Section */}
      <div className="similar-products">
        <h2>Related Products</h2>
        <ProductRow products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetail;

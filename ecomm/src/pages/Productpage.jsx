import { useState, useEffect } from 'react';
import { Table, Tab, Tabs, Accordion, Button, Modal,Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import products from '../components/products'; 
import './styles/ProductPage.css'; 
import ProductRow from '../components/ProductRow'; 
import CompareButton from'../components/CompareButton';


const ProductDetail = () => {
  const { id } = useParams();
  const [color , setColor] = useState('');
  const product = products.find((p) => p.id === Number(id));
  const [selectedVariation, setSelectedVariation] = useState(product.variations[0]);
  const [quantity, setQuantity] = useState(1);


  const [compareList, setCompareList] = useState([]);
  const [showModal, setShowModal] = useState(false);
 

  // Function to add product to the compare list
  const addToCompare = (product) => {
    // Check if the product is already in the compare list
    const productExists = compareList.some(
      (item) => item.id === product.id
    );

    if (!productExists) {
      // Add product to the compare list if not already there
      setCompareList([...compareList, product]);
      
    } else {
      alert("Product already in the compare list");
    }
  };

  const removeFromCompare = (product) => {
    // Filter out the product from the compare list using its id
    const updatedCompareList = compareList.filter(
      (item) => item.id !== product.id
    );
  
    // Update the state with the filtered list
    setCompareList(updatedCompareList);
  
  };
  

  // Show/hide the compare modal
  const handleShowModal = () =>
     compareList.length === 0 ? alert('No products added for comparison')
     : compareList.length === 1 ? alert('Please add more products to the comparison list!')
     : setShowModal(true); 
  

  
  
  const handleCloseModal = () => {
    //setCompareList([]);
    setShowModal(false);
  }


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

  
  const relatedProducts = products.filter((p) =>  p.category ===product.category && p.id !== product.id); 
  

  // Calculate total price based on selected variation and quantity
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const totalPrice = selectedVariation.price * quantity;

  return (
    <>
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
          <div className="quantity-control">
            <label>Quantity:</label>
            <div className="quantity-buttons">
              <Button variant="outline-secondary" onClick={decrementQuantity}>-</Button>
              <input
                type="number"
                value={quantity}
                className="quantity-input"
                min="1"
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              />
              <Button variant="outline-secondary" onClick={incrementQuantity}>+</Button>
            </div>
          </div>

          <Button className="c-btn btn-primary">Add to Cart</Button>
          <Button className="c-btn btn-success">Buy Now</Button>
          <CompareButton  product ={product} addToCompare={addToCompare}  removeFromCompare={ removeFromCompare}/>
        </div>
      
      </div>
      </div>

      
      <Tabs defaultActiveKey="description" id="product-tabs">
        {/* Description Tab */}
        <Tab eventKey="description" title="Description">
          <div className="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>

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
                  {/* Other rows */}
                </tbody>
              </table>
            </div>
          </div>
        </Tab>

               {/* Reviews Tab */}
               <Tab eventKey="reviews" title={`Reviews (${product.reviewsArray?.length || 0})`}>
          <div className="reviews">
            <h2>Customer Reviews</h2>
            {product.reviewsArray?.map((review, idx) => (
              <div key={idx} className="review-item">
                <p><strong>{review.user}</strong> - {review.rating} ★</p>
                <p>{review.comment}</p>
              </div>
            ))}

            {/* Add Review Form */}
            <div className="add-review">
              <h3>Add a Review</h3>
              <Form>
                <Form.Group controlId="reviewUser">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group controlId="reviewRating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control as="select">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="reviewComment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
              </Form>
            </div>

            {/* Compare Button */}
            <CompareButton  product ={product} addToCompare={addToCompare}  removeFromCompare={ removeFromCompare}/>
          </div>
        </Tab>

        {/* FAQ Tab */}
        <Tab eventKey="faq" title="FAQ">
          <Accordion>
            {product.faq?.map((item, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>Q: {item.question}</Accordion.Header>
                <Accordion.Body>
                  A: {item.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          {/* Compare Button */}
          <CompareButton  product ={product} addToCompare={addToCompare}  removeFromCompare={ removeFromCompare}/>
        </Tab>

        {/* Shipping & Return Tab */}
        <Tab eventKey="shipping-return" title="Shipping & Return">
          <p>{product.returnPolicy}</p>
        </Tab>
      </Tabs>

    {/* Related Products */}
<div className="related-products">
  <h3>Related Products</h3>
  <ProductRow 
    products={relatedProducts} 
    addToCompare={addToCompare}
    removeFromCompare={ removeFromCompare} 
    showCompareButton={true} // Pass true to show the Compare button
  />
</div>


 {/* Floating Action Button */}
<Button
  variant="primary"
  className="fab-compare"
  onClick={handleShowModal}
>
  Compare Products
  {compareList.length > 0 && (
    <span className="compare-count">
      ({compareList.length})
    </span>
  )}
</Button>


      {/* Compare Modal */}
    {/* Compare Modal */}
<Modal show={showModal} onHide={handleCloseModal} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Compare Products</Modal.Title>
  </Modal.Header>
  <Modal.Body>
 
    <Table bordered hover>
      <thead>
        <tr>
          <th>Feature</th>
          {compareList.map((item) => (
            <th key={item.id}>{item.brand} - {item.model}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Brand</td>
          {compareList.map((item) => (
            <td key={item.id}>{item.brand}</td>
          ))}
        </tr>
        <tr>
          <td>Model</td>
          {compareList.map((item) => (
            <td key={item.id}>{item.model}</td>
          ))}
        </tr>
        <tr>
          <td>Dimensions</td>
          {compareList.map((item) => (
            <td key={item.id}>{item.dimensions || 'N/A'}</td>
          ))}
        </tr>
        <tr>
          <td>Weight</td>
          {compareList.map((item) => (
            <td key={item.id}>{item.weight || 'N/A'}</td>
          ))}
        </tr>
        <tr>
          <td>Warranty</td>
          {compareList.map((item) => (
            <td key={item.id}>{item.warranty || 'N/A'}</td>
          ))}
        </tr>
        <tr>
          <td>Return Policy</td>
          {compareList.map((item) => (
            <td key={item.id}>{item.returnPolicy || 'N/A'}</td>
          ))}
        </tr>
        <tr>
          <td>Size</td>
          {compareList.map((item) => (
            <td key={item.id}>
              {item.variations.some((variation) => variation.storage) 
                ? item.variations.map((variation) => variation.storage).join(', ') 
                : 'N/A'}
            </td>
          ))}
        </tr>
        <tr>
          <td>RAM</td>
          {compareList.map((item) => (
            <td key={item.id}>
              {item.variations.some((variation) => variation.ram) 
                ? item.variations.map((variation) => variation.ram).join(', ') 
                : 'N/A'}
            </td>
          ))}
        </tr>
        <tr>
          <td>Color</td>
          {compareList.map((item) => (
            <td key={item.id}>
              {item.variations.some((variation) => variation.color) 
                ? item.variations.map((variation) => variation.color).join(', ') 
                : 'N/A'}
            </td>
          ))}
        </tr>
        <tr>
          <td>Processor</td>
          {compareList.map((item) => (
            <td key={item.id}>
              {item.variations.some((variation) => variation.processor) 
                ? item.variations.map((variation) => variation.processor).join(', ') 
                : 'N/A'}
            </td>
          ))}
        </tr>
      </tbody>
    </Table>
  
   </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
  </Modal.Footer>
 </Modal>

</div>
</>
  );
};

export default ProductDetail;

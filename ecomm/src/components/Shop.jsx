import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Card, Button, Offcanvas } from 'react-bootstrap';
import ProductRow from './ProductRow';
import ProductColumn from './ProductColumn';
import products from './products';
import { useParams } from 'react-router-dom';
import { useVariation } from '../context/VariationContext'; 
import './styles/Shop.css';

const Shop = () => {
  const { category } = useParams();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [newArrivals, setNewArrivals] = useState(false);
  const [popular, setPopular] = useState(false);
  const [brandNew, setBrandNew] = useState(false); // Filter for brand new
  const [used, setUsed] = useState(false); // Filter for used
  const [variations, setVariations] = useState([]);
  const { selectedVariation, setSelectedVariation } = useVariation(); 
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);


 const [color , setColor] = useState('Blue');


 const changeColor = () =>{
  setColor ('Red');
  console.log(color);
 }


  const filteredByCategory = products.filter((product) => {
    return product.category && product.category.toLowerCase() === category.toLowerCase();
  });

  const brands = Array.from(new Set(filteredByCategory.map((product) => product.brand)));

  const generateVariations = () => {
    const brandFilteredProducts = selectedBrand
      ? filteredByCategory.filter((product) => product.brand === selectedBrand)
      : filteredByCategory;

    const uniqueVariations = brandFilteredProducts.flatMap((product) => product.variations || []);

    const variationAttributes = Array.from(
      new Set(
        uniqueVariations.map((variation) => {
          const { image, ...rest } = variation;
          return JSON.stringify(rest);
        })
      )
    );

    const formattedVariations = variationAttributes.map((variation) => JSON.parse(variation));
    setVariations(formattedVariations);
  };

  useEffect(() => {
    generateVariations();
  }, [selectedBrand]);

  const formatVariation = (variation) => {
    return Object.entries(variation)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
      .join(', ');
  };

  const filteredProducts = products.filter((product) => {
    const productCategory = product.category ? product.category.toLowerCase() : '';
    const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;

    const matchesVariation = selectedVariation
      ? product.variations?.some((variation) => {
          const { image, ...rest } = variation;
          return JSON.stringify(rest) === selectedVariation;
        })
      : true;

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesNewArrivals = newArrivals ? product.tags?.newArrival : true;
    const matchesPopular = popular ? product.tags?.popular : true;
    const matchesBrandNew = brandNew ? product.tags?.brandNew : true; // Check for brand new tag
    const matchesUsed = used ? !product.tags?.brandNew : true; // Check for used/refurbished products

    return (
      productCategory === category.toLowerCase() &&
      matchesBrand &&
      matchesVariation &&
      matchesPrice &&
      matchesNewArrivals &&
      matchesPopular &&
      matchesBrandNew && 
      matchesUsed 
    );
  });

     const clearFilters = () => {
        setSelectedBrand('');
       setPriceRange([0, 1000]);
       setNewArrivals(false);
       setPopular(false);
       setBrandNew(false);
       setUsed(false);
       setSelectedVariation('');
     };

  const isAnyFilterApplied = () => {
    return (
      selectedBrand || 
      priceRange[0] !== 0 || 
      priceRange[1] !== 5000 || 
      newArrivals || 
      popular || 
      brandNew || 
      used || 
      selectedVariation
    );
  };
  

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="shop-container">
      <Row>
        {/* Sidebar button for mobile */}
        <Button
          className="d-md-none mb-3"
          onClick={toggleSidebar}
          variant="primary"
        >
          Filter Products
        </Button>

        {/* Offcanvas sidebar for mobile */}
        <Offcanvas show={isSidebarVisible} onHide={toggleSidebar} className="d-md-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* Filter content inside off-canvas for mobile */}
            <Form>
              <Form.Group controlId="brandFilter">
                <Form.Label>Select Brand</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="variationFilter" className="mt-3">
                <Form.Label>Select Variation</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedVariation}
                  onChange={(e) => setSelectedVariation(e.target.value)}
                >
                  <option value="">Select Variation</option>
                  {variations.map((variation, index) => (
                    <option key={index} value={JSON.stringify(variation)}>
                      {formatVariation(variation)}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="priceRangeFilter" className="mt-3">
                <Form.Label>Price Range</Form.Label>
                <Form.Control
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                />
                <Form.Text>{`Up to $${priceRange[1]}`}</Form.Text>
              </Form.Group>

              <Form.Group controlId="newArrivalsFilter" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="New Arrivals"
                  checked={newArrivals}
                  onChange={(e) => setNewArrivals(e.target.checked)}
                />
              </Form.Group>

              <Form.Group controlId="popularFilter" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Popular Products"
                  checked={popular}
                  onChange={(e) => setPopular(e.target.checked)}
                />
              </Form.Group>

              <Form.Group controlId="brandNewFilter" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Brand New Products"
                  checked={brandNew}
                  onChange={(e) => setBrandNew(e.target.checked)}
                />
              </Form.Group>

              <Form.Group controlId="usedFilter" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Refurbished/Used Products"
                  checked={used}
                  onChange={(e) => setUsed(e.target.checked)}
                />
              </Form.Group>
              <Button 
                  variant="warning" 
                  onClick={clearFilters} 
                  className="mt-3 me-3"
                  disabled={!isAnyFilterApplied()} // Disable button if no filters are applied
              >
                Clear Filters
              </Button>
              <Button 
                  variant="primary" 
                  onClick={toggleSidebar} // This will close the off-canvas
                 className="mt-3 d-md-none" // Hide on medium and larger screens
                 >
               Apply Filters
             </Button>
            </Form>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Sidebar for larger screens */}
        <Col md={3} className="d-none d-md-block c-sticky-sidebar">
          <Card>
            <h4>Filters</h4>
            <Form>
              {/* Same filter form as in the off-canvas */}
              {/* Filter by Brand */}
              <Form.Group controlId="brandFilter">
                <Form.Label>Select Brand</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* Filter by Variation */}
              <Form.Group controlId="variationFilter" className="mt-3">
                <Form.Label>Select Variation</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedVariation}
                  onChange={(e) => setSelectedVariation(e.target.value)}
                >
                  <option value="">Select Variation</option>
                  {variations.map((variation, index) => (
                    <option key={index} value={JSON.stringify(variation)}>
                      {formatVariation(variation)}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* Filter by Price */}
              <Form.Group controlId="priceRangeFilter" className="mt-3">
                <Form.Label>Price Range</Form.Label>
                <Form.Control
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                />
                <Form.Text>{`Up to $${priceRange[1]}`}</Form.Text>
              </Form.Group>

              {/* Filter by New Arrivals */}
              <Form.Group controlId="newArrivalsFilter" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="New Arrivals"
                  checked={newArrivals}
                  onChange={(e) => setNewArrivals(e.target.checked)}
                />
              </Form.Group>

              {/* Filter by Popular Products */}
              <Form.Group controlId="popularFilter" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Popular Products"
                  checked={popular}
                  onChange={(e) => setPopular(e.target.checked)}
                />
              </Form.Group>

              {/* Filter by Brand New or Used */}
              <Form.Group controlId="brandNewFilter" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Brand New Products"
                  checked={brandNew}
                  onChange={(e) => setBrandNew(e.target.checked)}
                />
              </Form.Group>

              {/* Filter by Refurbished/Used */}
              <Form.Group controlId="usedFilter" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Refurbished/Used Products"
                  checked={used}
                  onChange={(e) => setUsed(e.target.checked)}
                />
              </Form.Group>
              <Button 
                variant="outline-secondary" 
                onClick={clearFilters} 
               className="mt-3"
               >
               Reset Filters
             </Button>
            </Form>
          </Card>
        </Col>

        {/* Product List */}
        <Col md={9}>
          <h2 className="mb-4">{`Shop ${category}`}</h2>
          {filteredProducts.length > 0 ? (
            <ProductRow products={filteredProducts} />
          ) : (
            <p>No products available for this category with the selected filters.</p>
          )}
        </Col>
      </Row>

      <div className="other-products">
        <h2> Other Products</h2>
        <ProductColumn products={products} />
      </div>
    

    </div>
  );
};

export default Shop;

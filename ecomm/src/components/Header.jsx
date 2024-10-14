import React, { useState } from 'react';
import { Navbar, Form, FormControl, Button, NavDropdown, ListGroup } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import './styles/Header.css'; // Assuming styles are in 'styles' folder
import { useNavigate } from 'react-router-dom';
import products from './products'; // Import products from the external file

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter products based on search term
    if (value.length > 1) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredProducts);
    } else {
      setSuggestions([]);
    }
  };

  // Handle selecting a product from suggestions
  const handleSelectProduct = (product) => {
    
    navigate(`/product/${product.id}`); 
    setSearchTerm('');
    setSuggestions([]);
  };

  // Handle form submission (pressing enter)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      navigate(`/product/${suggestions[0].id}`); // Navigate to first suggestion if exists
    } else {
      alert('No matching product found'); // You can handle this however you like
    }
    setSearchTerm('');
    setSuggestions([]);
  };
    // Handle category selection
    const handleCategorySelect = (categoryPath) => {
      navigate(`/shop/${categoryPath}`); // Navigate to shop by category page
    };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar sticky-top full-width p-4">
      <Navbar.Brand href="/" className="header-logo ms-3">
        iGadgets
      </Navbar.Brand>

      {/* Search Bar with Dropdown */}
      <Form className="d-flex header-search-bar" onSubmit={handleSubmit}>
       <NavDropdown title="All" id="categories-dropdown" className="search-category-dropdown">
          {/* Replace href with onClick for navigation */}
          <NavDropdown.Item onClick={() => handleCategorySelect('Smartphone')}>
            Mobile Phones
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleCategorySelect('tablets')}>
            Tablets
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleCategorySelect('Accessories')}>
            Accessories
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleCategorySelect('Laptop')}>
            Laptops
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleCategorySelect('TV')}>
            TVs
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleCategorySelect('Headphones')}>
            Headphones
          </NavDropdown.Item>
        </NavDropdown>


        <FormControl
          type="search"
          placeholder="Search for gadgets, mobile phones..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Search"
        />

        <Button variant="search" className="search-icon me-3" type="submit">
          <FaSearch />
        </Button>
      </Form>

      {/* Suggestions Dropdown */}
      {searchTerm.length > 1 && (
        <ListGroup className="search-suggestions-dropdown">
          {suggestions.length > 0 ? (
            suggestions.map((product) => (
              <ListGroup.Item
                key={product.id}
                action
                onClick={() => handleSelectProduct(product)}
              >
                {product.name}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No results found</ListGroup.Item> 
          )}
        </ListGroup>
      )}
    </Navbar>
  );
};

export default Header;

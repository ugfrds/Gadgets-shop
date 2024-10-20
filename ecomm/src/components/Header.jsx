import React, { useState } from 'react';
import { Navbar, Form, FormControl, Button, NavDropdown, ListGroup } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import './styles/Header.css'; // Assuming styles are in 'styles' folder
import { useNavigate } from 'react-router-dom';
import products from './products'; // Import products from the external file

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  // Extract unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Extract brands per category
  const getBrandsByCategory = (category) => {
    return Array.from(
      new Set(
        products
          .filter(product => product.category === category)
          .map(product => product.brand)
      )
    );
  };

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
      navigate(`/product/${suggestions[0].id}`);
    } else {
      alert('No matching product found');
    }
    setSearchTerm('');
    setSuggestions([]);
  };

  // Handle category selection
  const handleCategorySelect = (categoryPath) => {
    navigate(`/shop/${categoryPath}`);
  };

  // Handle hover to show brands
  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar sticky-top full-width p-4">
      <Navbar.Brand href="/Gadgets-shop" className="header-logo ms-3">
        iGadgets
      </Navbar.Brand>

      {/* Search Bar with Dropdown */}
      <Form className="d-flex header-search-bar" onSubmit={handleSubmit}>
        <NavDropdown title="Categories" id="categories-dropdown" className="search-category-dropdown">
          {categories.map((category) => (
            <NavDropdown.Item
              key={category}
              onMouseEnter={() => handleCategoryHover(category)}
              onMouseLeave={handleCategoryLeave}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </NavDropdown.Item>
          ))}
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

      {/* Brands Dropdown on Hover */}
      {hoveredCategory && (
        <NavDropdown
          title={`${hoveredCategory} Brands`}
          show={!!hoveredCategory}
          onMouseEnter={() => handleCategoryHover(hoveredCategory)}
          onMouseLeave={handleCategoryLeave}
          className="brands-dropdown"
        >
          {getBrandsByCategory(hoveredCategory).map((brand) => (
            <NavDropdown.Item
              key={brand}
              onClick={() => navigate(`/shop/${hoveredCategory}/${brand}`)}
            >
              {brand}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      )}

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

import React, { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Categories = [
  "Clothing",                // 0
  "Grocery",                 // 1
  "Electronics",             // 2
  "Stationery",              // 3
  "Books",                   // 4
  "Home Appliances",         // 5
  "Furniture",               // 6
  "Sports Equipment",        // 7
  "Accessories",             // 8
  "Footwear",                // 9
  "Bags",                    // 10
  "Food & Beverages",        // 11
  "Toys & Games",            // 12
  "Beauty & Personal Care",  // 13
  "Health & Wellness",       // 14
  "Musical Instruments",     // 15
  "Art & Craft Supplies",    // 16
  "Event Tickets",           // 17
  "Project Components",      // 18
  "Tech Accessories",        // 19
  "Pre-owned Items",         // 20
  "IIIT Merchandise",        // 21
  "Mobile Accessories",      // 22
  "Garden Supplies",         // 23
  "Pet Supplies",            // 24
  "Automobile Accessories",  // 25
  "Gaming Accessories",      // 26
  "Kitchenware",             // 27
  "Baby Products",           // 28
  "Office Supplies",         // 29
  "Travel Essentials",       // 30
  "Collectibles",            // 31
  "Handmade Items",          // 32
  "Rental Services",         // 33
  "Fitness Equipment",       // 34
  "Photography Gear",        // 35
  "Decorative Items"         // 36
];

function Sell() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: Categories[0] // Default to the first category
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      errors.price = 'Valid price is required';
    }
    if (!formData.description) {
      errors.description = 'Description is required';
    }
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('/item/add', formData, { withCredentials: true });
      setSuccessMessage('Item created successfully');
      setFormData({
        name: '',
        price: '',
        description: '',
        category: Categories[0]
      });
      setFormErrors({});
    } catch (error) {
      console.error('Error creating item:', error);
      setFormErrors({ submit: 'Failed to create item' });
    }
  };

  return (
    <Card style={{ margin: '1rem' }}>
      <Card.Body>
        <Card.Title>Sell an Item</Card.Title>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isInvalid={!!formErrors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              isInvalid={!!formErrors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              isInvalid={!!formErrors.description}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              isInvalid={!!formErrors.category}
            >
              {Categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formErrors.category}
            </Form.Control.Feedback>
          </Form.Group>
          {formErrors.submit && (
            <p style={{ color: 'red' }}>{formErrors.submit}</p>
          )}
          {successMessage && (
            <p style={{ color: 'green' }}>{successMessage}</p>
          )}
          <Button variant="success" type="submit" style={{ marginTop: '1rem' }}>
            Add Item
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Sell;
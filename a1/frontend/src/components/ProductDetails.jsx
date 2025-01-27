import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductDetails() {
  const location = useLocation();
  const { product } = location.state;
  const formattedDate = new Date(product.createdAt).toLocaleDateString();
  const handleAddToCart = async () => {
    try {
      console.log('Product id:', product._id);
      const response = await axios.post('/cart/add', { itemId: product._id }, { withCredentials: true });
      alert(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        console.error('Error adding item to cart:', error);
        alert('Failed to add item to cart');
      }
    }
  };
  return (
    <Card style={{ margin: '1rem' }}>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Price: ${product.price}</Card.Text>
        <Card.Text>Descripton : {product.description}</Card.Text>
        <Card.Text>Vendor: {product.sellerId}</Card.Text>
        <Card.Text>Category: {product.category}</Card.Text>
        <Card.Text>Added on: {formattedDate}</Card.Text>
        <Button variant="success" onClick={handleAddToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductDetails;
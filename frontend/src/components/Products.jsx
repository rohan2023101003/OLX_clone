import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Products({ searchQuery ,selectedCategories}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/item/all'); // Adjust the endpoint as needed
        setProducts(response.data.items);
        setFilteredProducts(response.data.items);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedQuery) &&
      (selectedCategories.length === 0 || selectedCategories.includes(product.category))
    );
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategories, products]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Row className="products-container">
      {filteredProducts.map(product => (
        <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
          <Card style={{ margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Price: ${product.price}</Card.Text>
              <Link
                to={`/products/${product._id}`}
                state={{ product }}
                className="btn btn-outline-success w-100"
                style={{ padding: "0.375rem 0.75rem" }}
              >
                View Details
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Products;
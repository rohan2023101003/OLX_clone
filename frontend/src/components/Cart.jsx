import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderResponse, setOrderResponse] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('cart/myCart', { withCredentials: true }); // Adjust the endpoint as needed
        setCartItems(response.data.cart.items);
        setLoading(false);
      } catch (error) {
        setError('Error fetching cart items');
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await axios.delete('cart/remove', {
        data: { itemId },
        withCredentials: true
      });
      alert(response.data.message);
      setCartItems(cartItems.filter(item => item.itemId._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart');
    }
  };

  const handleOrder = async () => {
    try {
      const myCart = await axios.get('cart/myCart', { withCredentials: true }); // Adjust the endpoint as needed
      const response = await axios.post('/order/addOrder', { cart: myCart.data.cart }, { withCredentials: true });
  
      const orders = response.data.orders.map(order => ({
        orderId: order._id,
        otp: response.data.otps.find(otp => otp.productId === order.productId).otp
      }));
  
      // Construct the alert message
      let alertMessage = 'Orders placed successfully:\n\n';
      orders.forEach(order => {
        alertMessage += `Order ID: ${order.orderId}\nOTP: ${order.otp}\n\n`;
      });
  
      // Show the alert with order details
      alert(alertMessage);
  
      // Clear the cart after successful order
      await axios.delete('cart/clear', { withCredentials: true }); // Clear cart from backend
      setCartItems([]); // Clear local cart items
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  
  if (loading) {
    return <p>Loading cart items...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const totalOrderValue = cartItems.reduce((total, item) => total + item.itemId.price, 0);

  return (
    <div>
      <Row className="products-container">
        {cartItems.map(item => (
          <Col key={item.itemId._id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ margin: '1rem' }}>
              <Card.Body>
                <Card.Title>{item.itemId.name}</Card.Title>
                <Card.Text>Price: Rs.{item.itemId.price}</Card.Text>
                <Card.Text>Vendor: {item.itemId.sellerId}</Card.Text>
                <Card.Text>Description: {item.itemId.description}</Card.Text>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.itemId._id)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ margin: '1rem' }}>
        <h4>Total Order Value: Rs.{totalOrderValue}</h4>
        <Button variant="success" onClick={handleOrder} style={{ marginTop: '1rem' }}>
          Place Order
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderResponse.map((order, index) => (
            <div key={index}>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>OTP:</strong> {order.otp}</p>
              <hr />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cart;
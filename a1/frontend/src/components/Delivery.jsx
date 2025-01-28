import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function Delivery() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/order/processingOrdersSeller', { withCredentials: true });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCloseTransaction = async () => {
    try {
      const response = await axios.post('/order/verifyOtp', { orderId: selectedOrderId, otp }, { withCredentials: true });
      alert(response.data.message);
      setOrders(orders.filter(order => order._id !== selectedOrderId));
      // await fetchOrders();
      setShowModal(false);
    } catch (error) {
      console.error('Error closing transaction:', error);
      alert(error.response.data.error || 'Failed to close transaction\n Incorrect OTP');
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {orders.length === 0 ? (
        <p>No processing orders</p>
      ) : (
        orders.map(order => (
          <Card key={order._id} style={{ margin: '1rem' }}>
            <Card.Body>
              <Card.Title>Order ID: {order._id}</Card.Title>
              <Card.Text>Item: {order.itemName}</Card.Text>
              <Card.Text>Price: Rs.{order.itemPrice}</Card.Text>
              <Card.Text>Buyer: {order.buyerEmail}</Card.Text>
              <Button variant="primary" onClick={() => { setSelectedOrderId(order._id); setShowModal(true); }}>
                Close Transaction
              </Button>
            </Card.Body>
          </Card>
        ))
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formOtp">
              <Form.Label>OTP</Form.Label>
              <Form.Control type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCloseTransaction}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Delivery;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
function Orders() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const pendingResponse = await axios.get('/order/processingOrdersBuyer', { withCredentials: true });
        const boughtResponse = await axios.get('/order/boughtOrders', { withCredentials: true });
        const soldResponse = await axios.get('/order/soldOrders', { withCredentials: true });

        setPendingOrders(pendingResponse.data.orders);
        setBoughtItems(boughtResponse.data.orders);
        setSoldItems(soldResponse.data.orders);
        setLoading(false);
      } catch (error) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);



  const handleRegenerateOtp = async (orderId) => {
    try {
      const response = await axios.post('/order/regenerateOtp', { orderId }, { withCredentials: true });
      alert(`Regenerated OTP: ${response.data.otp}`);
      await fetchOrderById(orderId); // Fetch the updated order details
    } catch (error) {
      console.error('Error regenerating OTP:', error);
      alert('Failed to regenerate OTP');
    }
  };

  const fetchOrderById = async (orderId) => {
    try {
      const response = await axios.post('/order/orderById',{orderId}, { withCredentials: true });
      const updatedOrder = response.data.order;
      console.log(updatedOrder);
      // Update the state with the updated order details
      setPendingOrders(prevOrders =>
        prevOrders.map(order => (order._id === updatedOrder._id ? updatedOrder : order))
      );
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      alert('Failed to fetch updated order details');
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Tabs defaultActiveKey="pending" id="orders-tabs">
      <Tab eventKey="pending" title="Pending Orders">
        {pendingOrders.length === 0 ? (
          <p>No pending orders</p>
        ) : (
          pendingOrders.map(order => (
            <Card key={order._id} style={{ margin: '1rem' }}>
              <Card.Body>
                <Card.Title>Order ID: {order._id}</Card.Title>
                <Card.Text>Hashed OTP: {order.otp}</Card.Text>
                <Card.Text>Item: {order.itemName}</Card.Text>
                <Card.Text>Price: Rs.{order.itemPrice}</Card.Text>
                <Card.Text>Seller: {order.sellerEmail}</Card.Text>
                <Button variant="primary" onClick={() => handleRegenerateOtp(order._id)}>
                  Regenerate OTP
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </Tab>
      <Tab eventKey="bought" title="Bought Items">
        {boughtItems.length === 0 ? (
          <p>No items bought</p>
        ) : (
          boughtItems.map(order => (
            <Card key={order._id} style={{ margin: '1rem' }}>
              <Card.Body>
                <Card.Title>Order ID: {order._id}</Card.Title>
                <Card.Text>Item: {order.itemName}</Card.Text>
                <Card.Text>Price: Rs.{order.itemPrice}</Card.Text>
                <Card.Text>Seller: {order.sellerEmail}</Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </Tab>
      <Tab eventKey="sold" title="Sold Items">
        {soldItems.length === 0 ? (
          <p>No items sold</p>
        ) : (
          soldItems.map(order => (
            <Card key={order._id} style={{ margin: '1rem' }}>
              <Card.Body>
                <Card.Title>Order ID: {order._id}</Card.Title>
                <Card.Text>Item: {order.itemName}</Card.Text>
                <Card.Text>Price: Rs.{order.itemPrice}</Card.Text>
                <Card.Text>Buyer: {order.buyerEmail}</Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </Tab>
    </Tabs>
  );
}

export default Orders;
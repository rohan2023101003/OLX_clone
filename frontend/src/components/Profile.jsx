import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUserData } from './Api'; // Import fetchUserData function

function Profile({ LoggedInUser, setLoggedInUser }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact: '',
    age: '',
    password: ''
  });

  useEffect(() => {
    if (LoggedInUser) {
      setFormData({
        first_name: LoggedInUser.first_name,
        last_name: LoggedInUser.last_name,
        contact: LoggedInUser.contact,
        age: LoggedInUser.age,
        password: '' // Password should be empty initially
      });
      setLoading(false);
    }
  }, [LoggedInUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateField = (name, value) => {
    const errors = {};
    if (name === 'first_name' && /\s/.test(value)) {
      errors.first_name = 'First name should not contain spaces';
    }
    if (name === 'last_name' && /\s/.test(value)) {
      errors.last_name = 'Last name should not contain spaces';
    }
    if (name === 'age' && value <= 0) {
      errors.age = 'Age must be a positive number';
    }
    if (name === 'contact' && !/^\d{10}$/.test(value)) {
      errors.contact = 'Contact number must be 10 digits';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e, fieldName) => {
    e.preventDefault();
    const value = formData[fieldName];
    if (!validateField(fieldName, value)) {
      return;
    }
    const updatedField = { [fieldName]: value };
    try {
      await axios.patch('/user/editProfile', updatedField, { withCredentials: true });
      const updatedUser = { ...LoggedInUser, ...updatedField };
      setLoggedInUser(updatedUser); // Update the user data in the parent component
      setEditingField(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setFormErrors({ submit: 'Failed to update profile' });
    }
  };

  if (loading) {
    return <p>Loading profile details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Card style={{ margin: '1rem' }}>
      <Card.Body>
        <Card.Title>Profile Details</Card.Title>
        {editingField === 'first_name' ? (
          <Form onSubmit={(e) => handleFormSubmit(e, 'first_name')}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                isInvalid={!!formErrors.first_name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.first_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" type="submit" style={{ marginTop: '1rem' }}>
              Save
            </Button>
            <Button variant="danger" onClick={() => setEditingField(null)} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Text>First Name: {LoggedInUser.first_name}</Card.Text>
            <Button variant="primary" onClick={() => setEditingField('first_name')}>
              Edit
            </Button>
          </>
        )}
        {editingField === 'last_name' ? (
          <Form onSubmit={(e) => handleFormSubmit(e, 'last_name')}>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                isInvalid={!!formErrors.last_name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.last_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" type="submit" style={{ marginTop: '1rem' }}>
              Save
            </Button>
            <Button variant="danger" onClick={() => setEditingField(null)} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Text>Last Name: {LoggedInUser.last_name}</Card.Text>
            <Button variant="primary" onClick={() => setEditingField('last_name')}>
              Edit
            </Button>
          </>
        )}
        {editingField === 'contact' ? (
          <Form onSubmit={(e) => handleFormSubmit(e, 'contact')}>
            <Form.Group controlId="formContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                isInvalid={!!formErrors.contact}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.contact}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" type="submit" style={{ marginTop: '1rem' }}>
              Save
            </Button>
            <Button variant="danger" onClick={() => setEditingField(null)} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Text>Contact: {LoggedInUser.contact}</Card.Text>
            <Button variant="primary" onClick={() => setEditingField('contact')}>
              Edit
            </Button>
          </>
        )}
        {editingField === 'age' ? (
          <Form onSubmit={(e) => handleFormSubmit(e, 'age')}>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                isInvalid={!!formErrors.age}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.age}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" type="submit" style={{ marginTop: '1rem' }}>
              Save
            </Button>
            <Button variant="danger" onClick={() => setEditingField(null)} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Text>Age: {LoggedInUser.age}</Card.Text>
            <Button variant="primary" onClick={() => setEditingField('age')}>
              Edit
            </Button>
          </>
        )}
        {editingField === 'password' ? (
          <Form onSubmit={(e) => handleFormSubmit(e, 'password')}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" style={{ marginTop: '1rem' }}>
              Save
            </Button>
            <Button variant="danger" onClick={() => setEditingField(null)} style={{ marginTop: '1rem', marginLeft: '1rem' }}>
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Text>Password: ******</Card.Text>
            <Button variant="primary" onClick={() => setEditingField('password')}>
              Edit
            </Button>
          </>
        )}
        {formErrors.submit && (
          <p style={{ color: 'red' }}>{formErrors.submit}</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default Profile;
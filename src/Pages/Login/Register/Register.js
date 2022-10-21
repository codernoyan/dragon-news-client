import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Register = () => {
  const [error, setError] = useState('');
  const [accepted, setAccepted] = useState(false);
  const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(name, photoURL, email, password);
    createUser(email, password)
      .then(result => {
        const { user } = result;
        console.log(user);
        form.reset();
        setError('');
        handleUpdateUserProfile(name, photoURL);
        handleEmailVerification();
        toast.success('Please verify your email address.');
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
    })    
  }

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL : photoURL,
    }
    updateUserProfile(profile)
      .then(() => {
        toast.success('Profile updated');
      })
      .catch((error) => {
        console.error(error);
        toast.error('profile not updated');
    })
  }

  const handleAccepted = (event) => {
    setAccepted(event.target.checked);
  }

  const handleEmailVerification = () => {
    verifyEmail()
      .then(() => {
      console.log('email verification link has been sent to you email')
    })
      .catch(error => {
      console.error(error)
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter Your name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Photo URL</Form.Label>
        <Form.Control name="photoURL" type="text" placeholder="Enter PHoto URL" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          onClick={handleAccepted}
          label={<>Accept <Link to="/terms">Terms and Conditions</Link></>} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!accepted}>
        Submit
      </Button>
      <Form.Text className="text-danger d-block">
        {error}
      </Form.Text>
    </Form>
  );
};

export default Register;
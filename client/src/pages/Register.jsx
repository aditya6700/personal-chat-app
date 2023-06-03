import React, { useState } from 'react'
import { Container, Row, Col, Form, FloatingLabel, Button, NavLink } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

export default function Register() {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "", email: "", phone: 0, password: "", cpassword: ""
  });

  const toastOptions = {
		position: "bottom-right",
		autoClose: 6000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

  const handleChange = (event) => {
    const { name, value } = event.target;
    return setUserDetails({ ...userDetails, [name]: value });
  }

  const formValidation = () => {
    const { name, email, phone, password, cpassword } = userDetails;

    let validated = true;

    const nameRegex = /^[a-zA-z0-9_ ]{3,15}$/;
    const phoneRegex = /^[6789]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*-])[a-zA-Z\d.!@#$%^&*-]{8,16}$/;

    toast.dismiss();

    if (!nameRegex.test(name)) {
      toast.error(
				"Username should be greater than 3 chars. Special chars allowed space and underscore",
				toastOptions
      );
      validated = false;
    }

    if (!emailRegex.test(email)) {
      toast.error(
				"Invalid email",
				toastOptions
      );
      validated = false;
    }

    if (!phoneRegex.test(phone)) {
      toast.error(
				"Must be an Indian number",
				toastOptions
      );
      validated = false;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
				"Password should be min of 8 and max 16. Should follow standard password rules",
				toastOptions
      );
    validated = false;
    }

    if (!password.match(cpassword)) {
      toast.error(
				"Passwords does not match",
				toastOptions
      );
      validated = false;
    }

    return validated;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, phone, password, cpassword } = userDetails;

    if (formValidation()) {
      console.log('valid');
      
      try {
        const res = await axios.post(registerRoute, {
          name, email, phone, password, cpassword
        });
  
        console.log(res);
        navigate('/login');
      }
      catch (err) {
        console.log(err.response);
        window.alert(err.response.data.message);
      }
      
		}
  };


  return (
    <>
      <Container className='register_page main_div' fluid="md" >
        <Row className='outer_row d-flex justify-content-center align-items-center vh-100' >
          <div className="form_container col-6 col-md-5 col-sm-12 d-flex flex-column align-items-center p-3 py-5 ">
            <Row> <h2 className='title fs-2' >Sparrow</h2> </Row>
            <Row>
              <Form className='register_form p-2' autoComplete="off" noValidate onSubmit={handleSubmit} >

                <Form.Group>
                  <FloatingLabel controlId="floatingInput" label="Name" className="mb-3" >
                    <Form.Control type="text" placeholder="Dream Fuel" name="name" onChange={handleChange} required />
                  </FloatingLabel> 
                </Form.Group>

                <Form.Group>
                  <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                    <Form.Control type="email" placeholder="name@example.com" name="email" onChange={handleChange} required />
                  </FloatingLabel> 
                </Form.Group>

                <Form.Group>
                  <FloatingLabel controlId="floatingInput" label="Phone" className="mb-3" >
                    <Form.Control type="number" placeholder="993654789" name="phone" onChange={handleChange} required />
                  </FloatingLabel> 
                </Form.Group>

                <Form.Group>
                  <FloatingLabel controlId="floatingInput" label="Password" className="mb-3" >
                    <Form.Control type="password" placeholder="secret" name="password" onChange={handleChange} required />
                  </FloatingLabel> 
                </Form.Group>

                <Form.Group>
                  <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3" >
                    <Form.Control type="password" placeholder="secret" name="cpassword" onChange={handleChange} required />
                  </FloatingLabel> 
                </Form.Group>

                <Form.Group>
                  <p className='extra'>
                    Already have an account? <Link to='/login' >Login</Link>
                  </p>
                  <Button type="submit" size='sm'>Submit form</Button>
                </Form.Group>
                
            </Form>
            </Row>
          </div>
        </Row>
        <ToastContainer />
      </Container> 
    </>
  )
}

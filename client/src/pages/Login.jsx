import React, { useState } from 'react'
import { Container, Row, Col, Form, FloatingLabel, Button, NavLink } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

export default function Login() {

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "", password: ""
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
    return setLoginDetails({ ...loginDetails, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = loginDetails;

      console.log('valid');
      
      try {
        const res = await axios.post('/api/user/login', {
          email, password
        });
  
        console.log(res);
        navigate('/');
      }
      catch (err) {
        console.log(err.response);
        toast.error(
          err.response.data.message,
          toastOptions
        );
        // window.alert(err.response.data.message);
      }
      
  };


  return (
    <>
      <Container className='login_page main_div' fluid="md" >
        <Row className='outer_row d-flex justify-content-center align-items-center vh-100' >
          <div className="form_container col-6 col-md-5 col-sm-12 d-flex flex-column align-items-center p-3 py-5 ">
            <Row> <h2 className='title fs-2' >Sparrow</h2> </Row>
            <Row>
              <Form className='login_form p-2' autoComplete="off" noValidate onSubmit={handleSubmit} >

                <Form.Group>
                  <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                    <Form.Control type="email" placeholder="name@example.com" name="email" onChange={handleChange} required />
                  </FloatingLabel> 
                </Form.Group>

                <Form.Group>
                  <FloatingLabel controlId="floatingInput" label="Password" className="mb-3" >
                    <Form.Control type="password" placeholder="secret" name="password" onChange={handleChange} required />
                  </FloatingLabel> 
                </Form.Group>

                <Form.Group>
                  <p className='extra'>
                    Don't have an account? <Link to='/register' >Register</Link>
                  </p>
                  <Button type="submit" size='md'>Login</Button>
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

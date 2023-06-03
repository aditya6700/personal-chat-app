import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { authenticate } from '../utils/APIRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate();

  const redirecToLogin = async () => {
    try {

      const res = await axios.get(authenticate, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res.data);
    }
    catch (err) {
      console.log(err.response.data);
      if (!err.response.data.status) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    redirecToLogin();
  }, []);

  return (
    <>
      <Container md="fluid" >
        <Row>
          <Col md={10} className='col-12 mx-auto' >
            <Row>
              hello hi
            </Row>
          </Col>
        </Row>
      </Container>

    </>
  )
}

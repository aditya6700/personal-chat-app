import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { logoutRoute } from '../utils/APIRoutes';

export default function Logout({currentUser}) {

  const navigate = useNavigate();

  const handleLogout = async () => {
    axios.get(`${logoutRoute}/${currentUser._id}`, {
      withCredentials: true,
      "Accept": "application/json",
      "Content-Type": "application/json"
    })
      .then((res) => {
        navigate('/login', { replace: true });
        if (res.status !== 200) {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <LogoutButton onClick={handleLogout}>
      <BiPowerOff />
    </LogoutButton>
  )
}

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #11009E;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #f2f1ef;
  }
`;
import React from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

export default function Logout() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    
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

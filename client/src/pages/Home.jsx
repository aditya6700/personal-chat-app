import React, { useEffect, useState } from 'react';
import { getUsersRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Users from '../components/Users';
import ChatContainer from '../components/ChatContainer';
import Welcome from '../components/Welcome';

export default function Home() {

  const navigate = useNavigate();

  const [usersList, setUsersList] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isAuthenticated = async () => {
    try {
      console.log('autnentcaitng')
      const res = await axios.get(getUsersRoute, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res.data);
      setUsersList(res.data.users);
      setCurrentUser(res.data.currentUser);
      setLoading(false);
    }
    catch (err) {
      console.log(err.response.data);
      setLoading(false);
      if (!err.response.data.status) {
        navigate('/login');
      }
    }
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) :
        (
          <Container>
            <div className="container">
              <Users
                usersList={usersList}
                changeChat={handleChatChange}
                currentUser={currentUser}
              />

              {
                currentChat === undefined ?
                  <Welcome
                    userName={currentUser.name}
                  />
                  :
                  <ChatContainer
                    currentChat={currentChat}
                  />
              }
            
            </div>
          </Container>
        )
      }
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);
  .container {
    height: 85vh;
    width: 85vw;
    padding: 0;
    display: grid;
    grid-template-columns: 25% 75%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
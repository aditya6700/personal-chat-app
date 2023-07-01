import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ChatInputBox from './ChatInputBox';
import axios from 'axios';
import { addMsgRoute, getMsgsRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from "uuid";

const userImage = `iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFMElEQVR4nO1ZfUyVVRh/p5Otj7VJwTmHD1e7YHkbgyAQh5zDl0rONDLA5WZSxlaGNBvmCri+L6RbYatVJisZ6RTWZP3RGpXYcs5arbmF6MLA94XIlD4oYBJCPO154b73gHzee7lcNn7bM96dL36/c57znOecqygLWMACvApCeCqlvIYyrhMqblDGewnlP1HKTxDCc+x2e4DirwgKEncOkxYwsfEWSvnjij/CbrcHUMavTS5g2AjjbyiKskjxNxAi7iVEbA8O5lGMxd1OyJo7QkJEDKWimDDROWY1XlfmEwIDE+4ijJ+URTDGs5R5hkWEiTp5T9j9eWOD4YgFQz0EunoZDK0PrauxpMVmS3NtdiqyFX8DtB+8DQytCnR1CAwNxtrBkjzLjUJDU2p8TjAoTERQyl/Cv+OS19Vz4xF3WtOpPZaAuJi1N7CPTwVQJlpHCLTeIsDQqicjj9ZzqdQSEGFLBzDUIz4WwHucBPAAs8i3q/ETuY1s3RddAiIj0sHs06bF+UwAoaLZEhCaGm0J0LUPpyKPduHLIktA0spHhst1rdJnAjC3kaJIsSXAUI3pCJA38c68XGe57jMBmJi50gLRiYcUwMeLQVcHpyL/T1Mp2FdkWAI+rXrBuQIDOIYP8x5rI6OIusrK/CVTCfjvigp5W56wyK+Kz4SbLft8LwCBWeXoBE3U/X2hpGOymZfJUyag/tguuU2b4mtgVikTstnS+t4szTM3ae8lh2mNXxSZPi+7DVr5nqdGi9TVD+YotxktYjpWVrTNdCeJ/BDo5YnKXAGzSvOyMgVx9Pn6owXjuJh6XJlrmBubiuywZam18bHr+my2NHQpSF61Hp7fnmtGG2vDjnId7Qe47rAOQ78AEgJDq536TFBr/I68DGgrWw26+hHo2q/SjON3NRhqkjKfAE2OALS55jE/QenqIMLEYUL5L5TxwZmFTd4TzPiT8nh42adUnJPaDBIq2gkTlYQk3+dV8oQkp1Emrs801o95RvlaHjM4RGRM0r4b6702856Sn94KiLF9rjEm7vFYALqNNIsGpSlCUbJnIeHKXsyYWI1PktL/O+TxsOiXrrwfyfvgbZWNCKDC8+SOUNHvHFBR4pbIdaBrD4GhngFD/Xc6l5jp2M2WfZYbhYWlDIHuiPFQAP/dNWBaqIt8eSIYWr+3iMOIXf3+VUvAgyvWYFk/tJYnuC2AUt7gHJAxnm8JMNTz3iYPhgZH38q3BORszLJyJfdXgIkC2SfDwhIDoWP/3bNB/q8fSyA2ep0l4EhFvqu+3RHolgC861LGf5PC27c1b+fbvE2++2IprM941CIfHbXWfDuy2lx+Lcj9VSBiA2V8QIrTrWdPvtjrLfLffLIbEuIyXZs3PAVOHS+U23QBODz7LYGEiDzKxJB82ORuyoLTNYUw0CLdrKZp2KfhxC5zDHlMFpICte89NzuXHUpTNstRyWnLI9Nhx9ZseH//M/BVbSG0nt0LXY0lZkhEw28swzpsg22xDx0zDkadz6pHnlichi8V7VqU4i0EB6cRwvixMS7lkYWHp5qPW53ni8dZrbICZTbAWNIy/IloeWT6n+4ST4jLBK1oG3R898qtxHHmdXW34gu8q+3IeUd7+urLO7fC5g2PwcqHM+GB+zPMmUXDbyzDOmxTVfEs/Hxm78R7RFebPDq83AFGCbiibgJdPW3O3kyjkY4zrjVAm7bR44jjsZi2A0tB17aAoVaAoX0OhtYMuvrHSOrRP/LdDIZab7bBtm0Hls4p6QUo7uF/5rk7A9h46sUAAAAASUVORK5CYII=`;

export default function ChatContainer({ currentChat, currentUser, socketRef }) {

  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [inboundMessage, setInBoundMessage] = useState(null);

  const getAllMsgs = async () => {
    try {
      const response = await axios.post(getMsgsRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      console.log(response)
      setMessages(response.data);
    }
    catch (err) {
      console.log(err.message); 
    }
  }

  useEffect(() => {
    getAllMsgs();
  }, [currentChat]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("msg-recieve", (msg) => {
        setInBoundMessage({ self: false, message: msg.message, time: msg.time });
      })
    }
  }, []);

  useEffect(() => {
    inboundMessage && setMessages((old) => [...old, inboundMessage]);
  }, [inboundMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);
  
  const handleSendMsg = async (msg) => {
    try {
      socketRef.current.emit("send-msg", {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
        time: new Date()
      });

      const data = await axios.post(addMsgRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg
      });

      setMessages((old) => [...old, { self: true, message: msg, time: new Date() }]);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <ChatDiv>
      <div className="user-details">
        <div className="avatar">
          <img src={`data:image/svg+xml;base64,${userImage}`}
              alt="" />
        </div>
        <div className="username">
        <h3>{currentChat.name}</h3>
        </div>
      </div>

      <div className="chat-messages">
        {
          messages.map(msg => {
            const createdTime = new Date(msg.time);
            const hours = createdTime.getHours();
            const minutes = createdTime.getMinutes();
            const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
            return (
              <div ref={scrollRef} key={uuidv4()} >
                <div className={`message ${msg.self ? "sent" : "recieve"}`}>
                  <div className="content">
                    <p>{msg.message}</p>
                  </div>
                  <div className="time-stamp">
                    {formattedTime}   
                  </div>
                  
                </div>
              </div>
            )
          })
        }
      </div>

      <ChatInputBox handleSendMsg={handleSendMsg} />
      
    </ChatDiv>
  )
}

const ChatDiv = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  ${'' /* background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%); */}
  background: #f7f1e3;
  

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
   
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0 2rem;
      background-color: #f1f2f6;
      box-shadow: 1px 7px 12px 5px rgba(0,0,0,0.1);
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #181823;
          text-transform: Capitalize;
        }
      }
    }
   
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: .4rem 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
        p {
          margin: 0;
        }
      }
    }

    .time-stamp{
      align-self: flex-end;
      font-size: 10px;
      color: #999999;
      margin-left: 5px;
    }

    .sent {
      justify-content: flex-end;
      .content {
        background-color: #DAFFFB;
      }
    }
    .recieve {
      justify-content: flex-start;
      .content {
        background-color: #ffffff;
      }
    }
  }
`;
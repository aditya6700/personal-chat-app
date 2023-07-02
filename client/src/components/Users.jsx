import React, { useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.png';
import Logout from './Logout';

const userImage = `iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFMElEQVR4nO1ZfUyVVRh/p5Otj7VJwTmHD1e7YHkbgyAQh5zDl0rONDLA5WZSxlaGNBvmCri+L6RbYatVJisZ6RTWZP3RGpXYcs5arbmF6MLA94XIlD4oYBJCPO154b73gHzee7lcNn7bM96dL36/c57znOecqygLWMACvApCeCqlvIYyrhMqblDGewnlP1HKTxDCc+x2e4DirwgKEncOkxYwsfEWSvnjij/CbrcHUMavTS5g2AjjbyiKskjxNxAi7iVEbA8O5lGMxd1OyJo7QkJEDKWimDDROWY1XlfmEwIDE+4ijJ+URTDGs5R5hkWEiTp5T9j9eWOD4YgFQz0EunoZDK0PrauxpMVmS3NtdiqyFX8DtB+8DQytCnR1CAwNxtrBkjzLjUJDU2p8TjAoTERQyl/Cv+OS19Vz4xF3WtOpPZaAuJi1N7CPTwVQJlpHCLTeIsDQqicjj9ZzqdQSEGFLBzDUIz4WwHucBPAAs8i3q/ETuY1s3RddAiIj0sHs06bF+UwAoaLZEhCaGm0J0LUPpyKPduHLIktA0spHhst1rdJnAjC3kaJIsSXAUI3pCJA38c68XGe57jMBmJi50gLRiYcUwMeLQVcHpyL/T1Mp2FdkWAI+rXrBuQIDOIYP8x5rI6OIusrK/CVTCfjvigp5W56wyK+Kz4SbLft8LwCBWeXoBE3U/X2hpGOymZfJUyag/tguuU2b4mtgVikTstnS+t4szTM3ae8lh2mNXxSZPi+7DVr5nqdGi9TVD+YotxktYjpWVrTNdCeJ/BDo5YnKXAGzSvOyMgVx9Pn6owXjuJh6XJlrmBubiuywZam18bHr+my2NHQpSF61Hp7fnmtGG2vDjnId7Qe47rAOQ78AEgJDq536TFBr/I68DGgrWw26+hHo2q/SjON3NRhqkjKfAE2OALS55jE/QenqIMLEYUL5L5TxwZmFTd4TzPiT8nh42adUnJPaDBIq2gkTlYQk3+dV8oQkp1Emrs801o95RvlaHjM4RGRM0r4b6702856Sn94KiLF9rjEm7vFYALqNNIsGpSlCUbJnIeHKXsyYWI1PktL/O+TxsOiXrrwfyfvgbZWNCKDC8+SOUNHvHFBR4pbIdaBrD4GhngFD/Xc6l5jp2M2WfZYbhYWlDIHuiPFQAP/dNWBaqIt8eSIYWr+3iMOIXf3+VUvAgyvWYFk/tJYnuC2AUt7gHJAxnm8JMNTz3iYPhgZH38q3BORszLJyJfdXgIkC2SfDwhIDoWP/3bNB/q8fSyA2ep0l4EhFvqu+3RHolgC861LGf5PC27c1b+fbvE2++2IprM941CIfHbXWfDuy2lx+Lcj9VSBiA2V8QIrTrWdPvtjrLfLffLIbEuIyXZs3PAVOHS+U23QBODz7LYGEiDzKxJB82ORuyoLTNYUw0CLdrKZp2KfhxC5zDHlMFpICte89NzuXHUpTNstRyWnLI9Nhx9ZseH//M/BVbSG0nt0LXY0lZkhEw28swzpsg22xDx0zDkadz6pHnlichi8V7VqU4i0EB6cRwvixMS7lkYWHp5qPW53ni8dZrbICZTbAWNIy/IloeWT6n+4ST4jLBK1oG3R898qtxHHmdXW34gu8q+3IeUd7+urLO7fC5g2PwcqHM+GB+zPMmUXDbyzDOmxTVfEs/Hxm78R7RFebPDq83AFGCbiibgJdPW3O3kyjkY4zrjVAm7bR44jjsZi2A0tB17aAoVaAoX0OhtYMuvrHSOrRP/LdDIZab7bBtm0Hls4p6QUo7uF/5rk7A9h46sUAAAAASUVORK5CYII=`;

export default function Users({ usersList, changeChat, currentUser }) {

  const [currentChatSelected, setCurrentChatSelected] = useState(undefined);
  
  const changeCurrentChat = (user, index) => {
    changeChat(user);
    setCurrentChatSelected(index);
  }

  return (
    <>
      <UsersContainer>
        <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Sparrow</h3>
          <Logout 
            currentUser={currentUser}
            />
        </div>
        <div className="users">
          {
            usersList.map((user, index) => {
            return (
              <div
                key={user._id}
                className={`user ${index === currentChatSelected ? "selected" : "" }`}
                onClick={() => changeCurrentChat(user, index)}
              >
                
                <div className="avatar">
                  <img
                      src={`data:image/svg+xml;base64,${userImage}`}
                      alt=""
                    />
                </div>
                <div className="username">
                  <h3>{user.name}</h3>
                </div>

              </div>
            )
            })
          }
        </div>
        
        <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${userImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUser.name} </h2>
            </div>
          </div>
      </UsersContainer>
    </>
  )
}


const UsersContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background: #4942E4;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
    justify-content: space-around;
    img {
      height: 3rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .users {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .user {
      ${'' /* background-color: #ffffff34; */}
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      ${'' /* transition: 0.5s ease-in-out; */}
      .avatar {
        img {
          height: 2.5rem;
        }
      }
      .username {
        h3 {
          color: #f2f1ef;
          text-transform: Capitalize;
        }
      }

      &:hover {
        background: #f1f2f6a1;
        .username h3{
          color: #1e272e;
        }
      }
      
    }
   

    .selected {
      ${'' /* background-color: #e3ffe7; */}
      background-color: #f7f1e3;
      border-radius: 0rem;
      .username h3{
        color: #1e272e;
      }
      &:hover {
        background-color: #f7f1e3;
      }
    }
  }

  .current-user {
    ${'' /* background-color: #0d0d30; */}
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    padding-left: 1rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
        text-transform: capitalize;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export default function ChatInputBox({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <InputBox>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill />
        </div>
      </div>
      <div className="input-container">

      <form className="form-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
      </form>
        <button type="submit">
          <IoMdSend />
        </button>
      </div>
    </InputBox>
  );
}

const InputBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #f1f2f6;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: black;
        cursor: pointer;
      }
    }
  }
  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #ffffff34;
    gap: 1rem;
    
    .form-container {
      width: 100%;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      background-color: white;
      ${'' /* border: 1px solid red; */}
    }
   
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      ${'' /* background-color: white; */}
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
        color: white;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      border-radius: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #4942E4;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;

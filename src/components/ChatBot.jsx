import React from "react";
import "./styles/ChatBot.css";
import axios from "axios";
import dwightIcon from "../assets/images/dwightBotIcon.png";
import userIcon from "../assets/images/userIcon.svg";
import { marked } from "marked";

function ChatBot() {
  let conversation = "";

  function addUserMessage(msg) {
    const user_response = document.createElement("div");
    user_response.classList.add("user_response");
    user_response.innerHTML = `<p>${msg}</p>`;

    const userIconElement = document.createElement("img");
    userIconElement.src = userIcon;
    userIconElement.alt = "User Icon";
    userIconElement.classList.add("user_icon");

    user_response.appendChild(userIconElement);
    document.querySelector(".chatbot_body").appendChild(user_response);
  }

  function addDwightMessage(msg) {
    const dwight_response = document.createElement("div");
    dwight_response.classList.add("dwight_response");
	
	// first add icon
	const dwightIconElement = document.createElement("img");
	dwightIconElement.src = dwightIcon;
	dwightIconElement.alt = "Dwight Icon";
	dwightIconElement.classList.add("dwight_icon");

	// creater new p element and add message text
	const dwightMessageElement = document.createElement("p");
	dwightMessageElement.innerHTML = marked(msg);

	// append icon and message to dwight_response
	dwight_response.appendChild(dwightIconElement);
	dwight_response.appendChild(dwightMessageElement);

	document.querySelector(".chatbot_body").appendChild(dwight_response);
  }

  function handleSend() {
    const msg = document.querySelector(".chatbot_footer textarea").value;
    document.querySelector(".chatbot_footer textarea").value = "";

    conversation = conversation + `, User: ${msg}`;

    addUserMessage(msg);

    // call generateResponse function here
    generateResponse();
  }

  function createPrompt(msg) {
	return `You are Dwight Schrute from the US sitcom 'The Office'. 
	Respond to the user's message exactly as Dwight would, without adding any commentary, introductions, or any third-person context. 
	Do not prefix your response with 'Dwight:' or 'Assistant:'. 
	Maintain Dwight's peculiar character and style of speaking.
	When someone first introduces themselves, Dwight would be very suspicious and ask for more information about their identity and only then would start talking to them.
	Only provide Dwight's direct reply to the following message from the user: "${msg}"`;
  }
  
  

  async function generateResponse() {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyBZcn5aOeqPledPq2Xk74Hmw7tqXgaqyHI",
      method: "POST",
      data: {
        contents: [
          {
            parts: [
              {
                text: createPrompt(conversation),
              },
            ],
          },
        ],
      },
    });

    console.log(conversation);

	const dwightMessage = response.data.candidates[0].content.parts[0].text;

    addDwightMessage(dwightMessage);

    conversation = conversation + `, Dwight: ${dwightMessage}`;
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot_body">
        <div className="dwight_response">
          <img src={dwightIcon} alt="Dwight Bot Icon" className="dwight_icon" />
          <p>Hi! I'm Schrute Bot. How can I help you today?</p>
        </div>
      </div>
      <div className="chatbot_footer">
        <textarea placeholder="Type a message..."></textarea>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;

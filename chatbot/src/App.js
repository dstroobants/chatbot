import './App.css';
import React, { useState } from 'react';
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function getCompletion(input) {
  const response = await openai.chat.completions.create({
    messages: [{ role: "system", content: input }],
    model: "gpt-3.5-turbo"
  });

  return response.choices[0].message.content;
}

function ChatBot({ onSubmit }) {
  const [message, setMessage] = React.useState('');
  const [outputValue, SetChatbotOutputValue] = useState('ChatBot ...');

  const handleSubmit = async (event) => {
    event.preventDefault();
    SetChatbotOutputValue("Working ...");
    const completion = await getCompletion(message);
    console.log(completion);
    SetChatbotOutputValue(completion);
    setMessage('');
  };

  return (
    <>
      <div className='chatbot-output'>
        <p>{outputValue}</p>
      </div>
      <form className='user-input' onSubmit={handleSubmit}>
        <textarea 
          className='user-input-text-area' 
          placeholder="Enter your message" 
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className='user-input-button' type="submit">Send</button>
      </form>
    </>
  );
};

function App() {
  return (
    <div className="App-header">
      <ChatBot />
    </div>
  );
}

export default App;
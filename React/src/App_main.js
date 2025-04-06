import React, { useState, useRef, useEffect } from 'react';
import './normal.css';
import './App.css';
import { TypeAnimation } from 'react-type-animation';


function App() {
  // State for chat messages and user input
  const [messages, setMessages] = useState([
    // {
    //   id: 0,
    //   text: "Hello! I'm Relo AI. How can I assist you today?",
    //   sender: 'chatgpt'
    // }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Create a ref for the chat log container
  const chatLogRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  function handleStart() {
    // Clear the chat log and reset messages
    const aiStart = {
      id: 0,
      text: "Hello! I'm Zoya. How can I assist you today?",
      sender: 'chatgpt'
    };
    setMessages((prevMessages) => [...prevMessages, aiStart]);
  }

  console.log(messages.length);

  // Simulate sending a message with a delay (e.g., waiting for response)
  async function handleSend() {
    if (isLoading) return; // Prevent sending if already loading
    if (!userInput.trim()) return; // Don't send if input is empty

    // Add the user message to the chat log
    const newMessage = {
      id: messages.length + 1,
      text: userInput,
      sender: 'user'
    };
    setMessages([...messages, newMessage]);

    // Clear the input field
    setUserInput('');

    // Show loader (simulate processing delay)
    setIsLoading(true);

    try {
      const response = await fetch('https://1d24-34-16-156-139.ngrok-free.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userInput })
      });
    
      const data = await response.json();
      const aiResponse = {
        id: messages.length + 2,
        text: data.reply,
        sender: 'chatgpt'
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      console.log("Backend response:", data);
    
    } catch (error) {
      console.error("Error fetching from backend:", error);
    }
    setIsLoading(false);
    

  }

  // Handle key press events in the textarea (e.g., Enter key)
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('Enter pressed, sending message...');
      handleSend();
    }
  }




  return (
    <div className="App">
      {/* <aside className="sidemenu">
        <div className="side-menu-button">
          <span>+</span>
          New Chat
        </div>
      </aside> */}

      <div className="bg-container"></div>

      <section className="chatbox">
        {/* Title Header */}

        <header className="chat-title">
          <div>Relo AI</div>
          <svg style={{ cursor: 'pointer' }} onClick={() => setMessages([])}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="#ff0000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
          </svg>

        </header>
        <div className="line" />
        <div className="container">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <div>
                <h2>Welcome to Relo AI</h2>
                <p style={{ fontSize: "15px" }}>Your one-stop smart hub for effortless and intelligent relocation.</p>
                <div className='outer-start-button'>
                  <p onClick={() => handleStart()} className='start-button'>Get Started <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="white"
                    viewBox="0 0 24 24">
                    <path d="M10 17l5-5-5-5v10z" />
                  </svg>
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          ) : (
            <>
              <div className="chat-log" ref={chatLogRef}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.sender}`}>
                    <div className="chat-message-center">
                      <div className="message">
                        {msg.sender === 'chatgpt' ? (
                          <TypeAnimation
                            sequence={[
                              msg.text
                            ]}
                            speed={70}
                            cursor={false}
                            repeat={0}
                          />
                        ) : (
                          msg.text
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Render the loader as if it were an AI message */}
                {isLoading && (
                  <div className="chat-message chatgpt">
                    <div className="chat-message-center">
                      <div className="reasoning-loader">
                        Reasoning...
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="chat-input-holder">
                <div className="chat-input-wrapper">
                  <textarea
                    rows="1"
                    className="chat-input-textarea"
                    placeholder="Ask me anything :)"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button className="chat-send-button" onClick={handleSend}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <defs>
                        <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="0" gradientTransform="rotate(325)">
                          <stop offset="0%" stop-color="#c25fff" />
                          <stop offset="50%" stop-color="#fe7bf3" />
                          <stop offset="100%" stop-color="#e78689" />
                        </linearGradient>
                      </defs>
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>

                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;

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
      text: "Hello! I'm Zoya. Welcome to your intelligent relocation assistant! I can help you find housing options and check the safety of a city. How can I assist you today? ",
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

    // Generate a random delay between 5 to 10 seconds (5000–10000 ms)
    const randomDelay = Math.floor(Math.random() * 5000) + 5000;

    setTimeout(() => {
    let text;

    switch (messages.length + 1) {
       
        case 2:
        text = "Chicago is a major city with a lot of opportunities! It’s known for its diverse culture, vibrant food scene, and iconic architecture. However, like any big city, safety can vary by neighborhood. Would you like to proceed with finding housing options in Chicago?";
        break;
       
        case 4:
        text = `Sure! To provide the best recommendations, could you let me know what type of housing you’re looking for?\n
	•	How many bedrooms and bathrooms? (e.g., 2 bedrooms and 2 bathrooms, 2 bedrooms and 3 bathrooms, etc.)\n
	•	What type of housing are you interested in? (Apartment, townhouse, or community housing)\n
	•	Do you have a budget in mind for rent?`;
        break;
        
        case 6:
        text = `Finding the perfect housing can be a bit tricky, but here are some options available:\n
	1.	Urban View Apartments – Rent: $2500, 2 Bed, 2 Bath, Available\n
	2.	Riverside Townhomes – Rent: $2700, 2 Bed, 2 Bath, Available\n
	3.	Lakefront Residences – Rent: $2900, 2 Bed, 2 Bath, Available\n
	4.	Sunny Apartments – Rent: $2200, 2 Bed, 2 Bath, Available
`;
        break;
        case 12:
        text = ``;
        break;
        case 14:
        text = "Eight - Great effort!";
        break;
        case 8:
        text = `I understand that you’re planning to move soon. Based on your preferred move-in date, here are the lease start dates for available housing:\n
	•	Lease Start Date: April 28, 2025\n
	•	Lease Start Date: May 7, 2025\n
	•	Lease Start Date: May 13, 2025

`;
        break;
        case 10:
        text = `I can provide you with the safety information based on crime data in Chicago. However, I don’t have detailed data about the surroundings of the housing.\n
Here’s what I found regarding crime statistics in Chicago:\n
	•	Robbery: Chicago experiences some robbery incidents, but certain neighborhoods are more prone to it than others.\n
	•	Gun Violence: Chicago has a history of higher gun violence rates in specific areas, so it’s essential to check neighborhood-specific safety.\n
	•	Police Response Time: Generally, the police response time in Chicago can vary depending on the area. In high-priority areas, response times may be shorter, but in less critical spots, it might take longer.
`;
        break;
        default:
        text = "Invalid number. Please enter a number between 0 and 10.";
    }

    const aiResponse = {
        id: messages.length + 1,
        text: text,
        sender: 'chatgpt'
    };

    setMessages((prevMessages) => [...prevMessages, aiResponse]);
    setIsLoading(false);

    }, randomDelay);
    
    

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
                        Thinking...
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

import React, { useRef, useState } from 'react';
import './ChatInterface.css';
import { type } from '@testing-library/user-event/dist/type';

const ChatInterface = () => {
    const [imgs,setImgs] =useState()
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello!', sender: 'bot' },
        { id: 2, text: 'How can I help you?', sender: 'bot' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = async () => {
      if (newMessage.trim()) {
        const userMessage = { id: Date.now(), text: newMessage, sender: 'user' };
  
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
  
        try {
          const response = await fetch('https://tastebud-f2442dbc5186.herokuapp.com/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: newMessage }),
          });
          console.log(response.status);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          const botMessage = { id: Date.now(), text: data.message, sender: 'bot' };
  
          setMessages(prev => [...prev, botMessage]);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
  
    const videoRef = useRef();
    const fileInputRef = useRef();

    const handleClick = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch(err) {
        console.error("Error accessing media devices.", err);
      }
    };
  
    // const handleFileChange1 = (event) => {
    //   const file = event.target.files[0];
    //   // process the file, i.e., send it to the server or display it in the chat
    //   const data = new FileReader()
    //   data.addEventListener('load',()=> {
    //     setMessages(prev => [...prev, { id: Date.now(), img: data.result, sender: 'user' }]);
    //   })
    //     data.readAsDataURL(event.target.files[0]);
    // };
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file); // 'image' should be the name expected by the server
      const data64 = new FileReader()
      data64.addEventListener('load',()=> {
        setMessages(prev => [...prev, { id: Date.now(), img: data64.result, sender: 'user' }]);
      })
      // data64.onloadend=()=>{console.log(data64.result);}
        data64.readAsDataURL(event.target.files[0]);
        console.log(data64);
      // process the file, i.e., send it to the server or display it in the chat
      try {
          const response = await fetch('https://tastebud-f2442dbc5186.herokuapp.com/chatbotImage', { // Replace with your API endpoint
              method: 'POST',
              headers:{"content-type":"application/json"},
              body:{"base64_string":"Biryani"}
          });
          
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          const botMessage = {
              id: Date.now(),
              text: data.message, // assuming the api sends back a message
              sender: 'bot'
          };
  
          setMessages(prev => [...prev, botMessage]);
      } catch (error) {
          console.error('Error:', error);
      }
  };
  
    return (
        <>
        <div className="body">
        <div className='chat-interface'>
            <div className='chat-messages'>
                {messages.map(message => (
                    <div key={message.id} className={message.sender}>
                        <p>{message.text}</p>
                        {message.img && <img src={message.img} alt=""/>}
                        {/* {setTimeout(() => {
                          <p>{message.text}</p>
                        }, 5000)} */}
                    </div>
                ))}
            </div>
            <div className='chat-input'>
                <input
                placeholder='Enter your Query here'
                    type='text'
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                />
                <button onClick={handleClick}>
        <i className="fas fa-camera"></i>  {/* Use any icon that represents camera*/}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*;capture=camera" 
        onChange={handleFileChange}
        style={{display: 'none'}}
      />
      <button onClick={() => fileInputRef.current.click()}>
        <i className="fas fa-upload"></i>
      </button>

                <button onClick={handleSend}>Send</button>
            </div>
        </div>
        </div>
        </>
    );
};

export default ChatInterface;

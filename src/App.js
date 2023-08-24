import React, { useEffect, useState } from 'react'
import './App.css'

function App({ id = 123 }) {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    // create an SSE and (on the backend) subscribing to the clients list
    const eventSource = new EventSource(`http://localhost:8080/events/${id}`)

    eventSource.onmessage = (event) => {
      const newMsg = JSON.parse(event.data).text
      console.log({ newMsg })
      setMessages((prev) => prev.concat(newMsg))
    }

    return () => {
      eventSource.close()
    }
  }, [id])

  const sendMessage = async () => {
    if (inputText.trim() !== '') {
      try {
        await fetch(`http://localhost:8080/message/${id}`, {
          method: 'POST',
          // important to set headers to accept json
          headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputText }),
        })
        setInputText('')
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  return (
    <div className='App'>
      <div className='App-header'>
        <h1>Live Chat App {id}</h1>
        <div className='chat-container'>
          <div className='message-list'>
            {messages.map((message, index) => (
              <div key={index} className='message'>
                {message}
              </div>
            ))}
          </div>
          <div className='input-container'>
            <input
              type='text'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder='Type your message...'
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

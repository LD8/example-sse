import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8080/events')

    eventSource.onmessage = (event) => {
      console.log({ data: JSON.parse(event.data).text })
      setMessages((prev) => prev.concat(JSON.parse(event.data).text))
    }

    return () => {
      eventSource.close()
    }
  }, [])

  const sendMessage = async () => {
    if (inputText.trim() !== '') {
      try {
        await fetch('http://localhost:8080/message', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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
      <header className='App-header'>
        <h1>Live Chat App</h1>
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
      </header>
    </div>
  )
}

export default App

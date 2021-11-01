import { useEffect, useState } from 'react';
import './App.css';
//import { Message } from './components/Message/Message'
import { Form } from './components/Form/Form'

function App() {
  const [messages, setMessages] = useState([]);

  const handleMessage = (text) => {
    if (messages.length === 0) {
      setMessages([{ id: 0, text: text, author: 'human' }]);
    }
    else {
      setMessages([...messages, { id: messages[messages.length - 1].id + 1, text: text, author: 'human' }]);
    }
  }

  useEffect(() => {
    if (messages.length !== 0 && messages[messages.length - 1].author === "human") {
      setTimeout(() => {
        setMessages([...messages, { id: messages[messages.length - 1].id + 1, text: "Hello", author: 'bot' }])
      }, 1500)
    }
  }, [messages])

  return (
    <div className="App">
      <header className="App-header">
        {messages.map((message) => <div key={message.id}>{message.text}</div>)}
        <Form sendMessage={handleMessage} />
      </header>
    </div>
  );
}

export default App;

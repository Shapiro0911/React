import { useEffect, useState } from 'react';
import './App.css';
//import { Message } from './components/Message/Message'
import { Form } from './components/Form/Form'
import { MessageList } from './components/messageList/messageList'

function App() {
  const [messages, setMessages] = useState([]);

  const handleMessage = (text) => {
    setMessages([...messages, { id: (messages[messages.length - 1]?.id || -1) + 1, text: text, author: 'human' }]);
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
      <div className="chat container">
        <div className="messageList">
          <MessageList />
        </div>
        <div className="messages">
          {messages.map((message) => <div key={message.id}>{message.text}</div>)}
          <Form sendMessage={handleMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;

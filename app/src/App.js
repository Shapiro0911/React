import './App.css';
import { Message } from './components/Message/Message'

function App() {
  let text = 'Hi';
  return (
    <div className="App">
      <header className="App-header">
        <Message message={text} />
      </header>
    </div>
  );
}

export default App;

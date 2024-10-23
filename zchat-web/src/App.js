import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

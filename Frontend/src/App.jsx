import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Screens/LandingPage';
import EventDetailPage from './Screens/EventDetailPage';
import { EventProvider } from './Contexts/EventContext';

function App() {
  const [count, setCount] = useState(0);

  return (
    <EventProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Head from './components/Head';
import LandingPage from './components/LandingPage';
import GetStarted from './components/GetStarted';
import TripDetails from './components/TripDetails';
// import AImodel from '/services/AImodel';



function App() {
  return (
    <Router>
      <Head />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/tripdetails" element={<TripDetails />} /> {/* Ensure path is lowercase */}
      
      </Routes>
    </Router>
  );
}

export default App;

// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import UserRegistration from './pages/UserRegistration';
import ReviewerDashboard from './pages/ReviewerDashboard';
import AgendaReview from './pages/AgendaReview';
import MeetingCreation from './pages/MeetingCreation';
import MeetingsInspect from './pages/MeetingsInspect';
import MeetingRSVP from './pages/MeetingRSVP';
import ReviewerInvitation from './pages/ReviewerInvitation';
import ReviewerRegistration from './pages/ReviewerRegistration';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/reviewer/dashboard" element={<ReviewerDashboard />} />
            <Route path="/reviewer/agendas" element={<AgendaReview />} />
            <Route path="/reviewer/meetings/create" element={<MeetingCreation />} />
            <Route path="/meetings" element={<MeetingsInspect />} />
            <Route path="/meetings/:id/rsvp" element={<MeetingRSVP />} />
            <Route path="/reviewer/invite" element={<ReviewerInvitation />} />
            <Route path="/reviewer/register" element={<ReviewerRegistration />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
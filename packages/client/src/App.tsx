// src/App.tsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { AgendaReview } from './pages/AgendaReview';
import { Home } from './pages/Home/Home';
import { MeetingCreation } from './pages/MeetingCreation';
import { MeetingRSVP } from './pages/MeetingRSVP';
import { MeetingsInspect } from './pages/MeetingsInspect';
import { ReviewerDashboard } from './pages/ReviewerDashboard';
import { ReviewerInvitation } from './pages/ReviewerInvitation';
import { ReviewerRegistration } from './pages/ReviewerRegistration';
import { UserRegistration } from './pages/UserRegistration';

export const App = () => {
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
};

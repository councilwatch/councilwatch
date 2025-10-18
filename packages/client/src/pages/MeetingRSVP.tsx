// src/pages/MeetingRSVP.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const MeetingRSVP: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h2>RSVP to Meeting {id}</h2>
      {/* Placeholder for RSVP options: yes/no/maybe */}
      <form>
        <label>
          <input type="radio" name="rsvp" value="yes" /> Yes
        </label>
        <label>
          <input type="radio" name="rsvp" value="no" /> No
        </label>
        <label>
          <input type="radio" name="rsvp" value="maybe" /> Maybe
        </label>
        <button type="submit">Submit RSVP</button>
      </form>
    </div>
  );
};

export default MeetingRSVP;
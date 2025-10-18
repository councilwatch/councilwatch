// src/pages/AgendaReview.tsx
import React from 'react';

const AgendaReview: React.FC = () => {
  return (
    <div>
      <h2>Review Agendas</h2>
      {/* Placeholder for list of agendas */}
      <ul>
        <li>Agenda Item 1 - <button>Approve</button> <button>Reject</button></li>
        {/* ... */}
      </ul>
    </div>
  );
};

export default AgendaReview;
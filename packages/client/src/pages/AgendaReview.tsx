// src/pages/AgendaReview.tsx
import React from 'react';

export const AgendaReview: React.FC = () => {
  return (
    <div>
      <h2>Review Agendas</h2>
      {/* Placeholder for list of agendas */}
      <ul>
        <li>
          Agenda Item 1 - <button type="button">Approve</button> <button type="button">Reject</button>
        </li>
        {/* ... */}
      </ul>
    </div>
  );
};

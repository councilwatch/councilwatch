// src/pages/ReviewerInvitation.tsx
import React from 'react';

export const ReviewerInvitation: React.FC = () => {
  return (
    <div>
      <h2>Invite Reviewer</h2>
      {/* Placeholder for form: email */}
      <form>
        <label>
          Email: <input type="email" />
        </label>
        <button type="submit">Send Invitation</button>
      </form>
    </div>
  );
};

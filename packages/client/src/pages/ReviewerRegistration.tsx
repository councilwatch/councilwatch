// src/pages/ReviewerRegistration.tsx
import React from 'react';

const ReviewerRegistration: React.FC = () => {
  return (
    <div>
      <h2>Reviewer Registration</h2>
      {/* Placeholder for form: password (hashed), magic link token, email */}
      <form>
        <label>Password: <input type="password" /></label>
        <label>Email: <input type="email" /></label>
        {/* Magic link handling */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ReviewerRegistration;
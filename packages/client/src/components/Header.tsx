// src/components/Header.tsx
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header>
      <h1>CouncilWatch</h1>
      <nav>
        {/* Placeholder for navigation links */}
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/meetings">Meetings</a></li>
          <li><a href="/register">Register</a></li>
          {/* Add conditional links for logged-in users/reviewers */}
        </ul>
      </nav>
    </header>
  );
};

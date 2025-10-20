import './Header.scss';

import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="navbar">
      <img className="navbar__logo" src="/images/flock-surveillance-camera.png" alt="Flock Surveillance Camera" />
      <nav>
        {/* Placeholder for navigation links */}
        <ul className="navbar__links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/meetings">Meetings</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          {/* Add conditional links for logged-in users/reviewers */}
        </ul>
      </nav>
    </header>
  );
};

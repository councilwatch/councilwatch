import './Header.scss';

import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <img
          src="/images/flock-surveillance-camera-light.png"
          alt="Flock Surveillance Camera"
        />
        <div className="navbar__app-name">CouncilWatch</div>
      </div>
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

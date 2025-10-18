import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year
  return (
    <footer>
      <p>&copy; {currentYear} CouncilWatch. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
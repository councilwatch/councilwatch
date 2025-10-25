import './Footer.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year
  return (
    <footer className="footer">
      <p>&copy; {currentYear} CouncilWatch. All rights reserved.</p>
    </footer>
  );
};

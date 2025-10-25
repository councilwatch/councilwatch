import './Hero.scss';

import type { FC } from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaLabel?: string;
  ctaOnClick?: () => void;
}

export const Hero: FC<HeroProps> = ({ title, subtitle, backgroundImage, ctaLabel, ctaOnClick }) => (
  <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <h1 className="hero__title">{title}</h1>
    {subtitle && <p className="hero__subtitle">{subtitle}</p>}
    {ctaLabel && ctaOnClick && (
      <button className="hero__cta" type="button" onClick={ctaOnClick}>
        {ctaLabel}
      </button>
    )}
  </div>
);

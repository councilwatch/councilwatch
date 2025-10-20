import './CTA.scss';

import type { FC } from 'react';

interface CTAProps {
  title: string;
  subtitle?: string;
  blurb: string;
  buttonLabel: string;
  buttonOnClick: () => void;
}

export const CTA: FC<CTAProps> = ({ title, subtitle, blurb, buttonLabel, buttonOnClick }) => (
  <div className="cta">
    <h2 className="cta__title">{title}</h2>
    {subtitle && <h3 className="cta__subtitle">{subtitle}</h3>}
    <p className="cta__blurb">{blurb}</p>
    <button className="cta__button" type="button" onClick={buttonOnClick}>
      {buttonLabel}
    </button>
  </div>
);

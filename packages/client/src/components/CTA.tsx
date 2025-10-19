import type { FC } from 'react';

interface CTAProps {
  title: string;
  subtitle?: string;
  blurb: string;
  buttonLabel: string;
  buttonOnClick: () => void;
}

export const CTA: FC<CTAProps> = ({ title, subtitle, blurb, buttonLabel, buttonOnClick }) => (
  <section>
    <h2>{title}</h2>
    {subtitle && <h3>{subtitle}</h3>}
    <p>{blurb}</p>
    <button type="button" onClick={buttonOnClick}>
      {buttonLabel}
    </button>
  </section>
);

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaLabel?: string;
  ctaOnClick?: () => void;
}

export const Hero = ({ title, subtitle, backgroundImage, ctaLabel, ctaOnClick }: HeroProps) => (
  <section style={{ backgroundImage: `url(${backgroundImage})` }}>
    <h1>{title}</h1>
    {subtitle && <p>{subtitle}</p>}
    {ctaLabel && ctaOnClick && (
      <button type="button" onClick={ctaOnClick}>
        {ctaLabel}
      </button>
    )}
  </section>
);

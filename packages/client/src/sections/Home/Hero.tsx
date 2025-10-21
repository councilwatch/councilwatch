import type { FC } from 'react';
import { Hero } from '../../components/Hero/Hero';

interface HomeHeroProps {
  ctaFunc: () => void;
}

export const HomeHero: FC<HomeHeroProps> = ({ ctaFunc }) => {
  const heroProps = {
    title: 'Welcome to CouncilWatch',
    subtitle:
      'We believe city councils behave better under surveillance. Stay informed about local agenda items related to surveillance.',
    backgroundImage: '',
    ctaLabel: 'Learn More',
    ctaOnClick: ctaFunc,
  };

  return <Hero {...heroProps} />;
};

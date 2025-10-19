import { Hero } from '../../components/Hero';

export const HomeHero = () => {

    //
  const ctaFunc = () => {
    console.log('Onwards to action!');
  };

  const heroProps = {
    title: 'Welcome to CouncilWatch',
    subtitle:
      'We believe city councils behave better under surveillance. Stay informed about local agenda items related to surveillance.',
    backgroundImage: '',
    ctaLabel: 'CTA Redirect',
    ctaOnClick: ctaFunc,
  };

  return <Hero {...heroProps} />;
};

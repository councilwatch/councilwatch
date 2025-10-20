import { CTA } from '../../components/CTA/CTA';

export const HomeCTA = () => {
  const buttonFunc = () => {
    console.log('Rally the troops!');
  };

  const ctaProps = {
    title: `Your City Shouldn't Spy on You`,
    blurb: `
        Many municipalities are quietly adopting AI surveillance systems. 
        These technologies can track your movements, analyze behavior, and erode your basic 
        privacy rights. Communities need informed citizens to demand transparency and regulation before 
        these systems become permanent.
    `,
    buttonLabel: 'Join the fight!',
    buttonOnClick: buttonFunc,
  };

  return <CTA {...ctaProps} />;
};

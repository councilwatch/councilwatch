import { HomeCouncilMap } from '../sections/Home/CouncilMap';
import { HomeCTA } from '../sections/Home/CTA';
import { HomeFeed } from '../sections/Home/Feed';
import { HomeHero } from '../sections/Home/Hero';

export const Home = () => {
  return (
    <main>
      <HomeHero />
      <HomeCTA />
      <HomeCouncilMap />
      <HomeFeed />
    </main>
  );
};

import './Home.scss';

import { HomeCTA } from '../../sections/Home/CTA';
import { EventFinder } from '../../sections/Home/EventFinder/EventFinder';
import { HomeFeed } from '../../sections/Home/Feed/Feed';
import { HomeHero } from '../../sections/Home/Hero';
import { useRef } from 'react';

export const Home = () => {
  const ctaRef = useRef<HTMLElement>(null);

  const handleCTAScroll = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="home">
      <section>
        <HomeHero ctaFunc={handleCTAScroll} />
      </section>

      <section ref={ctaRef}>
        <HomeCTA />
      </section>

      <section>
        <EventFinder />
      </section>

      <section>
        <HomeFeed />
      </section>
    </main>
  );
};

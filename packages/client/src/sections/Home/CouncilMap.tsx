import { useState } from 'react';
import { CouncilMap } from '../../components/CouncilMap';
import { Feed } from '../../components/Feed';
import type { EventInfo } from '../../types';

export const HomeCouncilMap = () => {
  // useEffect will fetch events from database based on zipCode OR councilId
  // If councilId is set, use councilId, otherwise use zipCode for councils in area
  // Feed is currently conditionally rendered

  const [zipCode, setZipCode] = useState<string>('');
  const [councilId, setCouncilId] = useState<number | null>(null);
  const [eventList, setEventList] = useState<EventInfo[]>([]);

  return (
    <section>
      <h3>What's Happening Near You?</h3>
      
      <CouncilMap zipCode={zipCode} setCouncilId={setCouncilId} />

      {/* If eventList is empty and a zipCode or councilId is set, return No Events Found */}
      {eventList.length < 1 ? (
        <p>{zipCode || councilId ? 'No Events Found' : 'Find Events In Your Area'}</p>
      ) : (
        <Feed eventList={eventList} />
      )}
    </section>
  );
};

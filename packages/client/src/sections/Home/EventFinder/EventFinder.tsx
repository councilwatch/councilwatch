import './EventFinder.scss';

import { useState } from 'react';
import { CouncilMap } from '../../../components/CouncilMap/CouncilMap';
import { Feed } from '../../../components/Feed/Feed';
import type { EventInfo } from '../../../types';

export const EventFinder = () => {
  // useEffect will fetch events from database based on zipCode OR councilId
  // If councilId is set, use councilId, otherwise use zipCode for councils in area
  // Feed is currently conditionally rendered

  const [zipCode, setZipCode] = useState<string>('');
  const [councilId, setCouncilId] = useState<number | null>(null);
  const [eventList, setEventList] = useState<EventInfo[]>([]);

  return (
    <div className="event-finder">
      <h3 className="event-finder__title">What's Happening Near You?</h3>

      <div className="event-finder__module">
        <CouncilMap zipCode={zipCode} setCouncilId={setCouncilId} />

        <div className="event-finder__feed">
          {/* If eventList is empty and a zipCode or councilId is set, return No Events Found */}
          {eventList.length < 1 ? (
            <div className="event-finder__placeholder">
              {zipCode || councilId ? 'No Events Found' : 'Find Events In Your Area'}
            </div>
          ) : (
            <Feed eventList={eventList} />
          )}
        </div>
      </div>
    </div>
  );
};

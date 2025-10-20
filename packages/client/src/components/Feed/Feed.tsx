import './Feed.scss';

import type { FC } from 'react';
import type { EventInfo } from '../../types';

interface FeedProps {
  eventList: EventInfo[];
}

export const Feed: FC<FeedProps> = ({ eventList }) => (
  <div className="feed">
    {eventList.map((event) => {
      const { eventId, type, city, date } = event;

      return (
        <div key={eventId} className="feed__event">
          <div className="feed__event-header">
            <p className="feed__event-city">{city}</p>
            <span>|</span>
            <p className="feed__event-type">{type}</p>
          </div>
          <p className="feed__event-date">{date}</p>
          <a
            className="feed__event-link"
            href={`https://exampleurl.com/events?${eventId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
        </div>
      );
    })}
  </div>
);

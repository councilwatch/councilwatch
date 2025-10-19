import type { EventInfo } from '../types';

interface FeedProps {
  eventList: EventInfo[];
}

export const Feed = ({ eventList }: FeedProps) => {
  return (
    <div>
      {eventList.map((event) => {
        const { eventId, type, city, date } = event;

        return (
          <div key={eventId}>
            <span>{city}</span>
            <p>{type}</p>
            <p>{date}</p>
            <a href={`https://exampleurl.com/events?${eventId}`} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        );
      })}
    </div>
  );
};

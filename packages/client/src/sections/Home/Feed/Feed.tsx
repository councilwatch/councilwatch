import './Feed.scss';

import { Feed } from '../../../components/Feed/Feed';

export const HomeFeed = () => {
  const eventList = [
    {
      eventId: 0,
      councilId: 123456,
      type: 'Meeting',
      city: 'Austin',
      date: '2025-10-19',
    },
    {
      eventId: 1,
      councilId: 123456,
      type: 'Meeting',
      city: 'Austin',
      date: '2025-10-20',
    },
  ];

  return (
    <div className="home-feed">
      <Feed eventList={eventList} />
    </div>
  );
};

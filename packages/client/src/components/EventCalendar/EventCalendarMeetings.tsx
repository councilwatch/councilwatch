/** Renders the list of meetings in a calendar day */

import type { Meeting } from '../../types';

export interface EventCalendarMeetingsProps {
  meetings: Meeting[];
}
export const EventCalendarMeetings: React.FC<EventCalendarMeetingsProps> = ({ meetings }) => {
  return (
    <div className="event-calendar__date-events">
      {meetings.map((meeting) => {
        const { council, dateTime } = meeting;
        const time = dateTime.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        return (
          <div key={`${council}-${dateTime}`} className="event-calendar__date-event">
            <div className="event-calendar__date-event-title">{council}</div>
            <div className="event-calendar__date-event-time">{time}</div>
          </div>
        );
      })}
    </div>
  );
};
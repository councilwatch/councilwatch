/**
 * Renders a list of events in a popup that shows when clicking
 * on a date in the calendar.
 */

import React from 'react';

import type { Meeting } from '../../types';

export interface EventCalendarDateDetailsProps {
  meetings: Meeting[];
}
export const EventCalendarDateDetails: React.FC<EventCalendarDateDetailsProps> = ({ meetings }) => {

  const maxDisplayCount = 0;

  return (
    <div className="event-calendar__date-details">
      {meetings.length > 0
        ? meetings.map((meeting) => {
          const { council, dateTime, notes } = meeting;
          const time = dateTime.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          return (
            <a href="javascript:void(0)" key={`${council}-${dateTime}`} className="event-calendar__date-detail-event">
              <div className="event-calendar__date-detail-event-info">
                <div className="event-calendar__date-detail-event-title">{council}</div>
                <div className="event-calendar__date-detail-event-notes">{notes}</div>
                <div className="event-calendar__date-detail-event-time">{time}</div>
              </div>
              <div className="event-calendar__date-detail-event__view-more">
                View
              </div>
            </a>
          );
        })
        : <div className="event-calendar__date-details__no-results">
          No events found for the specified date.
        </div>
      }
      { meetings.length > maxDisplayCount
        ? <a href="javascript:void(0)" className="event-calendar__date-details__see-more">See more</a>
        : null
      }
    </div>
  );
};
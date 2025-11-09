/** Renders a single day in the calendar month */

import { monthNames } from './common';
import { EventCalendarMeetings } from './EventCalendarMeetings';
import type { Meeting } from '../../types';

export interface EventCalendarDateProps {
  year: number;
  setSelectedYear: (value: number) => void;
  month: number;
  setSelectedMonth: (value: number) => void;
  date: number;
  selectedDate: number;
  setSelectedDate: (value: number) => void;
  focusSelectedDate: (date: number, activatePopup?: boolean) => void;
  dayOfWeek: number;
  isEventPopupOpen: boolean;
  isToday: boolean;
  isOtherMonth: boolean;
  meetings: Meeting[];
}

export const EventCalendarDate: React.FC<EventCalendarDateProps> = ({
  year, setSelectedYear, month, setSelectedMonth, date, selectedDate, setSelectedDate,
  focusSelectedDate, dayOfWeek, isEventPopupOpen, isToday, isOtherMonth, meetings
}) => {

  function selectCalendarDate() {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDate(date);
    focusSelectedDate(date, true);
  }

  const isActiveDate = !isOtherMonth && selectedDate === date;

  const rootClassList = [
    'event-calendar__date',
    ...(isEventPopupOpen ? ['event-calendar__date--active']: []),
    ...(isOtherMonth ? ['event-calendar__date--inactive'] : []),
    ...(isToday ? ['event-calendar__date--today'] : []),
  ].join(' ');

  const now = new Date();
  const dateLocaleString = new Date(
    year, month, date, now.getHours(), now.getMinutes()
  ).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className={rootClassList}
      role="gridcell"
      tabIndex={isActiveDate ? 0 : -1}
      aria-colindex={dayOfWeek}
      onClick={selectCalendarDate}
    >
      <div className="event-calendar__date-day" aria-label={dateLocaleString}>
        <span className="event-calendar__date-month">{date === 1 ? monthNames[month] : ''}</span>
        {date}
      </div>
      {meetings.length > 0
        ? <EventCalendarMeetings meetings={meetings} />
        : <div className="event-calendar__no-events">No events</div>
      }
    </div>
  );
};

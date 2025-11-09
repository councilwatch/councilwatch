/** Renders the entire event calendar */

import './EventCalendar.scss';

import React, { useEffect, useRef, useState } from 'react';
import { monthNames, dayOfWeekNames, dayOfWeekNamesShort } from './common';
import { EventCalendarDate } from './EventCalendarDate';
import { EventCalendarDateDetails } from './EventCalendarDateDetails';
import { PopupDrawer } from '../PopupDrawer/PopupDrawer';

import type { Meeting } from '../../types';

// Data passed to a single square in the calendar grid
interface CalendarDate {
  year: number;
  month: number;
  date: number;
  meetings: Meeting[];
}

// This solely exists to retrieve meetings from a pre-sorted list more efficiently
interface GetMeetingsForDateFetchState {
  lastIndex: number;
}

/** Gathers a list of all meetings for a specific day of the month */
function getCalendarDate(
  year: number,
  month: number,
  date: number,
  allMeetings: Meeting[],
  fetchState: GetMeetingsForDateFetchState
): CalendarDate {
  const calendarDate: CalendarDate = {
    year,
    month,
    date,
    meetings: [],
  }
  let i = fetchState.lastIndex;
  for (; i < allMeetings.length; i++) {
    const meeting = allMeetings[i];
    const meetingYear = meeting.dateTime.getFullYear();
    const meetingMonth = meeting.dateTime.getMonth();
    const meetingDate = meeting.dateTime.getDate();
    if (
      meetingYear === year
      && meetingMonth === month
      && meetingDate === date
    ) {
      calendarDate.meetings.push(meeting);
    } else if (
      meetingYear > year
      || (
        meetingYear === year
        && meetingMonth > month
      )
      || (
        meetingYear === year
        && meetingMonth === month
        && meetingDate > date
      )
    ) {
      break;
    }
  }
  fetchState.lastIndex = i;
  return calendarDate;
}

/** Returns an array of dates that fill a 7x6 grid calendar month */
function getCalendarDatesForMonth(year: number, month: number, meetings: Meeting[]): CalendarDate[] {
  meetings.sort((a, b) => {
    return a.dateTime.getTime() < b.dateTime.getTime() ? -1 : 1;
  });

  const getMeetingsForDateFetchState: GetMeetingsForDateFetchState = {
    lastIndex: 0,
  };

  let calendarDates: CalendarDate[] = [];
  const firstOfCurrentMonth = new Date(year, month, 1);
  const firstOfCurrentMonthDay = firstOfCurrentMonth.getDay();
  const lastOfCurrentMonth = new Date(year, month + 1, 0);
  const lastOfCurrentMonthDate = lastOfCurrentMonth.getDate();

  // Generate days for previous month
  if (firstOfCurrentMonthDay > 0) {
    const lastOfPreviousMonth = new Date(year, month, 0);
    const lastOfPreviousMonthYear = lastOfPreviousMonth.getFullYear();
    const lastOfPreviousMonthMonth = lastOfPreviousMonth.getMonth();
    const lastOfPreviousMonthDate = lastOfPreviousMonth.getDate();

    for (let i = 1 - firstOfCurrentMonthDay; i <= 0; i++) {
      calendarDates.push(
        getCalendarDate(
          lastOfPreviousMonthYear,
          lastOfPreviousMonthMonth,
          lastOfPreviousMonthDate + i,
          meetings,
          getMeetingsForDateFetchState,
        )
      );
    }
  }

  // Generate days for current month
  for (let i = 1; i <= lastOfCurrentMonthDate; i++) {
    calendarDates.push(
      getCalendarDate(
        year,
        month,
        i,
        meetings,
        getMeetingsForDateFetchState,
      )
    );
  }

  // Generate days for next month
  const remainingDayCount = 7*6 - calendarDates.length;
  if (remainingDayCount > 0) {
    const firstOfNextMonth = new Date(year, month + 1, 1);
    const firstOfNextMonthYear = firstOfNextMonth.getFullYear();
    const firstOfNextMonthMonth = firstOfNextMonth.getMonth();
    for (let i = 0; i < remainingDayCount; i++) {
      calendarDates.push(
        getCalendarDate(
          firstOfNextMonthYear,
          firstOfNextMonthMonth,
          i + 1,
          meetings,
          getMeetingsForDateFetchState,
        )
      );
    }
  }

  return calendarDates;
}

export interface EventCalendarProps {
  meetings: Meeting[];
}
export const EventCalendar: React.FC<EventCalendarProps> = ({ meetings }) => {
  const today = new Date();

  // Date management

  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number>(today.getDate());

  const calendarDates = getCalendarDatesForMonth(selectedYear, selectedMonth, meetings ?? []);

  function changeMonth(iterator: number) {
    let newMonth = selectedMonth + iterator;
    let newYear = selectedYear;
    if (newMonth >= 12) {
      newMonth -= 12;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth += 12;
      newYear -= 1;
    }
    setSelectedYear(newYear);
    setSelectedMonth(newMonth);
    if (iterator > 0) {
      setSelectedDate(1);
    } else {
      setSelectedDate(new Date(newYear, newMonth + 1, 0).getDate());
    }
    setIsEventPopupOpen(false);
  }

  function moveSelectedDate(iterator: number) {
    let date = new Date(selectedYear, selectedMonth, selectedDate + iterator);
    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth());
    setSelectedDate(date.getDate());
    setIsEventPopupOpen(false);
  }

  function focusSelectedDate(date: number, activatePopup = false) {
    window.requestAnimationFrame(() => {
      if (!calendarRef.current) return;
      const dateGridCellNode = calendarRef.current.querySelector<HTMLDivElement>('.event-calendar__date[tabindex="0"]');
      if (!dateGridCellNode) return;
      dateGridCellNode.focus();

      // Show the event list popup after focus
      if (activatePopup) {
        setEventPopupDate(date);
        findAndSetEventPopupMeetings(date);
        if (eventPopupTarget !== dateGridCellNode || !isEventPopupOpen) {
          setIsEventPopupOpen(true);
          setEventPopupTarget(dateGridCellNode);
        } else {
          setIsEventPopupOpen(false);
        }
      }
    });
  }

  // Handle resize - swap breakpoints for mobile vs desktop functionality

  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calendarNode = calendarRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (calendarNode) {
      resizeObserver = new ResizeObserver(onCalendarResized);
      resizeObserver.observe(calendarNode);
      onCalendarResized();
    }
    return () => {
      if (calendarNode) {
        resizeObserver?.unobserve(calendarNode);
        resizeObserver = null;
      }
    };
  }, []);

  function onCalendarResized() {
    if (!calendarRef.current) return;
    const contentBoxWidth = calendarRef.current.getBoundingClientRect().width;
    if (contentBoxWidth < 700) {
      setBreakpoint('mobile');
    } else if (contentBoxWidth < 1000) {
      setBreakpoint('tablet');
    } else {
      setBreakpoint('desktop');
    }
  }

  // Keyboard controls, according to grid spec: https://www.w3.org/WAI/ARIA/apg/patterns/grid/

  async function onKeyDownCalendarGrid(event: React.KeyboardEvent<HTMLDivElement>) {
    let needsFocus = false;
    let needsActivation = false;
    switch (event.key) {
      case 'ArrowLeft':
        needsFocus = true;
        moveSelectedDate(-1);
        break;
      case 'ArrowRight':
        needsFocus = true;
        moveSelectedDate(1);
        break;
      case 'ArrowUp':
        needsFocus = true;
        moveSelectedDate(-7);
        break;
      case 'ArrowDown':
        needsFocus = true;
        moveSelectedDate(7);
        break;
      case 'Home':
        needsFocus = true;
        if (event.ctrlKey) {
          moveSelectedDate(
            1 - new Date(selectedYear, selectedMonth, selectedDate).getDate()
          );
        } else {
          moveSelectedDate(
            -new Date(selectedYear, selectedMonth, selectedDate).getDay()
          );
        }
        break;
      case 'End':
        needsFocus = true;
        if (event.ctrlKey) {
          moveSelectedDate(
            new Date(selectedYear, selectedMonth + 1, 0).getDate()
            - new Date(selectedYear, selectedMonth, selectedDate).getDate()
          );
        } else {
          moveSelectedDate(
            6 - new Date(selectedYear, selectedMonth, selectedDate).getDay()
          );
        }
        break;
      case 'PageUp':
        needsFocus = true;
        moveSelectedDate(
          1 - new Date(selectedYear, selectedMonth, selectedDate).getDate()
          - 1
        );
        break;
      case 'PageDown':
        needsFocus = true;
        moveSelectedDate(
          new Date(selectedYear, selectedMonth + 1, 0).getDate()
          - new Date(selectedYear, selectedMonth, selectedDate).getDate()
          + 1
        );
        break;
      case 'Enter': case ' ':
        needsFocus = true;
        needsActivation = true;
        break;
    }
    if (needsFocus) {
      event.preventDefault();
      focusSelectedDate(selectedDate, needsActivation);
    }
  }

  // Popup for expanded event list

  const [isEventPopupOpen, setIsEventPopupOpen] = useState<boolean>(false);
  const [eventPopupTarget, setEventPopupTarget] = useState<HTMLDivElement>();
  const [eventPopupDate, setEventPopupDate] = useState<number>();
  const [eventPopupMeetings, setEventPopupMeetings] = useState<Meeting[]>([]);

  const eventPopupDateLocaleString = new Date(
    selectedYear, selectedMonth, eventPopupDate, today.getHours(), today.getMinutes()
  ).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  function onCloseEventPopup() {
    setIsEventPopupOpen(false);
  }

  function findAndSetEventPopupMeetings(date: number) {
    setEventPopupMeetings(calendarDates.find((calendarDate) => {
      return (
        calendarDate.year === selectedYear
        && calendarDate.month === selectedMonth
        && calendarDate.date === date
      );
    })?.meetings ?? []);
  }

  // Template

  return (
    <div
      ref={calendarRef}
      className={"event-calendar event-calendar--" + breakpoint}
    >
      <div className="event-calendar__header">
        <h2>Event Calendar</h2>
        <div className="event-calendar__month-select">
          <button aria-label="Previous Month" onClick={() => changeMonth(-1)}></button>
          {monthNames[selectedMonth]} {selectedYear}
          <button aria-label="Next Month" onClick={() => changeMonth(1)}></button>
        </div>
      </div>
      <div role="grid" onKeyDown={onKeyDownCalendarGrid}>
        <div role="rowgroup">
          <div className="event-calendar__week-names" role="row">
            {[1,2,3,4,5,6,7].map((dayOfWeek) => {
              return (
                <div
                  key={dayOfWeek}
                  className="event-calendar__week-name"
                  role="columnheader"
                  aria-colindex={dayOfWeek}
                >
                  <div className="event-calendar__week-name__long">
                    {dayOfWeekNames[dayOfWeek - 1]}
                  </div>
                  <div className="event-calendar__week-name__short" aria-label={dayOfWeekNames[dayOfWeek - 1]}>
                    <span aria-hidden="true">{dayOfWeekNamesShort[dayOfWeek - 1]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="event-calendar__weeks" role="rowgroup">
          {Array.from({
            length: Math.ceil(calendarDates.length / 7)
          }, (_, i) => calendarDates.slice(i * 7, i * 7 + 7)).map((calendarWeek, weekIndex) => {
            return (
              <div key={weekIndex} className="event-calendar__week" role="row">
                {calendarWeek.map((calendarDate, dateIndex) => {
                  const { year, month, date, meetings } = calendarDate;
                  return (
                    <EventCalendarDate
                      key={`${year}-${month}-${date}`}
                      year={year}
                      setSelectedYear={setSelectedYear}
                      month={month}
                      setSelectedMonth={setSelectedMonth}
                      date={date}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      focusSelectedDate={focusSelectedDate}
                      dayOfWeek={dateIndex + 1}
                      isToday={year === today.getFullYear() && month === today.getMonth() && date === today.getDate()}
                      isEventPopupOpen={isEventPopupOpen && month === selectedMonth && date === eventPopupDate}
                      isOtherMonth={month !== selectedMonth}
                      meetings={meetings}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <PopupDrawer
        open={isEventPopupOpen}
        target={eventPopupTarget}
        onClose={onCloseEventPopup}
        dismissible={true}
        title={
          <h3>Events for {eventPopupDateLocaleString}</h3>
        }
        children={
          <EventCalendarDateDetails
            meetings={eventPopupMeetings}
          />
        }
      />
    </div>
  );
};

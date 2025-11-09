// src/pages/MeetingsInspect.tsx
import React from 'react';
import { EventCalendar } from '../components/EventCalendar/EventCalendar';

import type { Meeting } from '../types';

const sampleMeetings: Meeting[] = [
  {
    council: 'Council 1',
    address: '123 Main St',
    notes: 'These are some meeting notes, this section could get very long so it might be cut off.',
    dateTime: new Date(2025, 10, 4, 12),
    virtualMeetingLink: null,
    tags: [],
    lastMinuteAdjusted: false,
    attending: {
      yes: 0,
      no: 0,
      maybe: 0,
      'no response': 0,
    },
  },
  {
    council: 'Council 3',
    address: '123 Main St',
    notes: 'These are some meeting notes, this section could get very long so it might be cut off.',
    dateTime: new Date(2025, 10, 4, 16, 15),
    virtualMeetingLink: null,
    tags: [],
    lastMinuteAdjusted: false,
    attending: {
      yes: 0,
      no: 0,
      maybe: 0,
      'no response': 0,
    },
  },
  {
    council: 'Council 2',
    address: '123 Main St',
    notes: 'These are some meeting notes, this section could get very long so it might be cut off.',
    dateTime: new Date(2025, 10, 14, 15, 30),
    virtualMeetingLink: null,
    tags: [],
    lastMinuteAdjusted: false,
    attending: {
      yes: 0,
      no: 0,
      maybe: 0,
      'no response': 0,
    },
  },
  {
    council: 'Council 1',
    address: '123 Main St',
    notes: 'These are some meeting notes, this section could get very long so it might be cut off.',
    dateTime: new Date(2025, 10, 24, 7),
    virtualMeetingLink: null,
    tags: [],
    lastMinuteAdjusted: false,
    attending: {
      yes: 0,
      no: 0,
      maybe: 0,
      'no response': 0,
    },
  },
];

export const MeetingsInspect: React.FC = () => {
  return (
    <div style={{padding: '2rem'}}>
      <EventCalendar meetings={sampleMeetings} />
      {/* Filters, export .ics */}
    </div>
  );
};

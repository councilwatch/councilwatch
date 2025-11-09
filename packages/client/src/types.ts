// Quick example, NOT FINALIZED
export type EventInfo = {
  eventId: number;
  councilId: number;
  type: string;
  city: string;
  date: string;
};

export interface Meeting {
  council: string|null;
  address: string|{
    line1: string;
    line2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  notes: string;
  dateTime: Date;
  virtualMeetingLink: string|null;
  tags: string[];
  lastMinuteAdjusted: boolean;
  attending: {
    yes: number;
    no: number;
    maybe: number;
    'no response': number;
  };
};

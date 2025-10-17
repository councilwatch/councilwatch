# councilwatch
We believe city councils behave better under surveillance; figure out what yours is doing with regards to flock &amp; other AI surveillance

# FlockWatch: National Surveillance Proposal Alert System
## Project Requirements Document

### Summary
A web-based alert system that monitors 18,000+ US municipal government agendas for surveillance technology proposals (Flock, LiveView, etc.) & notifies local citizens when proposals appear in their area, enabling grassroots opposition at city council meetings.

---

## Overview

### Core Components

#### Data Source: Enterprise class, municipal city council agenda monitoring service. 

   I would prefer to pay for this to be done ***RIGHT*** by people who've already solved this problem. Exxon & other shit polluting companies must have some way to monitor when a podunk town is about to pass an ordinance that would make them pay for polluting water, air, etc. Large companies are always on top of this before anyone in the town even knows. ***THERE MUST BE A TOOL THAT DOES THIS - WE NEED TO FIGURE OUT WHAT IT IS!***

Creating & maintaining 18,000 scrapers is not something I want to be doing.

#### Web Application: User registration, moderation queue, & notification system

- People sign up
- People enter their email & zip code
- People enter what radius from their zip code they want to receive notifications for in miles.

**A calendar should show on the site that is populated with the 

3. **Database**: User data, approved proposals, & geographic information

- For users,
  - email address
  - zip code of user
  - miles radius user wants to receive notifications for
- For moderators
  - field for link to city council meeting document with agenda
  - field for plaintext notes for moderator to enter notes about it
  - field for date of city council hearing
  - field for address of city council building address for people to show up to. 
    - address
    - address 2
    - city
    - state
    - zip code
    - country
    

4. **Notification System**: Email alerts based on geographic proximity
  - postmark SMTP relay
  - broadcast stream, not transactional stream, so emails aren't flagged as spam
  - must get triggered by checks of database


5. **Public Interface**: Calendar & map of upcoming hearings

  - Should be pretty. 
  - Have calendar
  - have map
  - have page with good sales pitch on why you should care
  - have page that goes over what you should do(similar to canned response i've been spamming mackenzie with)
  - have page that goes over what arguments you can make

---

## Functional Requirements

### 1. Data Ingestion Layer
**Source:** Enterprise platform (e.g., Curate/FiscalNote or similar) that monitors 18,000+ municipalities

**Search Terms to Monitor:**
- Company names: "Flock", "Flock Safety", "LiveView Technologies", "LVT", "Vigilant Solutions"
- Technology terms: "ALPR", "automated license plate reader", "license plate reader"
- Procurement terms: "public safety technology", "surveillance contract", 

**Required API/Export Capabilities:**
- Daily data export or real-time API access
- Must include: City name, State, Meeting date, Agenda item text, Meeting URL/source
- Webhook or polling mechanism to retrieve new matches

### 2. User Management System

#### User Types

**A. Citizens (Basic Users)**
- Registration requires ONLY:
  - Email address
  - ZIP code
  - Notification radius (dropdown: 10, 25, 50, 100 miles)
- No password required (magic link authentication via email)
- Can update preferences or unsubscribe via email link

**B. Moderators (Vetted Volunteers)**
- Full authentication system
- Access to moderation queue
- Can approve/reject flagged items
- Can edit meeting details & add context

### 3. Moderation Workflow

**Queue Management:**
1. All items from data source enter "Pending Review" queue
2. Dashboard shows: City, State, Meeting Date, Flagged Text, Source URL
3. Moderators can:
   - **Approve**: Item is surveillance-related → moves to calendar/map
   - **Reject**: False positive → item archived
   - **Request More Info**: Flag for additional research

**Moderator Actions for Approved Items:**
- Confirm/edit meeting date & time
- Add meeting location/address
- Add virtual meeting link (if applicable)
- Add "call to action" notes (what citizens should say)
- Tag type of surveillance (Flock, LiveView, Other)

### 4. Public Calendar & Map Interface

**Calendar View:**
- Chronological list of upcoming meetings
- Filterable by state, distance from user location
- Shows: Date, Time, City, Type of surveillance proposed
- "Add to Calendar" button (Google/Apple/Outlook)

**Map View:**
- Interactive map with pins for upcoming hearings
- Color coding: Red (this week), Yellow (next 2 weeks), Green (future)
- Click pin for meeting details & directions
- Search by city or ZIP code

### 5. Notification System

**Trigger Logic:**
When moderator approves an item:
1. System calculates distance from meeting location to all user ZIP codes
2. Identifies users within their specified radius
3. Sends email notification within 1 hour

**Email Content:**
- Subject: "⚠️ Surveillance Camera Proposal Alert: [City Name]"
- Meeting date, time, location
- Type of surveillance proposed
- Link to online agenda
- Quick talking points for public comment
- "Click here to see on map" link
- Unsubscribe link

**Notification Rules:**
- Maximum 1 email per day per user (batch multiple alerts)
- Send notifications at least 48 hours before meeting (when possible)
- Reminder email 24 hours before meeting (optional user preference)

---

## Technical Specifications

### Database Schema (Simplified)

**users**
- id, email, zip_code, radius_miles, created_at, status

**moderators**
- id, email, password_hash, name, approved_by, created_at

**proposals**
- id, city, state, meeting_date, agenda_text, source_url, status, flagged_terms

**approved_meetings**
- id, proposal_id, meeting_location, meeting_time, virtual_link, action_notes, approved_by, approved_at

**notifications_sent**
- id, user_id, meeting_id, sent_at

### Security Requirements
- SSL/HTTPS for all connections
- Email validation on signup
- Rate limiting on signups (prevent spam)
- GDPR-compliant data handling
- Regular backups of user database
- Moderator actions logged for accountability

### Scalability Considerations
- Start with 100 cities for pilot
- Design database to handle 50,000+ users
- Implement caching for map/calendar data
- Use queue system for email sending

---

## Alternative Approaches If No Enterprise Platform Available
If Curate/similar is too expensive or unavailable:
1. Start with Legistar API (covers 7,000 cities) as proof of concept
2. Build scrapers for top 1,000 cities first
3. Add crowdsourcing featu

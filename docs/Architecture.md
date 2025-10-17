# CouncilWatch Architecture

This is a living document that outlines the architecture for CouncilWatch.

> [!WARNING]
> This document is a work in progress and is subject to change. Very little has been set in stone and pretty much everything is open for discussion.

## CDN

We will use [Cloudflare](https://www.cloudflare.com/) as our Content Delivery Network (CDN) to serve a cached version of our front end application and potentially API requests. This is to improve performance and reduce the load on our back end infrastructure.

## Back End Server

The various CouncilWatch back end components will be hosted on a yet to be determined VPS provider. The back end application will be built using [NestJS](https://nestjs.com/) and [TypeScript](https://www.typescriptlang.org/), which will expose a RESTful API for the front end to consume. The NestJS application will be responsible for:

### Application

- User authentication and authorization
- Data storage and retrieval
- Agenda item processing
- Cron tasks for periodic email notifications

### Web Server

[Nginx](https://nginx.org/) will be our web server of choice and it will be responsible for:

- Serving the front end React application
- Reverse proxying API requests to the NestJS back end
- Handling SSL termination

### Database

[PostgreSQL](https://www.postgresql.org/) will be used as the primary database for storing user data, and council agenda items. We will use TypeORM as the ORM for interacting with the PostgreSQL database.

## Front End Client

The front end application will be built using [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/). It will consume the RESTful API exposed by the NestJS back end to display data to the user. The front end will be responsible for:

- Providing a user interface for people to see what their city council is up to
- Allowing users to sign up for email notifications
- Providing resources for effectively communicating with their city council including, but not limited to:
  - Email templates
  - Curated arguments for or against common agenda items
  - Council contact information
- Providing moderators with an interface to review and approve agenda items before they are published

In order to optimize SEO, we are going to attempt to pre-render portions of the React application at compile time using [React Router](https://reactrouter.com/). This will give us the SEO benefits of static websites with none of the pain points of Server Side Rendering (SSR).

## Email Notifications

We will use [Postmark](https://postmarkapp.com/) as our email delivery service. The back end will be responsible for sending email notifications to users when new agenda items are available for their selected city council. We will use cron tasks to periodically check for new agenda items and send email notifications to users.

Postmark is currently working on a [Bulk Email](https://postmarkapp.com/developer/api/bulk-email) API which should make it easier to send large volumes of email in a single API request. Once this API is available, we will evaluate whether or not to use it for sending email notifications.

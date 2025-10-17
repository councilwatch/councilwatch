# CouncilWatch

We believe city councils behave better under surveillance; figure out what yours is doing today!

## About

CouncilWatch is an open-source platform that monitors and alerts people of agenda items being discussed by their local city councils. By providing transparency and insights into council decisions, we empower citizens to stay informed and engaged with their local government.

## Development

### Requirements

| Application | Version | Link                        |
| ----------- | ------- | --------------------------- |
| Node.js     | 22.x    | https://nodejs.org/         |
| PostgreSQL  | 18.x    | https://www.postgresql.org/ |

The recommended way to run PostgreSQL is via Docker. You can use the included `docker-compose.yml` file to get started quickly.

### Setup

First clone the repository and install dependencies:

```bash
git clone https://github.com/councilwatch/councilwatch.git
cd councilwatch
npm install
```

Next, you'll need to provide an environment file for the server to you. An example file is provided in `docs/.env.development.example`. Copy this file to `packages/server/.env.development` and modify the values as needed.

```bash
cp docs/.env.development.example packages/server/.env.development
```

### Running

```bash
# Start the database
docker compose -f docker-compose.yaml up -d

# Start the server
npm run start:server

# Start the client
npm run start:client
```

### Testing

Note that testing has not really been set up yet. These commands may fail.

```bash
# Test server
npm run test:server

# Test client
npm run test:client
```

### Building

```bash
# Build server
npm run build:server

# Build client
npm run build:client
```

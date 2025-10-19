# CouncilWatch

We believe city councils behave better under surveillance; figure out what yours is doing today!

## About

CouncilWatch is an open-source platform that monitors and alerts people of agenda items being discussed by their local city councils. By providing transparency and insights into council decisions, we empower citizens to stay informed and engaged with their local government.

## Development

> [!IMPORTANT]  
> Depending on your system. The docker commands below may instead be `docker-compose` (notice the hyphen). It also may require running as root (or with sudo)

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
# Start the database. This will return a string of numbers and letters
docker compose run --rm -d -p 5432:5432 database

# Start the server
npm run start:server

# Start the client
npm run start:client

# After running, stop the database
docker container stop <that string of numbers and letters>
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

## Running for Production with Docker

### Requirements
| Application                        | Link                                    |
| ---------------------------------- | --------------------------------------- |
| Docker                             | https://www.docker.com                  |
| Docker-Compose addon (if on linux) | https://docs.docker.com/compose/install |

### Running 

First, clone the repository
```bash
git clone https://github.com/councilwatch/councilwatch.git
cd councilwatch
```

Then, run docker compose
```bash
docker compose up -d
```

And the server should be accessible on port 8080

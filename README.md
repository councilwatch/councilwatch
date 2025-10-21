# CouncilWatch

We believe city councils behave better under surveillance; figure out what yours is doing today!

## About

CouncilWatch is an open-source platform that monitors and alerts people of agenda items being discussed by their local city councils. By providing transparency and insights into council decisions, we empower citizens to stay informed and engaged with their local government.

## Development

> [!IMPORTANT]  
> Depending on your system. The docker compose commands below may instead be `docker-compose` (notice the hyphen). It also may require running as root (or with sudo)

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

> [!IMPORTANT]  
> If changes have been made to the docker configuration (or if you are not sure). You should run the command to start the database
> with the extra argument `--build` to re-build the docker images


```bash
# Start the database.
docker compose --profile dev up -d

# Start the server
npm run start:server

# Start the client
npm run start:client

# When you're done, stop the database. Remember, changes to the development database WILL be lost
docker compose --profile dev down
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

Now, you'll need to set up the production environment file. Copy the file to the base (current) directory and modify any values as needed

```bash
cp docs/.env.production.example ./.env
```

> [!IMPORTANT]  
> If changes have been made to the docker configuration (or if you are not sure). You should run the below command
> with the extra argument `--build` to re-build the docker images

Then, run docker compose
```bash
docker compose --profile prod up -d
```

And the server should be accessible on port 8080

To stop the server:
```bash
docker compose --profile prod down
```

## Troubleshooting

### The server won't start in production mode. It says it can't connect to the database

The database configuration may have changed. To fix this, just delete the database volume. (It will automatically be re-created)

1. List all of your local volumes with `docker volume ls -q`. Find the councilwatch volume in this output. It should be something like `councilwatch_councilwatch_data`
2. Delete the volume with `docker volume rm <the volume name>`

If docker says the volume is in use, stop the running profile and try again.

### Docker says "no service selected"

You didn't specify a profile. For development, add `--profile dev` before "up" and for production, add `--profile prod`

### I get warnings about variables not being set

If you are in development mode, you can safely ignore these warnings.

You didn't copy the env file from `docs/.env.production.example` to `./.env`. Copy that and try again.
You might also have to delete the database volume


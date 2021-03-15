# Desafio Walmart Gabriel Bravo

## Install without Docker
> Follow this steps
1. Clone repository
``` shell
$ git clone "repository"
```

2. Install dependencies
``` shell
$ npm install
```

3. create the file .env with the value
REACT_APP_API_WALMART=http://localhost:3001

3. Start project
``` shell
$ npm start
```

## Install with Docker
> You have to install [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)

> Follow this steps
1. Clone repository
``` shell
$ git clone "repository"
```

2. Build docker
``` shell
$ docker-compose build
```

3. Start containers
``` shell
$ docker-compose up
```

The file docker-compose.yml rewrite the environment parameters
- REACT_APP_API_WALMART=http://localhost:8000


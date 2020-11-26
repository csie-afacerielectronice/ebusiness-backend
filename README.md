# ie-x-ebusiness-backend

## Requirements

* [Node.js](https://nodejs.org/en/)
* NPM
* Docker (optional)
* Docker Compose (optional)

## How to run

### Docker

#### Copy the example .env and config it

``` cp .env.example .env ```

### Commands

``` docker-compose up -d dev ``` spins up a development container, API accessible at http://localhost:3000

### Tests

``` docker-compose up test ``` spins up a testing container

### Local dev

#### Copy the example .env and config it

``` cp .env.example .env ```

#### Install dependencies

``` npm install ```

#### Migrate DB

``` npm run db:migrate ```

#### Run it in dev mode

``` npm run dev ```

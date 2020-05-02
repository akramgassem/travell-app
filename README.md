
# Travel Application

This project is under FEND Nanodegree Udacity 2020.

- Install packages and dependecies

````node
    npm install
````
- .env file is required to start server

````txt
    PIXA_KEY=your_pixa_key
    SKY_KEY=your_sky_key
    GEONAME_USERNAME=your_geoname_key
    WEATHERBIT_KEY=your_weatherbit_key
````

- Start server at 8081

````node
    npm start
````

- Fire webpack server for developpement

````node
    npm run build-dev
````

- Fire test with Jest and watch tests

````node
    npm test
````

- Build for production

````node
    npm run build-prod
````

- Scss using bulma framework
- Using moment Js for parsing date

## TO DO

- Server side:
  - \[x] Prepare API Geonames
  - \[x] Prepare Dark sky API
  - \[x] Prepare PIXABAY api
  - \[x] prepare Rest countries api
- Client side:
  - \[x] create a grid layout
  - \[x] name the app and pick a logo
  - \[x] form search for countries consuming countries API
  - \[x] pick a date for travel trip
  - \[x] add a todo list
  - \[x] create a card result for data with min max current temperture rate.
  - \[x] scroll to expanded element
  - [ ] figure out a solution for update card lists
  - [ ] add print feature to card
  - [ ] sorting card by date
  - [ ] show expired if date is less than date now.

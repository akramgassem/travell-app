
# Travel Application

This project is under FEND Nanodegree Udacity 2020.
- Scss using bulma framework
- Using moment Js for parsing date,
- Using Breakpoints to handle window resize.
- The user search for a destination by entering at least 4 letters into search bar, pick a date and submit for result.
    - search consume countries Api and Geonames api
    - weather result is due to darkSky api 
- Results are cards which user can add notes, PACKING note or LODGING info. 
    - CRUD call due to History api.


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
- and fire http-server

 ````node
    npm run http
````

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

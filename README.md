Working through a tutorial http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4

## Run local

1. Install [Node](http://nodejs.org/)
2. Clone this repository
3. cd path/to/rep
4. `npm install`
5. `node server.js`
6. Visit http://localhost:8080/api

## API endpoints

Download [Postman](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en) for Chrome, and then you can start hitting your local API.

### http://localhost:8080/api/bears/

GET a list of all of the bears in the MongoDB collection

POST creates a new bear if you pass a key of `name` in the message. (must be `x-www-form-urlencoded`)

### http://localhost:8080/api/bears/{{_id}}

GET all the keys about a single bear

PUT to change the name of a bear by passing the key of `name`

DELETE a single bear

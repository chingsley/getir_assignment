# getir Assignment

A RESTful API with a single endpoint that fetches the data in the provided MongoDB collection and return the results in the requested format.

## Deployments

- Heroku => [heroku link](https://kc-getir-assignment.herokuapp.com)

- Swagger Documentation => [Swagger doc link](https://kc-getir-assignment.herokuapp.com/api-docs)

- Published Postman Collection => [Published link](https://documenter.getpostman.com/view/5414525/TzCS56KZ)

## How to run the app locally:

Make sure you have NodeJS (_>8.12.0_), NPM (_>6.4.1_)

#### Clone the project repo and cd into it:

```bash
git clone https://github.com/chingsley/getir_assignment.git && cd getir_assignment
```

#### Install the project dependencies:

```bash
npm install
```

#### Setup required environmental variables

create a file named `.env`. Include in it the variable as exemplified in .env.sample file.

- PORT: choose a port on which to run the app
- NODE_ENV: set to `development`
- DATABASE_URL_DEV: set to the MongoDB connection string by getir

#### Start the app

```bash
npm start
```

## Testing via Postman: Checkout the endpoint below

| Endpoint         | Functionality   | Notes                                                  |
| ---------------- | --------------- | ------------------------------------------------------ |
| POST api/records | filter records. | required: startDate, endDate, minCount and maxCount... |
|                  |                 | passed as json in the request body                     |

### required Payload

- `POST /api/records`

```json
{
  "startDate": "date in the format YYYY-MM-DD [required]",
  "endDate": "date in the format YYYY-MM-DD [required]",
  "minCount": "a number [required]",
  "maxCount": "a number [required]"
}
```

## Running Tests locally:

#### Setup required environmental variables

DATABASE_URL_TEST=mongodb+srv://getir_assignment_tester:HrUHK4gA2hwVxrY7@cluster0.orvcd.mongodb.net/getir_assignment_test?retryWrites=true&w=majority

### Run the test with the command

```bash
npm test
```

### To see the coverage, use the command

```bash
npm run coverage
```

## Technologies Used

- [Node JS](https://nodejs.org/en/) (_v13.14.0_)
- [Expressjs](https://expressjs.com/)
- [Babel](https://babeljs.io/)
- [Jest](https://jestjs.io/docs/getting-started)
- [ESLint](https://eslint.org/)
- [mongoDB](https://www.mongodb.com/)

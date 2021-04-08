# Order API
## Introduction
Order API is an order management app with minimal functionality. It allows a user enter certin information and save to into the system

## Features
- Add to Order
- View All
- View One
- Update

## Installation and Setup
- Download and install the following if you don't have it installed aready.
   - [Node.js](https://nodejs.org/en/)
   - [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
   - [Postman](https://www.postman.com/)
- Clone this application using the command `git clone git@github.com:chibuezeayogu/order_api.git`
- Navigate to the application folder using `cd order_api/`
- Install Application Dependencies using `yarn install`
- Create `.env` file and copy content of `.env.sample` to it and provide the appropriate values specified.
- Run the application using `yarn run dev-server`

## App Features
- GET All Orders`/api/v1/orders`
- POST Order `/api/v1/orders`
- GET Order `/api/v1/orders/:id`
- PUT Order `/api/v1/orders/id`

- **NOTE** This can only be tested using Postman.

## Language
- JavaScript

## API Documentation
 - Coming soon 

## Technologies

`NodeJS:`is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.

`es6(ECMAScript 2015)`: es6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, etc.

`Express`: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

`Friebase`: Firebase provides the tools and infrastructure you need to develop your app, grow your user base, and earn money. The Firebase Admin Node.js SDK enables access to Firebase services from privileged environments (such as servers or cloud) in Node.js.

`Babel`: Babel is used to transpile es6 down to es5.

`Mocha`: Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha is the testing framework used to test the API's functionalities.

## Author
- Chibueze Ayogu

## License
- This project is authored by Ayogu Chibueze Nelson, and is licensed for use, distribution and modification under the [MIT](https://github.com/chibuezeayogu/order_api/blob/main/LICENSE) license

# courage-api

Node.js server for the Courage React App

## Technologies Used

* Web Server: `Node.js`
* Routing: `Express.js`
* Authentication: `Passport.js`
* Database: `MongoDB` & `Mongoose`

## Introduction

The Courage Node.js server serves as the API server for the Courage app. Beyond the `GET`'s and `POST`'s for the app, it also utilizes `Passport.js`
(local strategy) to handle both the signup and signin authentication. Passwords are salted before they are stored using the `bcrypt` library.


## API's

### Authentication
- **[<code>POST</code> signup]**
- **[<code>POST</code> signin]**


### Users
* **[<code>GET</code> users]**
* **[<code>GET</code> currentuser]**

### Entries
* **[<code>GET</code> entries]**
* **[<code>POST</code> entry]**
* **[<code>DELETE</code> entry]**

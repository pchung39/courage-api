# Get All Users

    GET users

## Description
Returns an array of all `users`.

***

## Requires authentication
* A valid JWT token must be present in the `authorizations` header.

***

## Parameters
- None. Just make sure that the user's JWT token is passed as `authorization` header.

***

## Return format
An [array] of users with the following keys and values:

- **id** — auto-generated string when document is created in MongoDB.
- **name** - user's name
- **email** - user's email
- **points** - user's calculated points
- **entries** - user's submitted entries:
  - **ask** - what did the user ask for?
  - **askee** - who did the user ask?
  - **outcome** - was the request accepted or rejected
  - **category** - group the ask into preset categories. 

***


## Example
**Request**

    https://courage-server.herokuapp.com/users/user

**Return** __shortened for example purpose__
``` json
{
  "user": "Bob"
}
```

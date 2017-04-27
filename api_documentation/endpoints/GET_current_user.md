# Get Current User

    GET users/user

## Description
Returns the `name` of the current authenticated user.

***

## Requires authentication
* A valid JWT token must be present in the `authorizations` header.

***

## Parameters
- None. Just make sure that the user's JWT token is passed as `authorization` header.

***

## Return format
A { key, value } pair denoting the currently authenticated user:

- **user** — string representing user's name.

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

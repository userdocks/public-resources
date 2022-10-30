---
id: delete-users-user-roles
title: DELETE /users/:userId/user-roles
description: DELETE /users/:userId/user-roles
slug: /api/rest/users/delete-users-user-roles
tags: [api, rest, user management, users, user roles]
---

> Note: The user needs permissions to remove user roles

This route will remove a user role from a user.


### Request

#### Base URL:

- `https://api.userdocks.com`

#### End Point:

- `/api/v1/users/:userId/user-roles`

##### Path Variables

- `:userId` (required)
  - if used with the `Authorization` header with an `access token` you can use the user connected with the `access token`

##### Query Parameters

None

#### HTTP Headers:

If used on the client:

| Property      | Type        | Required  | Access                 | Description |
| ------------- | ----------- | --------- | ---------------------- | ----------- |
| Authorization | `String` | `true` | **Only access to App** |             |

If used on the server:

> NOTE: Never use API Keys on the client

| Property       | Type        | Required  | Access                 | Description                   |
| -------------- | ----------- | --------- | ---------------------- | ----------------------------- |
| X-API-KEY      | `String` | `true` | **Only access to App** | Api key for the userdocks app |
| X-API-KEY-TYPE | `String` | `true` | **Only access to App** | `write`                        |
| X-CLIENT-ID    | `String` | `true` | **Only access to App** | `UUID` of the userdocks app   |

#### HTTP Body:

A JSON object.

```json
{
  "email": String,
  "userRoleId": String,
}
```

#### Response:

- `Object`

#### Example:

```js
try {
  // call userdocks user management API
  const response = await fetch('https://api.userdocks.com/api/v1/users/:userId/user-roles', {
    method: 'DELETE',
    headers: {
      // an access token can also be used
      // Authorization: `${token.type} ${token.accessToken}`,
      'X-API-KEY': String,
      'X-CLIENT-ID': String,
      'X-API-KEY-TYPE': 'write',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: String,
      userRoleId: String,
    })
  });
  const { data } = await response.json();

  // do something with the data
} catch (err) {
  console.error(err);
  // handle error
}
```

#### Successful Response:

Can have the following HTTP Status Codes:

- `200` - OK

```json
// DELETE /api/v1/users/:userId/user-roles
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null
}
```

#### Error Response:

Can have the following HTTP Status Codes:

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `500` - Internal Server Error

```json
// DELETE /api/v1/users/:userId/user-roles
{
  "success": Boolean,
  "error": String,
  "message": null,
  "data": null
}
```
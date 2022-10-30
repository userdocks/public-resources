---
id: put-tenant-stripe-subscriptions
title: PUT /tenants/:tenantId/stripe-subscriptions
description: PUT /tenants/:tenantId/stripe-subscriptions
slug: /api/rest/tenants/put-stripe-subcriptions
tags: [api, rest, user management, tenants, stripe, subscriptions]
---

> **_NOTE: You and your company are soley responsible for invoices for your users (customers), as well as all tax obligations that result in any country for you and your company. Use the stripe test API to check your invoices before going into production. E.g., if all necessary data is displayed, as well as if the correct tax is applied, and so on._**

This route upgrades or downgrades a running subscription of a tenant at the end of the current billing cycle.

### Request

#### Base URL:

- `https://api.userdocks.com`

#### End Point:

- `/api/v1/tenants/:tenantId/stripe-subscriptions`

##### Path Variables

- `:tenantId` (required) - ID of the tenant
  - if used with the `Authorization` header with an `access token` you can only get the tenant that is connected to the token

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
| X-API-KEY-TYPE | `String` | `true` | **Only access to App** | `read`                        |
| X-CLIENT-ID    | `String` | `true` | **Only access to App** | `UUID` of the userdocks app   |

#### HTTP Body:

A JSON object.

```json
{
  "price": String, // stripe price ID
  "taxRate": String, // stripe tax rate ID
  "quantity": Number,
  "test"?: Boolean, // if true uses the stripe test API
  "tenantId"?: String, // only if used with API key
  "userId"?: String, // only if used with API key
}
```

#### Response:

- `Object`

#### Example:

```js
try {
  // call userdocks user management API
  const response = await fetch('https://api.userdocks.com/api/v1/tenants/:tenantId/stripe-subscriptions', {
    method: 'PUT',
    headers: {
      // an access token can also be used
      // Authorization: `${token.type} ${token.accessToken}`,
      'X-API-KEY': String,
      'X-CLIENT-ID': String,
      'X-API-KEY-TYPE': 'write',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price: String,
      taxRate: String,
      quantity: Number,
      test?: Boolean,
      tenantId?: String, // only if used with API key
      userId?: String, // only if used with API key
    }),
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
// PUT /api/v1/tenants/:tenantId/stripe-subscriptions
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": null,
}
```

#### Error Response:

Can have the following HTTP Status Codes:

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `500` - Internal Server Error

```json
// PUT /api/v1/tenants/:tenantId/stripe-subscriptions
{
  "success": Boolean,
  "error": String,
  "message": null,
  "data": null
}
```
---
id: post-tenant-checkout-sessions
title: POST /tenants/:tenantId/checkout-sessions
description: POST /tenants/:tenantId/checkout-sessions
slug: /api/rest/checkout-sessions/post-tenant-checkout-sessions
tags: [api, rest, user management, tenant, stripe, checkout sessions, invoices, subscriptions, one-time payments]
---

### Request

> **_Note: You and your company are soley responsible for invoices for the users (customers), as well as all tax obligations that result in any country for you and your company. Use the stripe test API to check your invoices before going into production. E.g., if all necessary data is displayed, as well as if the correct tax is applied, and so on._**

This route will create a checkout-session for a tenant of an application.

Checkout sessions are used to collect payments from tenants.

E.g., to create a one-time payment or a subscription. It is also used for setting up a new payment method.

#### Request Method:

- `POST`

#### Base URL:

- `https://api.userdocks.com`

#### End Point:

- `/v1/tenants/:tenantId/checkout-sessions`

##### Path Variables:

| Variable | Type | Required | Description |
|---|---|---|---|
| :tenantId | `String` | `true` | the UUID of the tenant

##### Query Parameters:

None

#### HTTP Headers:

> Note: Never use API Keys on the client

Access from your server via API keys:

| Property       | Type        | Required  | Access                 | Description                   |
| -------------- | ----------- | --------- | ---------------------- | ----------------------------- |
| X-API-KEY      | `String` | `true` | **Only access to App** | Api key for the userdocks app |
| X-API-KEY-TYPE | `String` | `true` | **Only access to App** | `write`                       |
| X-CLIENT-ID    | `String` | `true` | **Only access to App** | `UUID` of the userdocks app   |

Access from the client via an access token:

| Property       | Type        | Required  | Access                 | Description                   |
| -------------- | ----------- | --------- | ---------------------- | ----------------------------- |
| Authorization  | `String` | `true` | **Only access to this tenant** | Access Token for userdocks tenant |

#### HTTP Body:

> Note: optional variables are marked with a `?` (questionmark) at the end. Do not include the questionmark in the request.

A JSON object.

```json
{
  "price": String, // stripe price id
  "taxRate": String, // stripe tax rate id
  "allowedCountry": String, // 2 character country code, e.g. US, GB, DE, AT, ...
  "paymentMethodType": String, // card, sepa, sofort
  "billingAddressCollection": Boolean,
  "mode": String, // payment, subscription, setup
  "quantity": Number,
  "isReverseCharge": Boolean,
  "state": String, // 64 character long random string
  "test?": Boolean, // true uses the stripe test api
}
```

#### Response:

- `Object`

#### Example:

```js
try {
  // call userdocks user management API
  const response = await fetch('https://api.userdocks.com/v1/tenants/:tenantId/checkout-sessions', {
    method: 'POST',
    headers: {
      // 'Authorization': String, // when accessed from the client e.g. `Bearer ${accessToken}`
      'X-API-KEY': String,
      'X-CLIENT-ID': String,
      'X-API-KEY-TYPE': 'write',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price: String, // stripe price id
      taxRate: String, // stripe tax rate id
      allowedCountry: String, // 2 character country code, e.g. US, GB, DE, AT, ...
      paymentMethodType: String, // card, sepa, sofort
      billingAddressCollection: Boolean,
      mode: String, // payment, subscription, setup
      quantity: Number,
      isReverseCharge: Boolean,
      test: Boolean, // if true uses the stripe test api
      state: String, // 64 character long random string
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
// POST /v1/tenants/:tenantId/checkout-sessions
{
  "success": Boolean,
  "message": String,
  "error": null,
  "data": {
    "kind": "checkoutSession",
    "id": String,
    "hash": String,
    "nextAction": {
      url: String, // the url to the payment page (you need to add the state as query parameter)
    }
  }
}
```

#### Error Response:

Can have the following HTTP Status Codes:

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `500` - Internal Server Error

```json
// POST /v1/tenants/:tenantId/checkout-sessions
{
  "success": Boolean,
  "error": String,
  "message": null,
  "data": null
}
```

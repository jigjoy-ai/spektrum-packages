# @jigjoy-io/serverless-core

Utility helpers that keep JigJoy's Lambda/Function-as-a-Service handlers consistent. The package provides reusable HTTP responses, centralized error classes, and AJV validation helpers so individual functions can stay lean.

## Installation

```sh
npm install @jigjoy-io/serverless-core
```

## What's Included

- `Responses` – canned JSON responses with proper CORS headers (`_200`, `_400`, `_500`, etc.).
- `errorHandler` – opinionated error mapper that turns thrown errors into API Gateway responses.
- `ValidationError` and `NotFoundError` – drop-in error types consumed by the handler.
- `schemaValidator` – AJV-powered validator with common formats enabled.

## Usage

```ts
import { Responses, errorHandler, schemaValidator, ValidationError } from "@jigjoy-io/serverless-core"

export const handler = async (event) => {
  try {
    schemaValidator(MyPayloadSchema, event.body)

    // your business logic here
    return Responses._200({ ok: true })
  } catch (error) {
    return errorHandler(error)
  }
}
```

For custom behaviors, extend the provided error classes or wrap the `Responses` helpers to add headers or logging.
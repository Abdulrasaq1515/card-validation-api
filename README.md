# Card Validation API

A REST API that validates card numbers using the Luhn algorithm and card network detection.

## Getting Started

```bash
npm install
npm run dev
```

The server starts on `http://localhost:3000`.

## Running Tests

```bash
npm test
```

## Endpoint

### POST /api/v1/cards/validate

Validates a card number and returns whether it is valid, along with the detected card network.

**Request**

```json
{
  "cardNumber": "4532015112830366"
}
```

`cardNumber` must be a string. Spaces and dashes are accepted and stripped before validation (e.g. `"4532-0151-1283-0366"` is treated the same as `"4532015112830366"`).

**Success Response — 200**

```json
{
  "valid": true,
  "cardNetwork": "Visa",
  "message": "Card number is valid"
}
```

**Invalid Card — 200**

The HTTP request succeeded. The card being invalid is a business result, not an HTTP error.

```json
{
  "valid": false,
  "cardNetwork": "Visa",
  "message": "Card number fails Luhn check"
}
```

**Bad Input — 400**

```json
{
  "error": "INVALID_INPUT",
  "message": "cardNumber is required"
}
```

## Supported Card Networks

| Network    | Prefixes              | Lengths     |
|------------|-----------------------|-------------|
| Visa       | 4                     | 13, 16, 19  |
| Mastercard | 51–55, 2221–2720      | 16          |
| Amex       | 34, 37                | 15          |
| Discover   | 6011, 65, 644–649     | 16, 19      |

## Design Decisions

**Why Express over NestJS?**
This is a single endpoint. NestJS adds significant boilerplate that would obscure rather than demonstrate code quality. Express keeps every line visible and intentional.

**Why validate card network in addition to Luhn?**
Luhn alone confirms a number is mathematically plausible — it does not confirm it could be a real card. A 20-digit number can pass Luhn, but no network issues 20-digit cards. Combining both checks reflects how real payment systems work.

**Why is `cardNumber` a string?**
JavaScript numbers lose precision beyond 15 significant digits. A 16-digit card number passed as a numeric type would be silently corrupted. Requiring a string is the only safe choice.

**Why does an invalid card return 200?**
The HTTP request was well-formed and processed successfully. Whether the card is valid is a business-level result, not an HTTP-level failure. 400 is reserved for malformed requests.

**Why sanitize spaces and dashes?**
Users commonly format card numbers with separators when typing. Rejecting `"4532-0151-1283-0366"` while accepting `"4532015112830366"` would be an unnecessary friction point with no security benefit.

## Project Structure

```
src/
  app.ts                  # Express app (no listen call — keeps tests clean)
  server.ts               # Entry point
  controllers/
    card.controller.ts    # HTTP layer only
  services/
    card.service.ts       # Orchestrates validation logic
  validators/
    luhn.ts               # Pure Luhn algorithm
    cardNetwork.ts        # Network prefix + length rules
  middleware/
    errorHandler.ts       # Global error handler
  types/
    card.types.ts         # Shared interfaces
tests/
  luhn.test.ts            # Unit tests for Luhn algorithm
  card.route.test.ts      # Integration tests for the endpoint
```

# PlantooZ Backend – Developer API Reference

This document is intended for **frontend developers** and **other backend developers** integrating with the PlantooZ backend.

Base URL (local):
```

[http://localhost:3000](http://localhost:3000)

````

All requests and responses use **JSON** unless stated otherwise.

---

## 1. Chat API

### POST `/chat`

Generates a nature-related response based on user input.

#### Request Body
```json
{
  "prompt_text": "How can tree planting help cities?",
  "chat_type": "text"
}
````

#### Validation (Zod)

* `prompt_text`

  * required
  * string
  * minimum length: 1
  * maximum length: 1000
* `chat_type`

  * required
  * enum: `"text"` (image support planned)

#### Success Response

```json
{
  "chat_type": "text",
  "response": "Tree planting in cities improves air quality..."
}
```

#### Error Responses

* `400 Bad Request` – validation failure
* `500 Internal Server Error` – AI service failure

---

## 2. Users API

### GET `/users`

Fetch all users.

#### Request

No body required.

#### Success Response

```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "John"
  }
]
```

---

### POST `/users`

Create a new user.

#### Request Body

```json
{
  "email": "user@example.com",
  "name": "John"
}
```

#### Validation (Zod)

* `email`

  * required
  * valid email format
* `name`

  * optional
  * string

#### Success Response

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John"
}
```

#### Error Responses

* `400 Bad Request` – validation failure
* `409 Conflict` – email already exists

---

## 3. Items API

### GET `/items`

Fetch all items.

#### Request

No body required.

#### Success Response

```json
[
  {
    "item_id": 1,
    "item_name": "Hat",
    "item_price": "200"
  }
]
```

> Note: `item_price` is returned as a string because it is stored as a Decimal.

---

### POST `/items`

Create a new item.

#### Request Body

```json
{
  "item_name": "Hat",
  "item_price": 200
}
```

#### Validation (Zod)

* `item_name`

  * required
  * string
  * minimum length: 1
* `item_price`

  * required
  * number (or numeric string)
  * must be positive

#### Success Response

```json
{
  "item_id": 1,
  "item_name": "Hat",
  "item_price": "200"
}
```

#### Error Responses

* `400 Bad Request` – validation failure
* `500 Internal Server Error` – database error

---

## Notes

* All POST requests **must include**:

  ```
  Content-Type: application/json
  ```
* Decimal values are returned as strings by Prisma.
* Chat responses are restricted to **nature, trees, environment, and conservation topics** by design.

---

```
```

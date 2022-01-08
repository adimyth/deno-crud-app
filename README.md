# Deno CRUD App
A sample CRUD application in Deno using OAK

> Storing entire data in-memory

## Structure
```bash
├── controllers
│   └── books.ts    # handles request
├── resources
│   ├── books.json  # contains 100 books data as JSON
│   └── slugify.js  # script to add slugs to books.json
├── routes
│   └── routes.ts   # contains routes for CRUD operation
├── server.ts   # creates & starts server
└── types
    └── books.ts    # defines "Book" interface
```

## Running the application
1. Install [deno](https://deno.land)
2. Install [denon](https://deno.land/x/denon) - alternative to node's nodemon
```bash
deno install -qAf --unstable https://raw.githubusercontent.com/nnmrts/denon/patch-4/denon.ts
```
3. Run the application
```bash
denon run --allow-read --allow-net server.ts
```
## CRUD
### Add a new book
#### Endpoint
```bash
localhost:8000/api/v1/books
```
#### Request Body
```json
{
  "author": "George R. R. Martin",
  "country": "USA",
  "imageLink": "images/game-of-thrones.jpg",
  "language": "English",
  "link": "https://en.wikipedia.org/wiki/A_Game_of_Thrones",
  "pages": 709,
  "title": "A game of Thrones",
  "year": 1996,
  "slug": "a-game-of-thrones"
}
```
#### API Call
```bash
curl --location --request POST 'localhost:8000/api/v1/books' \
--header 'Content-Type: application/json' \
--data-raw '{
    "author": "George R. R. Martin",
    "country": "USA",
    "imageLink": "images/game-of-thrones.jpg",
    "language": "English",
    "link": "https://en.wikipedia.org/wiki/A_Game_of_Thrones",
    "pages": 709,
    "title": "A game of Thrones",
    "year": 1996,
    "slug": "a-game-of-thrones"
}'
```

### Update a book
#### Endpoint
```bash
localhost:8000/api/v1/books/{id}
```
#### Request Body
```json
{
    "author": "Chinua Achebe",
    "country": "South Africa",
    "imageLink": "images/things-fall-apart.jpg",
    "language": "Afrikaans",
    "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
    "pages": 500,
    "title": "Things Fall Apart",
    "year": 2000,
    "slug": "things-fall-apart"
}
```
#### API Call
```bash
curl --location --request PUT 'localhost:8000/api/v1/books/0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "author": "Chinua Achebe",
    "country": "South Africa",
    "imageLink": "images/things-fall-apart.jpg",
    "language": "Afrikaans",
    "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
    "pages": 500,
    "title": "Things Fall Apart",
    "year": 2000,
    "slug": "things-fall-apart"
}'
```
### Get all books
#### Endpoint
```bash
localhost:8000/api/v1/books
```
#### API Call
```bash
curl --location --request GET 'localhost:8000/api/v1/books'
```
### Get book by id
#### Endpoint
```bash
localhost:8000/api/v1/books/{id}
```
#### API Call
```bash
curl --location --request GET 'localhost:8000/api/v1/books/0'
```
### Delete book by id
#### Endpoint
```bash
localhost:8000/api/v1/books/{id}
```
#### API Call
```bash
curl --location --request DELETE 'localhost:8000/api/v1/books/10'
```

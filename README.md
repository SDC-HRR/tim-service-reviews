# Reviews
This project is a re-engineering of the backend of an existing mircroservice to support data at web scale.

# CRUD Support
| Operation | HTTP | Endpoint | Description |
|-----------|------|--------------|-------------|
| **CREATE** | **POST** | /api/reviews/:id | adds new review for specified id |
| **READ** | **GET** | /api/reviews/:id | finds reviews at specified `id` |
| **UPDATE** | **PATCH** | /api/reviews/:id | updates existing review for `id` |
| **DELETE** | **DELETE** | /api/reviews/:id | deletes review at specified `id` and `user_id`|


## Front-End Authors
* **[FEC-Team Gandalf: ](https://github.com/Team-Gandalf)** [joshskkim](https://github.com/joshskkim)

## Getting Started
```sh
npm install -g webpack
npm install
```

## Running the tests
```sh
npm run test
```

# api-json-txt
A NestJS API with a .txt file as persistance storage.



## Installation

Node version used for this project: v20.11.0

Clone project with 
```bash
  git clone https://github.com/RenzoReccio/api-json-txt.git
```

Install project dependencies with npm

```bash
  cd api-json-txt
  npm i
```

Run project
```bash
  npm run start:dev
```

Open browser in this URL for swagger: http://localhost:3000/api
 
## API Reference

#### Get user

```http
  GET /user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `number` | **Required**. Index page starts on zero |
| `size` | `number` | **Required**. Size of the page |


#### Create user

```http
  POST /user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of user, needs to be unique  |
| `name`      | `string` | **Required**. Name of user, min length of 6 |
| `address`      | `string` | Address of User |



## Demo
![](https://github.com/RenzoReccio/api-json-txt/blob/main/demo.gif)

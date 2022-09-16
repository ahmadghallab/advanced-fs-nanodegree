# Image Processing API

It is just a super simple way to resize any image and get a friendly URL to display that newly resized image any place across the internet

## Request

```http
GET /api/images/?filename=image1&width=100&height=100
```

| Parameter  | Type     | Description                      |
| :--------- | :------- | :------------------------------- |
| `filename` | `string` | **Required**. original file name |
| `width`    | `string` | **Required**. required width     |
| `height`   | `string` | **Required**. required height    |

## Response

Just a resized image

## Status Codes

The API returns the following status codes:

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 201         | `CREATED`               |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |

# Books API Spec

## Data Structure

```json
{
  "id": "string",
  "name": "string",
  "year": "number",
  "author": "string",
  "summary": "string",
  "publisher": "string",
  "pageCount": "number",
  "readPage": "number",
  "finished": "boolean",
  "reading": "boolean",
  "insertedAt": "string",
  "updatedAt": "string",
},
```
Example : 

```json
{
  "id": "Qbax5Oy7L8WKf74l",
  "name": "Buku A",
  "year": 2010,
  "author": "John Doe",
  "summary": "Lorem ipsum dolor sit amet",
  "publisher": "Dicoding Indonesia",
  "pageCount": 100,
  "readPage": 25,
  "finished": false,
  "reading": false,
  "insertedAt": "2021-03-04T09:11:44.598Z",
  "updatedAt": "2021-03-04T09:11:44.598Z"
},
```
## Create Book

Endpoint : POST /books

Request Body :

```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}

```

Status Code : 201
Response Body (Success) :

```json
{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": "1L7ZtDUFeGs7VlEt"
    }
}
```

Status Code : 400
Response Body (Failed) : 

# Client tidak melampirkan properti namepada request body.
```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

# Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount.
```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```

## List Books

Endpoint : Get /books

Status Code : 200
Response Body (Success) :

```json
{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "K8DZbfI-t3LrY7lD",
                "name": "Buku C",
                "publisher": "Dicoding Indonesia"
            }
        ]
    }
}
```

Response Body (Failed) : 
```json
{
    "status": "success",
    "data": {
        "books": []
    }
}
```

## Get Book

Endpoint : Get /books/{bookId}

Status Code : 200
Response Body (Success) :

```json
{
    "status": "success",
    "data": {
        "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
        }
    }
}
```

Status Code : 404
Response Body (Failed) : 
```json
{
    "status": "fail",
    "message": "Buku tidak ditemukan"
}
```

## Update Book

Endpoint : PUT /books/{bookId}

Request Body :

```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

Response Body (Success) :

```json
{
  "status": "success",
  "message": "Buku berhasil diperbaharui"
}
```


# Client tidak melampirkan properti namepada request body.
Status Code : 400
Response Body (Failed) : 
```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

# Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount.
Status Code : 400
Response Body (Failed) : 
```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```

# Id yang dilampirkan oleh client tidak ditemukkan oleh server.
Status Code : 404
Response Body (Failed) : 
```json
{
    "status": "fail",
    "message": "Gagal memperbarui buku. Id tidak ditemukan"
}
```

## Delete Book

Endpoint : DELETE /books/{bookId}

Status Code : 200
Response Body (Success) :
```json
{
  "status": "success",
  "message": "Buku berhasil dihapus"
}
```

Status Code : 404
Response Body (Failed) : 
```json
{
  "status": "fail",
  "message": "Buku gagal dihapus. Id buku tidak ditemukan"
}
```

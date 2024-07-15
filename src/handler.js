const { nanoid } = require('nanoid');
const books = require('./books');

const addHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  const id = nanoid(16);
  
  const finished = pageCount === readPage ? true : false;

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if(!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400);
    return response
  }

  if(readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400);
    return response
  }

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  }

  books.push(newBook);

  const isSuccess = books.filter(book => book.id === id).length > 0;

  if(isSuccess){
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
}

const getAllHandler = (request) => {
  const { reading, finished, name } = request.query;

  let list = books;

  if(reading){
    list = books.filter(book => reading === 1 ? book.reading === true : book.reading === false )
  }
  
  if(finished){
    list = books.filter(book => finished === 1 ? book.finished === true : book.finished === false )
  }
  
  if(name){
    list = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()))
  }

  const bookList = list.map(({id, name, publisher}) => ({id, name, publisher}));

  return {
    status: 'success',
    data: {
        books: bookList,
    }
  } 
}

const getByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter(value => value.id === bookId)[0]

  if(book !== undefined){
    return {
      status: 'success',
      data: {
        book
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  })

  response.code(404);

  return response;
}

const editHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  const finished = pageCount === readPage ? true : false;

  const updatedAt = new Date().toISOString();

  if(!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400);
    return response
  }

  if(readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400);
    return response
  }

  const index = books.findIndex((book) => book.id === bookId)

  if(index){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404);
    return response
  }

  if (index !== -1 ){
    books[index] = {
      ...books[index],
      name, 
      year, 
      author, 
      summary, 
      publisher, 
      pageCount, 
      readPage, 
      finished, 
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    });
    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal diperbaharui'
  });
  response.code(404);
  return response;
}

const deleteHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId)

  if(index){
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404);
    return response
  }

  if(index !== -1){
    books.splice(index, 1)

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus'
  });
  response.code(404);
  return response;


}

module.exports = {
  addHandler,
  getAllHandler,
  getByIdHandler,
  editHandler,
  deleteHandler
}
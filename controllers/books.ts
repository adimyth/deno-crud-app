import { Book } from "../types/books.ts";

let data = JSON.parse(await Deno.readTextFile("resources/books.json"));
data = Object.assign({}, data);

// @desc    Get all books
// @route   GET /api/v1/books
const getBooks = ({ response }: { response: any }) => {
  try {
    response.body = {
      success: true,
      data: data,
    };
  } catch (err) {
    response.status = 500;
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

// @desc    Get single book
// @route   GET /api/v1/books/:id
const getBook = (
  { params, response }: { params: { id: string }; response: any },
) => {
  try {
    const result = data[params.id];
    if (!result) {
      response.status = 404;
      response.body = {
        success: false,
        msg: `No book with the id of ${params.id}`,
      };
      return;
    } else {
      response.body = {
        success: true,
        data: result,
      };
    }
  } catch (err) {
    response.status = 500;
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

// @desc    Add book
// @route   Post /api/v1/books
const addBook = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  const book = await body.value as Book;

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data provided",
    };
  } else {
    try {
      data[Object.keys(data).length] = book;
      response.status = 201;
      response.body = {
        success: true,
        data: book,
      };
    } catch (err) {
      response.status = 500;
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  }
};

// @desc    Update book
// @route   PUT /api/v1/books/:id
const updateBook = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  await getBook({ params: { "id": params.id }, response });

  if (response.status === 404) {
    response.body = {
      success: false,
      msg: response.body.msg,
    };
    response.status = 404;
    return;
  } else {
    const body = await request.body();
    const book: Book = await body.value as Book;

    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No data",
      };
    } else {
      try {
        data[params.id] = book;
        response.status = 200;
        response.body = {
          success: true,
          data: book,
        };
      } catch (err) {
        response.status = 500;
        response.body = {
          success: false,
          msg: err.toString(),
        };
      }
    }
  }
};

// @desc    Delete book
// @route   DELETE /api/v1/books/:id
const deleteBook = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  await getBook({ params: { "id": params.id }, response });

  if (response.status === 404) {
    response.body = {
      success: false,
      msg: response.body.msg,
    };
    response.status = 404;
    return;
  } else {
    try {
      delete data[params.id];
      response.body = {
        success: true,
        msg: "Book successfully deleted",
      };
      response.status = 204;
    } catch (err) {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Something went wrong",
      };
    }
  }
};

export { addBook, deleteBook, getBook, getBooks, updateBook };

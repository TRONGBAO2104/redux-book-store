import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../apiService";

const initialState = {
  isLoading: false,
  error: null,
  books: [],
  bookDetail: {},

  readingList: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getBooksListSuccess(state, action) {
      console.log("getBooksListSuccess", action.payload);
      state.isLoading = false;
      state.error = null;
      state.books = action.payload;
    },

    getBookDetailSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.bookDetail = action.payload;
    },

    addBookToReadingListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.readingList = state.readingList.concat(action.payload);
    },

    getBooksFromReadingListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.readingList = action.payload;
    },

    removeBookFromReadingListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export default bookSlice.reducer;

export const getBooksList =
  ({ query, pageNum = 10, limit = 10 }) =>
  async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
      let url = `/books?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
      const response = await apiService.get(url);
      console.log("getBooksList", response.data);
      dispatch(bookSlice.actions.getBooksListSuccess(response.data));
    } catch (error) {
      dispatch(bookSlice.actions.hasError());
    }
  };

export const getBookDetail =
  ({ bookId }) =>
  async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
      const response = await apiService.get(`/books/${bookId}`);
      console.log("getBookDetail", response.data);
      dispatch(bookSlice.actions.getBookDetailSuccess(response.data));
    } catch (error) {
      dispatch(bookSlice.actions.hasError());
      toast.error(error.message);
    }
  };

export const addBookToReadingList = (book) => async (dispatch) => {
  dispatch(bookSlice.actions.startLoading());
  try {
    const response = await apiService.post("/favorites", book);
    console.log("addBookToReadingList", response.data);
    dispatch(bookSlice.actions.addBookToReadingListSuccess(response.data));
    toast.success("The book has been added to the reading list!");
  } catch (error) {
    dispatch(bookSlice.actions.hasError());
    toast.error(error.message);
  }
};

export const getBooksFromReadingList = () => async (dispatch) => {
  dispatch(bookSlice.actions.startLoading());
  try {
    const response = await apiService.get("/favorites");
    // console.log("getBooksFromReadingList", response.data);
    dispatch(bookSlice.actions.getBooksFromReadingListSuccess(response.data));
  } catch (error) {
    dispatch(bookSlice.actions.hasError());
    toast.error(error.message);
  }
};

export const removeBookFromReadingList =
  ({ book }) =>
  async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
      // const x = book.map((book) => book.id);
      // console.log(x);
      const response = await apiService.delete(`/favorites/${book.id}`);
      console.log("removeBookFromReadingList", response.data);
      dispatch(
        bookSlice.actions.removeBookFromReadingListSuccess(response.data)
      );
      dispatch(getBooksFromReadingList());
    } catch (error) {
      dispatch(bookSlice.actions.hasError());
      toast.error(error.message);
    }
  };

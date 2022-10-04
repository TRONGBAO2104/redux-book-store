import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../apiService";
import { useDispatch } from "react-redux";

import { getBooksFromReadingList } from "../features/bookSlice";
import { removeBookFromReadingList } from "../features/bookSlice";
import { useSelector } from "react-redux";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const dispatch = useDispatch();
  const { isLoading, readingList } = useSelector((state) => state.book);
  console.log("readingList", readingList);

  // const books = readingList.map((book) => )
  // const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removedBookId, setRemovedBookId] = useState("");
  const navigate = useNavigate();

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const removeBook = (bookId) => {
    console.log("removeBook", bookId);
    dispatch(removeBookFromReadingList({ bookId }));
    // setRemovedBookId(bookId);
  };

  // useEffect(() => {
  //   if (!removedBookId) return;
  //   dispatch(removeBookFromReadingList({ removedBookId }));
  //   setRemovedBookId("");
  // }, [dispatch, removedBookId]);

  // useEffect(() => {
  //   if (removedBookId) return;
  //   dispatch(getBooksFromReadingList());
  //   console.log(removedBookId);
  // }, [dispatch, removedBookId]);

  // useEffect(() => {
  //   if (removedBookId) return;
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await api.get(`/favorites`);
  //       setBooks(res.data);
  //     } catch (error) {
  //       toast(error.message);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [removedBookId]);

  // useEffect(() => {
  //   if (!removedBookId) return;
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       await api.delete(`/favorites/${removedBookId}`);
  //       toast.success("The book has been removed");
  //       setRemovedBookId("");
  //     } catch (error) {
  //       toast(error.message);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [removedBookId]);

  useEffect(() => {
    dispatch(getBooksFromReadingList());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>
        Book Store
      </Typography>
      {isLoading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap={"wrap"}
        >
          {readingList.map((book) => (
            <Card
              key={book.book.id}
              sx={{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.book.imageLink}`}
                  alt={`${book.book?.title}`}
                  onClick={() => handleClickBook(book.book?.id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${book.book?.title}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {`${book.book?.author}`}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "secondary.light",
                      color: "secondary.contrastText",
                      padding: "0",
                      minWidth: "1.5rem",
                    }}
                    size="small"
                    onClick={() => removeBook(book.book?.id)}
                  >
                    &times;
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default ReadingPage;

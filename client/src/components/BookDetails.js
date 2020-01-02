import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Typography } from "@material-ui/core";
import { GET_BOOK } from "../queries";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(8),
    backgroundColor: theme.palette.background.paper
  }
}));

export default function BookDetails({ bookId }) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId }
  });

  return (
    <div className={classes.root}>
      <Typography component="p" variant="subtitle1">
        Book details goes here
      </Typography>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <h2>No Selected Book</h2>
      ) : (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>All books by this author</p>
          <ul>
            {data.book.author.books.map(book => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

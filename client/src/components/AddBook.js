import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../queries";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8)
  },
  textField: {
    marginBottom: theme.spacing(4)
  }
}));

const INIT_STATE = {
  name: "",
  genre: "",
  authorId: ""
};

export default function AddBook() {
  const classes = useStyles();
  const [state, setState] = useState(INIT_STATE);
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);
  if (error) return <p>Error...</p>;

  const handleChange = e => {
    e.persist();
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addBook({
      variables: {
        name: state.name,
        genre: state.genre,
        authorId: state.authorId
      },
      refetchQueries: [{ query: GET_BOOKS }]
    });
    setState(INIT_STATE);
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={state.name}
        onChange={handleChange}
        variant="outlined"
        multiline
        fullWidth
        className={classes.textField}
        InputProps={{
          name: "name"
        }}
      />
      <TextField
        label="Genre"
        value={state.genre}
        onChange={handleChange}
        variant="outlined"
        multiline
        fullWidth
        className={classes.textField}
        InputProps={{
          name: "genre"
        }}
      />

      <FormControl variant="outlined" className={classes.textField} fullWidth>
        <InputLabel id="author">Author</InputLabel>
        <Select
          labelId="author"
          id="author"
          name="authorId"
          value={state.authorId}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {loading ? (
            <MenuItem>Loading...</MenuItem>
          ) : (
            data.authors.map(({ name, age, id }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      <Fab
        color="primary"
        aria-label="add"
        type="submit"
        disabled={!(state.name && state.genre && state.authorId)}
      >
        <AddIcon />
      </Fab>
    </Paper>
  );
}

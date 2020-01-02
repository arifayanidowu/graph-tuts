import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKS } from "../queries";
import { makeStyles } from "@material-ui/styles";
import BookDetails from "./BookDetails";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),

    flexGrow: 1
  },
  flex: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  list: {
    backgroundColor: theme.palette.background.paper
  }
}));

export default function BookLists() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_BOOKS);

  const [selected, setSelected] = useState(null);

  if (error) {
    return <p>Failed to fetch data</p>;
  }

  const handleSelected = id => {
    setSelected(id);
  };

  return (
    <div className={classes.flex}>
      <div className={classes.root}>
        <Typography variant="subtitle1" component="p">
          Ninja's reading list
        </Typography>
        <List className={classes.list}>
          {loading ? (
            <ListItem>
              <ListItemText primary="Loading..." />
            </ListItem>
          ) : (
            data.books.map(({ id, name }) => (
              <ListItem key={id} onClick={() => handleSelected(id)} button>
                <ListItemText primary={name} />
              </ListItem>
            ))
          )}
        </List>
      </div>
      <BookDetails bookId={selected} />
    </div>
  );
}

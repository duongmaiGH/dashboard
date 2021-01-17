import React, { useRef, useState } from "react";
import { myFirebase } from "../../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid, IconButton, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 540,
  },
  button: {
    "marginLeft": "0%",
    "marginBottom": "15px",
    "marginTop": "0px"
  },
  btnText: {
    marginRight: 0,
  },
  btnThem: {
    marginTop: 8,
    marginRight: 0,
  },
  btnCloseIcon: {
    marginLeft: 15,
    marginTop: 10
  },
}));
export default function Form({ boardId, indexCard, indexList }) { // title
  const [ title, setTitle ] = useState("");
  const searchInput = useRef(null);
  const [ checkclick, setCheckclick ] = useState(false);
  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const createTodo = () => {
    const todoRef = myFirebase.database().ref("/board/" + boardId + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/");
    const todo = {
      title,
      complete: false,
    };
    todoRef.push(todo);

    setTitle("");
    searchInput.current.focus();
  };
  const classes = useStyles();
  return (
    <Grid style={ { width: 400 } }>
      {checkclick === false ? (
        <Button
          onFocus={ (ee) => setCheckclick(true) }
          variant="contained"
          color="primary"
          className={ classes.button }
          size="small"
        >
          Thêm mới công việc
        </Button>
      ) : (
          <>
            <Grid container>
              <Grid item md={ 12 } style={ { width: "150%" } }>
                <TextField
                  multiline
                  className={ classes.btnText }
                  style={ { width: "150%" } }
                  name="comment"
                  placeholder="Viết việc cần làm..."
                  onChange={ handleOnChange }
                  value={ title }
                  ref={ searchInput }
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item md={ 12 }>
                <Button
                  disabled={ title !== "" ? false : true }
                  variant="contained"
                  color="secondary"
                  onClick={ createTodo }
                  className={ classes.btnThem }
                  size="small"
                >
                  Thêm
          </Button>
                <Button
                  onClick={ createTodo }
                  onFocus={ () => setCheckclick(false) }
                  className={ classes.btnCloseIcon }
                >
                  Đóng
                </Button>
              </Grid>
            </Grid>
          </>
        ) }
    </Grid>
  );
}
//

import { Button, Checkbox, Grid, IconButton, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useState } from "react";
import { myFirebase } from "../../firebase/firebase";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";


export default function Todo({ todo, boardId, indexCard, indexList }) {
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    listcv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexFlow: "row wrap",
      marginTop: -18,
    },
    listcvs: {
      clear: "both",
      paddingLeft: "40px",
      position: "relative",
      borderRadius: "3px",
      transformOrigin: "left bottom",
      transitionProperty: "transform,opacity,height,padding,margin",
      transitionDuration: ".14s",
      transitionTimingFunction: "ease-in",
    },
    check: {
      borderRadius: "2px",
      height: "16px",
      width: "16px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      transition: "all .2s ease-in-out",
      backgroundColor: "#fafbfc",
      boxShadow: "inset 0 0 0 2px #dfe1e6",
      top: "5px",
      margin: "6px",
      textAlign: "center",
      cursor: "pointer",
      marginLeft: -38,
    },
    listitemcv: {
      minHeight: "20px",
      marginBottom: "0",
      alignSelf: "center",
      flex: "1",
      marginTop: -23,
    },
    button: {
      backgroundColor: "#e4f0f6",
      boxShadow: "none",
      border: "none",
      color: "#0079bf",
      outline: "0",
    },
    input: {
      "& label.Mui-focused": {
        color: "green"
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "green"
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white"
        },
        "&.Mui-focused fieldset": {
          borderColor: "green"
        }
      }
    }

  }));

  const [ titleEit, setTitleEit ] = useState(todo.title);
  const [ checkclick, setCheckclick ] = useState(false);
  const searchInput = useRef(null);

  const deleteTodo = () => {
    const todoRef = myFirebase.database().ref("/board/" + boardId + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/").child(todo.id);
    todoRef.remove();
  };

  const editTodo = () => {
    const todoRef = myFirebase.database().ref("/board/" + boardId + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/").child(todo.id);
    todoRef.update({
      title: titleEit,
    });
  };

  const completeTodo = (e) => {
    const todoRef = myFirebase.database().ref("/board/" + boardId + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/").child(todo.id);
    todoRef.update({
      complete: !todo.complete,
    });
  };

  const handleOnChange = (e) => {
    setTitleEit(e.target.value);
  };



  const classes = useStyles();

  function handleFocus() {
    setTimeout(function () {
      searchInput.current.focus();
    }, 150);
  }
  return (
    <>
      <div className={ classes.listcvs }>
        <div className={ classes.check } style={ { marginTop: 15 } }>
          <Checkbox
            style={ { marginLeft: "-13px", marginTop: "-13px" } }
            onClick={ completeTodo }
            checked={ todo.complete }
          />
        </div>
        <div>
          <div className={ classes.listitemcv }>
            { checkclick === false ? (
              <>
                <Grid container style={ { width: '170%' } }>
                  <Grid item md={ 12 }>
                    <TextField
                      multiline
                      style={ { width: "100%" } }
                      placeholder="Viết việc cần làm..."
                      variant="outlined"
                      size="small"
                      className={ todo.complete ? "complete" : "" }
                      onMouseDown={ handleFocus }
                      onFocus={ (ee) => setCheckclick(true) }
                      defaultValue={ todo.title }
                      className={ classes.input }
                    />
                  </Grid>

                </Grid>
              </>
            ) : (
                <form >
                  {/* onBlur={() => setCheckclick(false)} */ }
                  <Grid container style={ { width: '170%' } }>
                    <Grid item md={ 12 } style={ { width: '100%' } }>
                      <TextField
                        multiline
                        style={ { width: '100%' } }
                        variant="outlined"
                        ref={ searchInput }
                        type="string"
                        onChange={ handleOnChange }
                        value={ titleEit }
                      />
                    </Grid>
                    <Grid container>
                      <Grid item md={ 8 }>
                        <Button
                          disabled={ titleEit !== "" ? false : true }
                          variant="contained"
                          color="secondary"
                          onMouseDown={ editTodo }
                          onFocus={ () => setCheckclick(false) }
                          className={ classes.btnThem }
                          size="small"
                        >
                          Lưu
                </Button>
                        <Button>
                          <IconButton
                            onFocus={ () => setCheckclick(false) }
                            className={ classes.btnCloseIcon }
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Button>
                      </Grid>
                      <Grid item md={ 4 } >
                        <IconButton
                          style={ { float: 'right' } }
                          onClick={ deleteTodo }
                          className={ classes.btnCloseIcon }
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              ) }
          </div>
        </div>
      </div>
    </>
  );
}

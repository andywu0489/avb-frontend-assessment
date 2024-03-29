import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button } from "@material-ui/core";
import {
  closeCommentsModal,
  getViewCommentsModalOpen,
} from "store/slices/view";
import { setComment } from "store/slices/comments";
import { resetCurrentPage } from "store/slices/pagination";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  commentForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceAround",
  },
  formContainer: {
    backgroundColor: "white",
    width: "30vw",
    minWidth: "250px",
    height: "auto",
    padding: "0 20px 20px 20px",
    border: "7px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "4px",
  },
  textField: {
    marginBottom: "20px",
  },
  requiredMessage: {
    fontSize: "12px",
  },
  header: {
    color: theme.palette.primary.main,
  },
}));

const CommentModal = () => {
  const [commentForm, setCommentForm] = useState({
    name: "",
    body: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector(getViewCommentsModalOpen);

  const resetCommentForm = {
    name: "",
    body: "",
  };

  //Reset comment form before closing modal
  const handleClose = () => {
    setCommentForm(resetCommentForm);
    dispatch(closeCommentsModal());
  };

  //Make POST request and add reponse data to redux store's comment list to reflect database comment list
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetCurrentPage());
    dispatch(setComment(commentForm));
    handleClose();
  };

  //Alter comment form state depending on form field being used
  const handleChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value.trimStart(),
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.formContainer}>
        <h3 className={classes.header}>Add Comments</h3>
        <p className={classes.requiredMessage}>* = required field</p>
        <form className={classes.commentForm} onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            name="name"
            label="Name"
            variant="outlined"
            value={commentForm.name}
            required
            onChange={handleChange}
          />
          <TextField
            className={classes.textField}
            name="body"
            label="Comment"
            multiline
            rows={3}
            variant="outlined"
            value={commentForm.body}
            required
            onChange={handleChange}
          />
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CommentModal;

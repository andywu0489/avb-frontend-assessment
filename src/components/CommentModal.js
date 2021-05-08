import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button } from "@material-ui/core";
import {
  closeCommentsModal,
  getViewCommentsModalOpen,
} from "store/slices/view";
import { addComment } from "store/slices/comments";

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
    width: "50vw",
    height: "auto",
    padding: "0 20px 20px 20px",
    borderRadius: "4px",
  },
  textField: {
    marginBottom: "20px",
  },
  requiredMessage: {
    fontSize: "12px",
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

  const comments = useSelector((state) => state.comments);
  console.log("aaa", comments);

  const handleClose = () => dispatch(closeCommentsModal());

  const resetCommentForm = {
    name: "",
    body: "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(commentForm));
    setCommentForm(resetCommentForm);
    handleClose();
  };

  const handleChange = (e) => {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value });
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
        <h3>Add Comments</h3>
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
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CommentModal;

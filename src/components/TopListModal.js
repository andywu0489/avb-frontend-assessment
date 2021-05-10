import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ListComponent from "components/List";

import { closeTopListModal, getViewTopListModalOpen } from "store/slices/view";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "white",
    width: "30vw",
    height: "auto",
    padding: "0 20px 20px 20px",
    borderRadius: "4px",
    minWidth: "400px",
    border: "7px solid",
    borderColor: theme.palette.primary.main,
  },
  title: {
    display: "flex",
    justifyContent: "center",
  },
}));

const TopListModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isOpen = useSelector(getViewTopListModalOpen);

  const handleClose = () => dispatch(closeTopListModal());

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.formContainer}>
        <ListComponent topThreeList={true} />
      </div>
    </Modal>
  );
};

export default TopListModal;

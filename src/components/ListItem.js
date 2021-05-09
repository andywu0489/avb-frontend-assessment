import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItemText: {
    overflowWrap: "break-word",
  },
}));

const ListItemComponent = (props) => {
  const classes = useStyles();
  const { comment, user, topThreeList } = props;

  const initials = (name) => {
    const splitName = name.split(" ");
    const initialArr = [];
    initialArr.push(splitName[0].split("")[0]);
    if (splitName.length > 1) {
      initialArr.push(splitName[splitName.length - 1].split("")[0]);
    }
    return initialArr.join("");
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>
          {topThreeList ? initials(user.name) : initials(comment.name)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.listItemText}
        primary={topThreeList ? user.name : comment.name}
        secondary={
          topThreeList
            ? `# of Comments ${user.count}`
            : comment.comment || comment.body
        }
      />
    </ListItem>
  );
};

export default ListItemComponent;

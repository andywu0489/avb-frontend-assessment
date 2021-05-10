import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  commentListItemText: {
    overflowWrap: "break-word",
  },
  topThreeListItem: {
    width: "100%",
  },
  topThreeListItemText: {
    textOverflow: "ellipsis",
    whiteSpace: "noWrap",
    overflow: "hidden",
  },
  ellipse: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const ListItemComponent = (props) => {
  const classes = useStyles();
  const { comment, user, topThreeList } = props;

  const initials = (name) => {
    const splitName = name.split(" ");
    const initialArr = [];
    initialArr.push(splitName[0].split("")[0].toUpperCase());
    if (splitName.length > 1) {
      initialArr.push(
        splitName[splitName.length - 1].split("")[0].toUpperCase()
      );
    }
    return initialArr.join("");
  };

  return (
    <ListItem
      alignItems="flex-start"
      className={topThreeList ? classes.topThreeListItem : ""}
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          {topThreeList ? initials(user.name) : initials(comment.name)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={
          topThreeList
            ? classes.topThreeListItemText
            : classes.commentListItemText
        }
        primary={
          topThreeList ? (
            <Typography className={classes.ellipse}>{user.name}</Typography>
          ) : (
            comment.name
          )
        }
        secondary={
          topThreeList
            ? `# of Comments: ${user.count}`
            : comment.comment || comment.body
        }
      />
    </ListItem>
  );
};

export default ListItemComponent;

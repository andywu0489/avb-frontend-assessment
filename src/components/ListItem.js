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
  const { name, body, user, topThreeList } = props;

  //Grabs initials from first and last words from name string
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

  //Returns top commentor list or comment depending on if component is passed topThreeList flag.
  return (
    <ListItem
      alignItems="flex-start"
      className={topThreeList ? classes.topThreeListItem : ""}
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          {topThreeList ? initials(user.name) : initials(name)}
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
            name
          )
        }
        secondary={topThreeList ? `# of Comments: ${user.count}` : body}
      />
    </ListItem>
  );
};

export default ListItemComponent;

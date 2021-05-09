import React from "react";
import { useSelector, useDispatch, useEffect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import ListItemComponent from "components/ListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "50ch",
  },
  commentListContainer: {
    display: "flex",
    justifyContent: "center",
  },
  message: {
    display: "flex",
    justifyContent: "center",
  },
  topThreeList: {
    display: "flex",
    flexDirection: "row",
    maxWith: "10ch",
  },
}));

const ListComponent = (props) => {
  const { topThreeList } = props;
  const classes = useStyles();
  const comments = useSelector((state) => state.comments.comments);

  const userCommentCount = {};
  const arr = [];
  let topThree;

  if (topThreeList) {
    comments.forEach((comment) => {
      if (comment.name in userCommentCount) {
        userCommentCount[comment.name]++;
      } else {
        userCommentCount[comment.name] = 1;
      }
    });

    for (const count in userCommentCount) {
      arr.push({
        name: count,
        count: userCommentCount[count],
      });
    }

    arr.sort((a, b) => {
      return b.count - a.count;
    });

    topThree = arr.slice(0, 3);
  }

  const sortedComments = [...comments].sort((a, b) => {
    return b.id - a.id;
  });

  return (
    <div className={classes.commentListContainer}>
      <List className={topThreeList ? classes.topThreeList : classes.root}>
        {topThreeList ? (
          topThree.map((user) => {
            return (
              <ListItemComponent
                topThreeList={topThreeList}
                user={user}
                key={user.name}
              />
            );
          })
        ) : comments.length ? (
          sortedComments.map((comment) => {
            return <ListItemComponent key={comment.id} comment={comment} />;
          })
        ) : (
          <p className={classes.message}>Nothing to See Here :(</p>
        )}
      </List>
    </div>
  );
};

export default ListComponent;

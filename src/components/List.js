import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import ListItemComponent from "components/ListItem";
import _ from "lodash";
import { setComments } from "store/slices/comments";
import { getComments } from "store/api";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "50ch",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    display: "flex",
    justifyContent: "center",
    color: theme.palette.primary.main,
  },
  topThreeList: {
    display: "flex",
    flexDirection: "column",
  },
  pagination: {
    marginBottom: "20px",
  },
}));

const ListComponent = (props) => {
  const { topThreeList } = props;
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  const getCommentsList = async () => {
    const response = await getComments();
    try {
      dispatch(setComments(response));
    } catch {
      console.log("Failed to GET comments");
    }
  };

  useEffect(() => {
    !topThreeList && getCommentsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calcTopThree = () => {
    const userCommentCount = {};
    const arr = [];
    let topThree;
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

    return topThree;
  };

  const sortedComments = [...comments].sort((a, b) => {
    return b.id - a.id;
  });

  const chunkedSortedComments = _.chunk(sortedComments, 10);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const currentPageComments = chunkedSortedComments[page - 1];

  return (
    <div className={classes.listContainer}>
      <List className={topThreeList ? classes.topThreeList : classes.root}>
        <h3 className={classes.message}>
          {topThreeList ? "Top 3 Commentors:" : "Comments:"}
        </h3>
        {topThreeList ? (
          calcTopThree().map((user) => {
            return (
              <ListItemComponent
                topThreeList={topThreeList}
                user={user}
                key={user.name}
              />
            );
          })
        ) : comments.length ? (
          currentPageComments.map((comment) => {
            return <ListItemComponent key={comment.id} comment={comment} />;
          })
        ) : (
          <p className={classes.message}>Loading...</p>
        )}
      </List>
      {!topThreeList && comments.length > 0 && (
        <Pagination
          className={classes.pagination}
          count={chunkedSortedComments.length || 1}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      )}
    </div>
  );
};

export default ListComponent;

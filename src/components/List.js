import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import ListItemComponent from "components/ListItem";
import _ from "lodash";
import { setComments } from "store/slices/comments";
import { getComments } from "store/api";
import { setCurrentPage } from "store/slices/pagination";

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
  const classes = useStyles();
  const page = useSelector((state) => state.pagination.page);
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  //Make GET request for comments and adds to redux store
  const getCommentsList = async () => {
    const response = await getComments();
    try {
      dispatch(setComments(response));
    } catch {
      console.log("Failed to GET comments");
    }
  };

  //Make GET request when component mounts
  useEffect(() => {
    !topThreeList && getCommentsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Find the top the commentor
  const calcTopThree = () => {
    const userCommentCount = {};
    const usersArr = [];
    let topThree;

    //Sum unique users' comments
    comments.forEach((comment) => {
      if (comment.name in userCommentCount) {
        userCommentCount[comment.name]++;
      } else {
        userCommentCount[comment.name] = 1;
      }
    });

    //Adds object with user name and comment count to userArr
    for (const count in userCommentCount) {
      usersArr.push({
        name: count,
        count: userCommentCount[count],
      });
    }

    //Sort userArr in decending order depending on comment count
    usersArr.sort((a, b) => {
      return b.count - a.count;
    });

    //Grabs the top three users with highest comment counts
    topThree = usersArr.slice(0, 3);

    return topThree;
  };

  //Sorts comments list newest to oldest by sorting by id
  const sortedComments = [...comments].sort((a, b) => {
    return b.id - a.id;
  });

  //Breaks up sorted comments into sub arrays of length 10
  const chunkedSortedComments = _.chunk(sortedComments, 10);

  //Keeps track of what page user is on for pagination
  const handleChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  //Use page number to select array of comments to be displayed
  const currentPageComments = chunkedSortedComments[page - 1];

  //Returns top three commentors list or comments list depending on if component is passed topThreeList flag.
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

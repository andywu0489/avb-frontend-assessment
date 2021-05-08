import React from "react";
import { useSelector, useDispatch, useEffect } from "react-redux";

const CommentList = () => {
  const comments = useSelector((state) => state.comments.comments);
  console.log("XXX", comments);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div>
            <p>Name: {comment.name}</p>
            <p>Comment: {comment.comment || comment.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;

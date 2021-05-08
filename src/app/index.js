import React from "react";
import "app/App.css";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import CommentList from "components/CommentList";

function App() {
  return (
    <>
      <Header />
      <CommentModal />
      <CommentList />
    </>
  );
}

export default App;

import React from "react";
import "app/App.css";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import ListComponent from "components/List";

function App() {
  return (
    <>
      <Header />
      <CommentModal />
      <ListComponent topThreeList={true} />
      <ListComponent />
    </>
  );
}

export default App;

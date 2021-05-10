import React from "react";
import "app/App.css";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import ListComponent from "components/List";
import TopListModal from "components/TopListModal";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import deepPurple from "@material-ui/core/colors/deepPurple";
import pink from "@material-ui/core/colors/pink";

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: pink,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <CommentModal />
      <TopListModal />
      <ListComponent />
    </ThemeProvider>
  );
}

export default App;

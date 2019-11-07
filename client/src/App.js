import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Notes from "./components/Notes/Notes";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Notes} />
      <Route path="/notes/" component={Notes} />
      <Route path="/notes/new" component={Notes} />
      {/* <Route path="/notes/:id" component={DisplayNote} /> */}
    </Router>
  );
}

export default App;

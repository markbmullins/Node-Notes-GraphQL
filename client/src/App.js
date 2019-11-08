import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Notes from "./components/Notes/Notes";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Notes} />
      <Route path="/notes/" component={Notes} />
    </Router>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";

import ArticleList from "./components/articles/ArticleList";
import ArticleInfo from "./components/articles/ArticleInfo";
import ArticleAdd from "./components/articles/ArticleAdd";
import ArticleEdit from "./components/articles/ArticleEdit";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="container">
          <Main />
        </div>
      </Router>
    </div>
  );
};

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Articles
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/articles/new" element={<ArticleAdd />} />
      <Route path="/articles/:_id" element={<ArticleInfo />} />
      <Route path="/articles/:_id/edit" element={<ArticleEdit />} />
    </Routes>
  );
};

export default App;

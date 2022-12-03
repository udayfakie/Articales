import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  useEffect(function () {
    async function getArticles() {
      try {
        const response = await axios.get("/api/articles");
        setArticles(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getArticles();
  }, []);

  return (
    <Container>
      <h2 className="d-flex justify-content-around">
        Articles
        <NavLink to="/articles/new" className="btn btn-dark float-right">
          Create Article
        </NavLink>
      </h2>
      <hr />
      {articles.map((article) => {
        return (
          <div key={article._id}>
            <h4>
              <NavLink
                to={`/articles/${article._id}`}
                style={{ fontWeight: "900", color: "#294b7c" }}
                className="text-dark text-decoration-none"
              >
                {article.title}
              </NavLink>
            </h4>
            <hr />
          </div>
        );
      })}
    </Container>
  );
}

export default ArticleList;

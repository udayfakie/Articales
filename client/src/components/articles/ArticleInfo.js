import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function ArticleInfo(props) {
  const [article, setArticle] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getArticle() {
        try {
          const response = await axios.get(`/api/articles/${params._id}`);
          setArticle(response.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      getArticle();
    },
    [params._id, props]
  );
  async function handleDelete() {
    try {
      await axios.delete(`/api/articles/${params._id}`);
      navigate("/articles");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <h2
        style={{ fontWeight: 800, fontFamily: "sans-serif", color: "#294b7c" }}
      >
        {article.title}
      </h2>
      <p style={{ color: "#000", fontWeight: "700", fontSize: 30 }}>
        {article.content}
      </p>
      <div className="btn-group">
        <NavLink to={`/articles/${article._id}/edit`} className="btn btn-dark">
          Edit
        </NavLink>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
        <NavLink to="/articles" className="btn btn-secondary">
          Close
        </NavLink>
      </div>
      <hr />
    </Container>
  );
}

export default ArticleInfo;

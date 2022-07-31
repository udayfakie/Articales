import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";

function ArticleInfo(props) {
  const [article, setArticle] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  // console.log(props)
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
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div className="btn-group">
        <NavLink to={`/articles/${article._id}/edit`} className="btn btn-primary">
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
    </div>
  );
}

export default ArticleInfo;

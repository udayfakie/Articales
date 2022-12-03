import React, { useState, useEffect } from "react";
import { get, patch } from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const ArticleEdit = (props) => {
  const initialState = { title: "", content: "" };
  const [article, setArticle] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await get(`/api/articles/${params._id}`);
        setArticle(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getArticle();
  }, [params._id, props]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateArticle = async () => {
      try {
        await patch(`/api/articles/${article._id}`, article);
        navigate(`/articles/${article._id}`);
      } catch (error) {
        console.log(error);
      }
    };
    updateArticle();
  };

  const handleChange = (event) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const handleCancel = () => {
    navigate(`/articles/${article._id}`);
  };

  return (
    <Container>
      <h1>Edit {article.title}</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ fontWeight: "700" }}>Title</label>
          <input
            style={{ backgroundColor: "#7e767680", width: "350px" }}
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label style={{ fontWeight: "700" }}>Content</label>
          <textarea
            style={{ backgroundColor: "#7e767680", width: "350px" }}
            name="content"
            rows="5"
            value={article.content}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-dark">
            Update
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </Container>
  );
};

export default ArticleEdit;

import React, { useState } from "react";
import { post } from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const ArticleAdd = (props) => {
  const initialState = { title: "", content: "" };
  const [article, setArticle] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!article.title || !article.content) return;
    const postArticle = async () => {
      try {
        const response = await post("/api/articles", article);
        navigate(`/articles/${response.data._id}`);
      } catch (error) {
        console.log("error", error);
      }
    };
    postArticle();
  };

  const handleCancel = () => {
    navigate("/articles");
  };

  return (
    <Container>
      <h1 style={{ color: "#343a40", textAlign: "center" }}>Create Article</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ fontWeight: 700, color: "#000" }}>Title</label>
          <input
            style={{
              backgroundColor: "#7e767680",
              color: "#000",
              fontWeight: 500,
              width: "350px",
            }}
            name="title"
            type="text"
            value={article.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label
            style={{
              fontWeight: 700,
              color: "#000",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Content
          </label>
          <textarea
            style={{
              backgroundColor: "#7e767680",
              color: "#000",
              fontWeight: 500,
              width: "350px",
            }}
            name="content"
            rows="5"
            value={article.content}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="btn-group">
          <input type="submit" value="Submit" className="btn btn-dark" />
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

export default ArticleAdd;

import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
import { NavLink } from 'react-router-dom';


function ArticleList() {
  const [articles, setArticles] = useState([])

  useEffect(function() {
    async function getArticles() {
      try {
        const response = await axios.get("/api/articles");
        setArticles(response.data);
      } catch(error) {
        console.log('error', error);
      }
    }        
    getArticles();
  }, []);

  return (
    <div>
      <h2>
        Articles
        <NavLink to="/articles/new" className="btn btn-primary float-right">Create Article</NavLink> 
      </h2>
      <hr/>
      {articles.map((article) => {
        return(
          <div key={article._id}>
            <h4><NavLink to={`/articles/${article._id}`}>{article.title}</NavLink></h4>
            <hr/>
          </div>
        )     
      })}
    </div>
  )
}

export default ArticleList;
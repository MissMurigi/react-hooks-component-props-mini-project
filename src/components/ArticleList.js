import React from "react";
import Article from "./Article";

const ArticleList = ({ posts }) => {
  if (!posts) {
    return null;
  }

  return (
    <main>
      {posts.map((post) => (
        <Article
          key={post.id}
          title={post.title}
          date={post.date}
          preview={post.preview}
        />
      ))}
    </main>
  );
};

export default ArticleList;

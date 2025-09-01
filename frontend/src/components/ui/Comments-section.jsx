// Comments section component like in the recipe details page
// src/CommentsSection.jsx
import React from "react";

const CommentsSection = ({
  comments,
  newComment,
  setNewComment,
  handleAddComment
}) => {
  return (
    <section className="comments-section">
      <h2>Comments</h2>

      {/* add comment form */}
      <form onSubmit={handleAddComment} className="add-comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment here"
          className="comment-input"
        />
        <button type="submit" className="comment-submit">
          Post
        </button>
      </form>

      {/* comments list */}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="comment-user">{comment.user}</span>
              <span className="comment-timestamp">{comment.timestamp}</span>
            </div>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;

// Comments section component like in the recipe details page
// src/CommentsSection.jsx
import React from "react";

const CommentsSection = ({
  comments,
  newComment,
  setNewComment,
  handleAddComment
}) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date; // difference in milliseconds
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 24) {
      if (diffMinutes < 1) return "just now";
      if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }

    if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <span className="comment-user">{comment.user}</span>
              <span className="comment-timestamp">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="comment-text">{comment.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;

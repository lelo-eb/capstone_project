import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ recipeId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/recipes/${recipeId}/comments`);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [recipeId]);

  return (
    <div>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>By: {comment.username}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;

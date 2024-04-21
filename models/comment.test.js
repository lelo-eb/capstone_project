const db = require('../db');
const Comment = require('../models/comment');

beforeEach(async function () {
  await db.query('DELETE FROM comments');
});

afterAll(async function () {
  await db.end();
});

describe('Comment.add', function () {
  test('works', async function () {
    const comment = await Comment.add({
      recipeId: 1,
      userId: 1,
      comment: 'Test comment'
    });
    expect(comment.recipeId).toBe(1);
    expect(comment.userId).toBe(1);
    expect(comment.comment).toBe('Test comment');
  });
});


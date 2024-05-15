-- Insert test data for users
INSERT INTO users (username, password, firstName, lastName, email)
VALUES
  ('testuser1', 'password1', 'Test', 'User1', 'testuser1@example.com'),
  ('testuser2', 'password2', 'Test', 'User2', 'testuser2@example.com'),
  ('testuser3', 'password3', 'Test', 'User3', 'testuser3@example.com');

-- Insert test data for recipes
INSERT INTO recipes (title, picture, description, ingredients, instructions, createdBy)
VALUES
  ('Spaghetti Carbonara', NULL, 'Classic Italian pasta dish', 'Spaghetti, eggs, bacon, Parmesan cheese', '1. Cook spaghetti according to package instructions. 2. Fry bacon until crispy. 3. Whisk eggs and Parmesan cheese in a bowl. 4. Mix cooked spaghetti with bacon and egg mixture. Serve hot.', 1),
  ('Chicken Alfredo', NULL, 'Creamy pasta dish with chicken', 'Fettuccine, chicken breast, heavy cream, Parmesan cheese', '1. Cook fettuccine according to package instructions. 2. Grill chicken breast until cooked through. 3. Heat heavy cream in a saucepan and add grated Parmesan cheese. 4. Mix cooked pasta with sliced chicken breast and Alfredo sauce. Serve hot.', 1),
  ('Chocolate Chip Cookies', NULL, 'Classic homemade cookies', 'Flour, butter, sugar, chocolate chips', '1. Preheat oven to 350°F. 2. Cream together butter and sugar. 3. Add flour and chocolate chips. 4. Scoop dough onto baking sheets and bake for 10-12 minutes. Let cool before serving.', 2),
  ('Vegetable Stir-Fry', NULL, 'Healthy and colorful stir-fry dish', 'Assorted vegetables (e.g., bell peppers, broccoli, carrots), tofu, soy sauce', '1. Heat oil in a pan. 2. Add chopped vegetables and tofu. 3. Stir-fry until vegetables are tender. 4. Season with soy sauce and serve hot.', 2);

-- Insert test data for ratings
INSERT INTO ratings (recipeId, userId, rating)
VALUES
  (1, 1, 4),
  (1, 2, 5),
  (2, 1, 5),
  (3, 2, 4),
  (4, 3, 3);

-- Insert test data for favorites
INSERT INTO favorites (recipeId, userId)
VALUES
  (1, 1),
  (2, 1),
  (3, 2),
  (4, 3);

-- Insert test data for shopping list items
INSERT INTO shopping_list_items (userId, name, quantity)
VALUES
  (1, 'Milk', '1 gallon'),
  (1, 'Eggs', '1 dozen'),
  (2, 'Bread', '1 loaf'),
  (3, 'Apples', '6');

INSERT INTO users (email, password, given_name, family_name)
VALUES ('user@example.com', '{bcrypt}$2a$10$XlkdPQQhYcolx8bgp6nL3uNvDs8ZwDXA4KFaDencZsIhjMQO3j5lq', 'John', 'Doe');

INSERT INTO categories (title, user_id)
VALUES ('Personal', (SELECT user_id FROM users WHERE email = 'user@example.com'));

INSERT INTO tasks (title, description, due, priority, completed, category_id)
VALUES ('Clean room', NULL, NULL, 'low', FALSE, (SELECT category_id FROM categories WHERE title = 'Personal' AND user_id = (SELECT user_id FROM users WHERE email = 'user@example.com'))),
('Do laundry', NULL, NULL, 'high', FALSE, (SELECT category_id FROM categories WHERE title = 'Personal' AND user_id = (SELECT user_id FROM users WHERE email = 'user@example.com'))),
('Buy groceries', 'Milk, eggs & bread', '2025-02-28 23:59:59', 'medium', FALSE, (SELECT category_id FROM categories WHERE title = 'Personal' AND user_id = (SELECT user_id FROM users WHERE email = 'user@example.com')));

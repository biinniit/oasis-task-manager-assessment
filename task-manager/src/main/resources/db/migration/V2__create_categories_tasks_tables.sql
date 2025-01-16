CREATE TABLE categories (
  category_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT fk_categories_users FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX ix_user_category ON categories(title, user_id);

CREATE TYPE priority AS ENUM('high','medium','low');

CREATE TABLE tasks (
  task_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT,
  due TIMESTAMP,
  priority PRIORITY,
  completed BOOLEAN NOT NULL,
  category_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT fk_tasks_categories FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

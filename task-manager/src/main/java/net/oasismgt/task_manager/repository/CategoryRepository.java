package net.oasismgt.task_manager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.oasismgt.task_manager.model.Category;
import net.oasismgt.task_manager.model.User;

public interface CategoryRepository extends JpaRepository<Category, Long> {
  List<Category> findByUser(User user);
}

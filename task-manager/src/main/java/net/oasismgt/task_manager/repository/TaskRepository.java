package net.oasismgt.task_manager.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.oasismgt.task_manager.model.Category;
import net.oasismgt.task_manager.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
  List<Task> findByCategory(Category category);

  List<Task> findAllByCategoryIn(Collection<Category> categories);
}

package net.oasismgt.task_manager.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.exception.NotFoundException;
import net.oasismgt.task_manager.model.Category;
import net.oasismgt.task_manager.model.Task;
import net.oasismgt.task_manager.model.auth.UserPrincipal;
import net.oasismgt.task_manager.repository.CategoryRepository;
import net.oasismgt.task_manager.repository.TaskRepository;
import net.oasismgt.task_manager.repository.UserRepository;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tasks")
public class TaskController {
  private final TaskRepository taskRepository;
  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;

  @GetMapping("/test")
  public String testAuth() {
    return "You're logged in!";
  }

  @GetMapping
  public List<Task> getTasks(@AuthenticationPrincipal UserPrincipal principal,
      @RequestParam(value = "category", required = false) Long categoryId) {
    List<Category> categories = userRepository.findByEmail(principal.getEmail())
        .map(user -> categoryRepository.findByUser(user))
        .orElse(List.of());

    if (categoryId != null) {
      Optional<Category> category = categories.stream().filter(c -> c.getId() == categoryId).findFirst();
      if (category.isEmpty())
        throw new NotFoundException("Category not found");
      return taskRepository.findByCategory(category.get());
    } else
      return taskRepository.findAllByCategoryIn(categories);
  }
}

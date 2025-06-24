package net.oasismgt.task_manager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.dto.TaskInsertionDto;
import net.oasismgt.task_manager.exception.NotFoundException;
import net.oasismgt.task_manager.model.Category;
import net.oasismgt.task_manager.model.Task;
import net.oasismgt.task_manager.model.auth.UserPrincipal;
import net.oasismgt.task_manager.repository.CategoryRepository;
import net.oasismgt.task_manager.repository.TaskRepository;
import net.oasismgt.task_manager.repository.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {
  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;
  private final TaskRepository taskRepository;

  @GetMapping
  public List<Category> getCategories(@AuthenticationPrincipal UserPrincipal principal) {
    return userRepository.findByEmail(principal.getEmail())
        .map(u -> categoryRepository.findByUser(u))
        .orElse(List.of());
  }

  @GetMapping("{categoryId}/tasks")
  public List<Task> getCategoryTasks(@AuthenticationPrincipal UserPrincipal principal, @PathVariable long categoryId) {
    Category category = verifyCategory(principal, categoryId);
    return taskRepository.findByCategory(category);
  }

  @PostMapping("{categoryId}/tasks")
  @ResponseStatus(HttpStatus.CREATED)
  public Task createTask(@AuthenticationPrincipal UserPrincipal principal, @PathVariable long categoryId,
      @RequestBody @Validated TaskInsertionDto request) {
    Category category = verifyCategory(principal, categoryId);
    return taskRepository.save(request.toTask(category));
  }

  private Category verifyCategory(UserPrincipal principal, long categoryId) {
    return this.getCategories(principal)
        .stream()
        .filter(c -> c.getId() == categoryId)
        .findFirst()
        .orElseThrow(() -> new NotFoundException("Category not found with ID: " + categoryId));
  }
}

package net.oasismgt.task_manager.controller;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.dto.TaskUpdateDto;
import net.oasismgt.task_manager.exception.NotFoundException;
import net.oasismgt.task_manager.model.Task;
import net.oasismgt.task_manager.model.auth.UserPrincipal;
import net.oasismgt.task_manager.repository.CategoryRepository;
import net.oasismgt.task_manager.repository.TaskRepository;
import net.oasismgt.task_manager.repository.UserRepository;
import net.oasismgt.task_manager.service.TaskService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tasks")
public class TaskController {
  private final UserRepository userRepository;
  private final TaskRepository taskRepository;
  private final CategoryRepository categoryRepository;
  private final TaskService taskService;

  @GetMapping("/test")
  public String testAuth() {
    return "You're logged in!";
  }

  /**
   * Get all tasks in the default "Personal" category.
   *
   * @return task list
   */
  @GetMapping
  public List<Task> getTasks(@AuthenticationPrincipal UserPrincipal principal) {
    return userRepository.findByEmail(principal.getEmail())
        .map(u -> categoryRepository.findByUser(u))
        .orElse(List.of())
        .stream()
        .filter(c -> c.getTitle().equals("Personal"))
        .findFirst()
        .map(c -> taskRepository.findByCategory(c))
        .orElse(List.of());
  }

  @PutMapping("{taskId}")
  public Task updateTask(@AuthenticationPrincipal UserPrincipal principal, @PathVariable long taskId,
      @RequestBody @Validated TaskUpdateDto request) {
    Task task = verifyTask(principal, taskId);
    return taskService.update(task, request);
  }

  @DeleteMapping("{taskId}")
  public void deleteTask(@AuthenticationPrincipal UserPrincipal principal, @PathVariable long taskId) {
    Task task = verifyTask(principal, taskId);
    taskRepository.delete(task);
  }

  private Task verifyTask(UserPrincipal principal, long taskId) {
    return userRepository.findByEmail(principal.getEmail())
        .map(u -> categoryRepository.findByUser(u))
        .orElse(List.of())
        .stream()
        .map(c -> taskRepository.findByCategory(c))
        .flatMap(Collection::stream)
        .filter(t -> t.getId() == taskId)
        .findFirst()
        .orElseThrow(() -> new NotFoundException("Task not found with ID: " + taskId));
  }
}

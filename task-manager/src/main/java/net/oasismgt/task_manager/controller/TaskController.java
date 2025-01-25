package net.oasismgt.task_manager.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
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
  public List<Task> getTasks(@AuthenticationPrincipal UserPrincipal principal) {
    return userRepository.findByEmail(principal.getEmail())
        .map(user -> categoryRepository.findByUser(user))
        .map(categories -> taskRepository.findAllByCategoryIn(categories))
        .orElse(List.of());
  }
}

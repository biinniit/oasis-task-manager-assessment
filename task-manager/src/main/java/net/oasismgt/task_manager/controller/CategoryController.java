package net.oasismgt.task_manager.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.model.Category;
import net.oasismgt.task_manager.model.auth.UserPrincipal;
import net.oasismgt.task_manager.repository.CategoryRepository;
import net.oasismgt.task_manager.repository.UserRepository;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {
  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;

  @GetMapping
  public List<Category> getCategories(@AuthenticationPrincipal UserPrincipal principal) {
    return userRepository.findByEmail(principal.getEmail())
        .map(user -> categoryRepository.findByUser(user))
        .orElse(List.of());
  }
}

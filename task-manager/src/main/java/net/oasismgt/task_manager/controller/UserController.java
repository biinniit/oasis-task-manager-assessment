package net.oasismgt.task_manager.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.model.User;
import net.oasismgt.task_manager.model.auth.UserPrincipal;
import net.oasismgt.task_manager.repository.UserRepository;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
  private final UserRepository userRepository;

  @GetMapping
  public User getUser(@AuthenticationPrincipal UserPrincipal principal) {
    return userRepository.findByEmail(principal.getEmail()).orElseThrow();
  }
}

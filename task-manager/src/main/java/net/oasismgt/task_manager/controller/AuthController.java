package net.oasismgt.task_manager.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.model.LoginRequest;
import net.oasismgt.task_manager.model.LoginResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
  @PostMapping("/login")
  public LoginResponse login(@RequestBody @Validated LoginRequest request) {
    return LoginResponse.builder().accessToken("some-random-token").build();
  }
}

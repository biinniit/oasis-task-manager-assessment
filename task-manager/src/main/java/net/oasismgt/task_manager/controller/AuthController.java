package net.oasismgt.task_manager.controller;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.model.LoginRequest;
import net.oasismgt.task_manager.model.LoginResponse;
import net.oasismgt.task_manager.service.JwtIssuer;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
  private final JwtIssuer jwtIssuer;

  @PostMapping("/login")
  public LoginResponse login(@RequestBody @Validated LoginRequest request) {
    String token = jwtIssuer.issueToken(1L, request.getEmail(), List.of("USER"));
    return LoginResponse.builder().accessToken(token).build();
  }
}

package net.oasismgt.task_manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.dto.LoginRequest;
import net.oasismgt.task_manager.dto.LoginResponse;
import net.oasismgt.task_manager.dto.RegistrationRequest;
import net.oasismgt.task_manager.model.User;
import net.oasismgt.task_manager.model.auth.UserPrincipal;
import net.oasismgt.task_manager.service.JwtService;
import net.oasismgt.task_manager.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final UserService userService;

  @PostMapping("/login")
  public LoginResponse login(@RequestBody @Validated LoginRequest request) {
    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
    userService.recordLoginActivity(principal.getEmail());

    String token = jwtService.issueToken(
        principal.getUserId(),
        principal.getEmail(),
        principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());
    return LoginResponse.builder().accessToken(token).build();
  }

  @PostMapping("/register")
  public ResponseEntity<User> register(@RequestBody @Validated RegistrationRequest request) {
    User createdUser = userService.create(request.toUser());
    return new ResponseEntity<User>(createdUser, HttpStatus.CREATED);
  }
}

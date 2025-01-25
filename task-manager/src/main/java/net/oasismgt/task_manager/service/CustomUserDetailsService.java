package net.oasismgt.task_manager.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.model.User;
import net.oasismgt.task_manager.model.auth.UserPrincipal;
import net.oasismgt.task_manager.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user;
    try {
      user = userRepository.findByEmail(email.trim().toLowerCase()).orElseThrow();
    } catch (NoSuchElementException nsee) {
      throw new UsernameNotFoundException(nsee.getMessage(), nsee);
    }

    return UserPrincipal.builder()
        .userId(user.getId())
        .email(user.getEmail())
        .authorities(List.of(new SimpleGrantedAuthority("USER")))
        .password(user.getPassword())
        .build();
  }
}

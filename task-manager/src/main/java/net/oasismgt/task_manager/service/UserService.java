package net.oasismgt.task_manager.service;

import java.time.Instant;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.model.Category;
import net.oasismgt.task_manager.model.User;
import net.oasismgt.task_manager.repository.CategoryRepository;
import net.oasismgt.task_manager.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
  public final UserRepository userRepository;
  public final CategoryRepository categoryRepository;

  public User create(User user) {
    User createdUser = userRepository.save(user);

    Category defaultCategory = new Category();
    defaultCategory.setTitle("Personal");
    defaultCategory.setUser(createdUser);
    categoryRepository.save(defaultCategory);

    return createdUser;
  }

  public User recordLoginActivity(String userEmail) {
    User user = userRepository.findByEmail(userEmail).orElseThrow();
    user.setLastLogin(Instant.now());
    return userRepository.save(user);
  }
}

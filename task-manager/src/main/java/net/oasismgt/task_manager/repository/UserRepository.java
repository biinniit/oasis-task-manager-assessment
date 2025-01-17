package net.oasismgt.task_manager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.oasismgt.task_manager.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);

}

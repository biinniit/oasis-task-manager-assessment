package net.oasismgt.task_manager.dto;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern.Flag;
import lombok.Builder;
import lombok.Data;
import net.oasismgt.task_manager.model.User;

@Data
@Builder
public class RegistrationRequest {
  @NotBlank(message = "The given name is required")
  private String givenName;

  private String middleName;

  @NotBlank(message = "The family name is required")
  private String familyName;

  @NotEmpty(message = "The email is required")
  @Size(max = 255, message = "The email must be less than 256 characters")
  @Email(message = "The email is invalid", flags = { Flag.CASE_INSENSITIVE })
  private String email;

  @NotEmpty(message = "The password is required")
  private String password;

  public User toUser() {
    User user = new User();
    user.setGivenName(truncate(givenName.trim()));
    if (middleName != null && !middleName.trim().isEmpty())
      user.setMiddleName(truncate(middleName.trim()));
    user.setFamilyName(truncate(familyName.trim()));
    user.setEmail(email.trim().toLowerCase());
    user.setPassword(new BCryptPasswordEncoder().encode(password));

    return user;
  }

  private String truncate(String str) {
    return truncate(str, 50);
  }

  private String truncate(String str, int limit) {
    return str.substring(0, Math.min(str.length(), limit));
  }
}

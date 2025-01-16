package net.oasismgt.task_manager.model;

import java.time.Instant;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id", nullable = false)
  private long id;

  @Size(max = 255)
  @NotNull
  @Column(name = "email", nullable = false)
  private String email;

  @Size(max = 255)
  @NotNull
  @Column(name = "password", nullable = false)
  private String password;

  @Size(max = 50)
  @NotNull
  @Column(name = "given_name", nullable = false)
  private String givenName;

  @Size(max = 50)
  @Column(name = "middle_name")
  private String middleName;

  @Size(max = 50)
  @NotNull
  @Column(name = "family_name", nullable = false)
  private String familyName;

  @OneToMany(mappedBy = "categories", cascade = CascadeType.REMOVE)
  private Set<Category> categories;

  @NotNull
  @ColumnDefault("NOW()")
  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @NotNull
  @ColumnDefault("NOW()")
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  @Column(name = "last_login")
  private Instant lastLogin;
}

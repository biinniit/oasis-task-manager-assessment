package net.oasismgt.task_manager.model;

import java.time.Instant;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "categories")
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "category_id", nullable = false)
  private long id;

  @Size(max = 50)
  @NotNull
  @Column(name = "title", nullable = false)
  private String title;

  @ManyToOne
  @NotNull
  @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
  private User user;

  @OneToMany(mappedBy = "tasks", cascade = CascadeType.REMOVE)
  private Set<Task> tasks;

  @NotNull
  @ColumnDefault("NOW()")
  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @NotNull
  @ColumnDefault("NOW()")
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;
}

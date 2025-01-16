package net.oasismgt.task_manager.model;

import java.time.Instant;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import net.oasismgt.task_manager.enums.Priority;

@Entity
@Table(name = "tasks")
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "task_id", nullable = false)
  private long id;

  @Size(max = 50)
  @NotNull
  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @Column(name = "due")
  private Instant due;

  @Column(name = "priority")
  private Priority priority;

  @NotNull
  @Column(name = "completed", nullable = false)
  private boolean completed;

  @ManyToOne
  @NotNull
  @JoinColumn(name = "category_id", referencedColumnName = "category_id", nullable = false)
  private Category category;

  @NotNull
  @ColumnDefault("NOW()")
  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @NotNull
  @ColumnDefault("NOW()")
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;
}

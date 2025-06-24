package net.oasismgt.task_manager.dto;

import java.time.Instant;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import net.oasismgt.task_manager.enums.Priority;

@Data
@Builder
public class TaskUpdateDto {
  @NotBlank(message = "The title is required")
  private String title;

  private String description;

  @Future(message = "The due date is in the past")
  private Instant due;

  private Priority priority;

  @NotNull(message = "The completion status is required")
  private boolean completed;
}

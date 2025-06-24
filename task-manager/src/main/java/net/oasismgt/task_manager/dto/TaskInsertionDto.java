package net.oasismgt.task_manager.dto;

import java.time.Instant;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import net.oasismgt.task_manager.enums.Priority;
import net.oasismgt.task_manager.model.Category;
import net.oasismgt.task_manager.model.Task;
import net.oasismgt.task_manager.util.CustomUtils;

@Data
@Builder
public class TaskInsertionDto {
  @NotBlank(message = "The title is required")
  private String title;

  private String description;

  @Future(message = "The due date is in the past")
  private Instant due;

  private Priority priority;

  public Task toTask(Category category) {
    Task task = new Task();
    task.setTitle(CustomUtils.truncate(title.trim()));
    if (description != null && !description.trim().isEmpty())
      task.setDescription(description.trim());
    if (due != null)
      task.setDue(due);
    if (priority != null)
      task.setPriority(priority);
    task.setCompleted(false);
    task.setCategory(category);

    return task;
  }
}

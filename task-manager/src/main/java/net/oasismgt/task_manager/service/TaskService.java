package net.oasismgt.task_manager.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.oasismgt.task_manager.dto.TaskUpdateDto;
import net.oasismgt.task_manager.model.Task;
import net.oasismgt.task_manager.repository.TaskRepository;
import net.oasismgt.task_manager.util.CustomUtils;

@Service
@RequiredArgsConstructor
public class TaskService {
  public final TaskRepository taskRepository;

  public Task update(Task task, TaskUpdateDto details) {
    task.setTitle(CustomUtils.truncate(details.getTitle().trim()));
    task.setDescription(
        Optional.ofNullable(details.getDescription()).map(String::trim).filter(d -> !d.isEmpty()).orElse(null));
    task.setDue(Optional.ofNullable(details.getDue()).orElse(null));
    task.setPriority(details.getPriority());
    task.setCompleted(details.isCompleted());

    return taskRepository.save(task);
  }
}

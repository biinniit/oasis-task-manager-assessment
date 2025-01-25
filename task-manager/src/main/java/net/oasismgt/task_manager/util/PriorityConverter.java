package net.oasismgt.task_manager.util;

import java.util.stream.Stream;

import jakarta.persistence.*;
import net.oasismgt.task_manager.enums.Priority;

@Converter(autoApply = true)
public class PriorityConverter implements AttributeConverter<Priority, String> {
  @Override
  public String convertToDatabaseColumn(Priority priority) {
    if (priority == null)
      return null;
    return priority.getCode();
  }

  @Override
  public Priority convertToEntityAttribute(String code) {
    if (code == null)
      return null;
    return Stream.of(Priority.values())
        .filter(c -> c.getCode().equals(code))
        .findFirst()
        .orElseThrow(IllegalArgumentException::new);
  }
}

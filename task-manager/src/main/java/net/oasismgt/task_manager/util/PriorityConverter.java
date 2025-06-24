package net.oasismgt.task_manager.util;

import jakarta.persistence.*;
import net.oasismgt.task_manager.enums.Priority;

@Converter(autoApply = true)
public class PriorityConverter implements AttributeConverter<Priority, String> {
  @Override
  public String convertToDatabaseColumn(Priority priority) {
    if (priority == null)
      return null;
    return priority.toString();
  }

  @Override
  public Priority convertToEntityAttribute(String value) {
    if (value == null)
      return null;
    return Priority.values()[0].fromString(value);
  }
}

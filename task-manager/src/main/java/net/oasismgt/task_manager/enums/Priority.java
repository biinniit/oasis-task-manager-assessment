package net.oasismgt.task_manager.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Priority implements StringEnum {
  HIGH("high"), MEDIUM("medium"), LOW("low");

  private final String value;

  private Priority(String value) {
    this.value = value;
  }

  @Override
  @JsonValue
  public String toString() {
    return value;
  }

  @Override
  @JsonCreator
  public Priority fromString(String value) {
    if (value == null)
      return null;

    for (Priority p : values())
      if (p.value.equals(value))
        return p;

    throw new IllegalArgumentException("The priority is invalid");
  }
}

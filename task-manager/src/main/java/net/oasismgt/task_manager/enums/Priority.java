package net.oasismgt.task_manager.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Priority {
  HIGH("high"), MEDIUM("medium"), LOW("low");

  private String code;

  private Priority(String code) {
    this.code = code;
  }

  @JsonValue
  public String getCode() {
    return code;
  }
}

package net.oasismgt.task_manager.enums;

public enum Priority {
  HIGH("high"), MEDIUM("medium"), LOW("low");

  private String code;

  private Priority(String code) {
    this.code = code;
  }

  public String getCode() {
    return code;
  }
}

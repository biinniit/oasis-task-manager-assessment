package net.oasismgt.task_manager.util;

public class CustomUtils {
  public static String truncate(String str) {
    return truncate(str, 50);
  }

  public static String truncate(String str, int limit) {
    return str.substring(0, Math.min(str.length(), limit));
  }
}

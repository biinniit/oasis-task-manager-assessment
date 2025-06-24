FROM amazoncorretto:21
COPY target/task-manager-*.jar task-manager.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "task-manager.jar"]

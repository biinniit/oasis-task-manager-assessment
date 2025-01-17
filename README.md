<p align="center">
  <a href="https://oasismgt.net/" target="blank"><img src="https://oasismgt.net/assets/images/oasis-logo.svg" width="240" alt="Oasis Management Logo" /></a>
</p>

<p align="center">A basic task manager for an Oasis developer assessment</p>
<p align="center">
<a href="#"><img src="https://img.shields.io/badge/JDK-21-3A75B0.svg"></a>
<a href="#"><img src="https://img.shields.io/badge/node-v20.18.0-brightgreen.svg"></a>
<a href="#"><img src="https://img.shields.io/badge/%C2%A9-2025-brightgreen.svg"></a>
</p>

## Description

This is a task management application built with [Spring](https://spring.io/) and [Angular](https://angular.dev/).

## Project setup

**Backend:** The Spring framework is used for the backend REST API and it is built and tested with Java 21. If you need to modify this, change the Java version specified in the [POM file](/task-manager/pom.xml) before proceeding. You should run all database migrations before launching the API for the first time.

**Frontend:** The UI application is built with Angular 19 and Node v20.18.0.

#### Configure environment variables

You must set certain environment variables to run the application.

**Backend:** Copy the [`config.properties.example`](/task-manager/config.properties.example) file into a new file in the same directory named `config.properties` and fill in your own credentials in the newly-created `config.properties` file.

#### Useful commands

**Backend:** `cd task-manager`, and then:

```bash
# launch REST API
$ mvn spring-boot:run

# unit tests
$ mvn test

# show pending database migrations
$ mvn flyway:info

# run all pending database migrations (update the database structure)
$ mvn flyway:migrate
```

**Frontend:** `cd task-manager-ui`, and then:

```bash
# launch UI app
$ npm run start
```

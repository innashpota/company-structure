Company Structure [![Build Status](https://travis-ci.com/shpotainna/company-structure.svg?branch=master)](https://travis-ci.com/shpotainna/company-structure)
=================

## A company structure with a list of projects and their users

## Environment Setup

The application requires:

- JDK 1.11
- Gradle 5.4.1
- Docker 18.09.2

## How to run

1. Build docker image for database

    ```
    docker build -t company-structure:company-structure-db -f Dockerfile.db .
    ```
2. Run the database 

    ```
    docker run -p 5432:5432 -e POSTGRES_USER=company-structure -e POSTGRES_PASSWORD=company-structure -e POSTGRES_DB=company-structure --name company-structure_db company-structure:company-structure-db
    ```
    
    The following commands must be performed in separate terminal session.

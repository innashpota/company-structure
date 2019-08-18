FROM openjdk:11.0.3-jdk-stretch AS BUILD_IMAGE
COPY build.gradle gradlew settings.gradle /
COPY src src
COPY gradle gradle
RUN ./gradlew build

FROM openjdk:11.0.3-jre
COPY --from=BUILD_IMAGE /build/libs/company-structure*.jar app.jar
CMD ["java","-jar","-Dspring.profiles.active=prod","app.jar"]
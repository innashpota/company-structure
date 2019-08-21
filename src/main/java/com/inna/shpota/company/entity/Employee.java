package com.inna.shpota.company.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.GenerationType.AUTO;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    @NotNull
    private String firstName, lastName, gender;

    @NotNull
    private LocalDate birthday;

    private String city;

    @ManyToMany(cascade = ALL)
    @JoinTable(
            name = "employee_project",
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private Set<Project> projects = new HashSet<>();

    public Employee() {
    }

    public Employee(
            @NotNull String firstName,
            @NotNull String lastName,
            @NotNull String gender,
            @NotNull LocalDate birthday,
            String city
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.birthday = birthday;
        this.city = city;
    }

    public Employee(
            @NotNull String firstName,
            @NotNull String lastName,
            @NotNull String gender,
            @NotNull LocalDate birthday,
            String city,
            Set<Project> projects
    ) {
        this(firstName, lastName, gender, birthday, city);
        this.projects = projects;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee employee = (Employee) o;
        return Objects.equals(id, employee.id) &&
                Objects.equals(firstName, employee.firstName) &&
                Objects.equals(lastName, employee.lastName) &&
                Objects.equals(gender, employee.gender) &&
                Objects.equals(birthday, employee.birthday) &&
                Objects.equals(city, employee.city);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, gender, birthday, city);
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", gender='" + gender + '\'' +
                ", birthday=" + birthday +
                ", city='" + city + '\'' +
                '}';
    }
}

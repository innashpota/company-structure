package com.inna.shpota.company.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

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

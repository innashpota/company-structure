package com.inna.shpota.company.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.AUTO;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private LocalDate beginDate, endDate;

    @ManyToMany(mappedBy = "projects", fetch = EAGER)
    private Set<Employee> employees = new HashSet<>();

    public Project() {
    }

    public Project(@NotNull String name, @NotNull LocalDate beginDate, @NotNull LocalDate endDate) {
        this.name = name;
        this.beginDate = beginDate;
        this.endDate = endDate;
    }

    public Project(
            @NotNull String name,
            @NotNull LocalDate beginDate,
            @NotNull LocalDate endDate,
            Set<Employee> employees
    ) {
        this(name, beginDate, endDate);
        this.employees = employees;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(LocalDate beginDate) {
        this.beginDate = beginDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Project)) return false;
        Project project = (Project) o;
        return Objects.equals(id, project.id) &&
                Objects.equals(name, project.name) &&
                Objects.equals(beginDate, project.beginDate) &&
                Objects.equals(endDate, project.endDate) &&
                Objects.equals(employees, project.employees);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, beginDate, endDate, employees);
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", beginDate=" + beginDate +
                ", endDate=" + endDate +
                '}';
    }
}

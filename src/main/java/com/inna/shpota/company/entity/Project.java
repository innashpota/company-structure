package com.inna.shpota.company.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@NoArgsConstructor
@Table(name = "projects")
@EqualsAndHashCode(exclude = "employees")
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
}

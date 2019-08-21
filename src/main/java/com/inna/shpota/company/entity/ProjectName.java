package com.inna.shpota.company.entity;

import java.util.Objects;

public class ProjectName {
    private String name;

    public ProjectName() {
    }

    public ProjectName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProjectName)) return false;
        ProjectName that = (ProjectName) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public String toString() {
        return "ProjectName{" +
                "name='" + name + '\'' +
                '}';
    }
}

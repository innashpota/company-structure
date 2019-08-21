package com.inna.shpota.company.service;

import com.inna.shpota.company.entity.Employee;
import com.inna.shpota.company.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class EmployeeService {
    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        Assert.notNull(repository, "Repository must not be null");
        this.repository = repository;
    }

    public void add(Employee employee) {
        repository.save(employee);
    }

    public void edit(Long id, Employee updated) {
        repository.save(updated);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Iterable<Employee> showAll() {
        return repository.findAll();
    }
}

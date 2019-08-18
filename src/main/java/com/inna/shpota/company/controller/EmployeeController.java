package com.inna.shpota.company.controller;

import com.inna.shpota.company.entity.Employee;
import com.inna.shpota.company.service.EmployeeService;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/employees")
@RestController
public class EmployeeController {
    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        Assert.notNull(service, "service must not be null");
        this.service = service;
    }

    @PostMapping
    public void addStop(@RequestBody Employee employee) {
        service.add(employee);
    }

    @PutMapping
    public void edit(@RequestBody Employee employee) {
        service.edit(employee);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        service.deleteById(id);
    }

    @GetMapping
    public Iterable<Employee> showEmployees() {
        return service.showAll();
    }
}

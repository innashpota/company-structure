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
        Assert.notNull(service, "Service must not be null");
        this.service = service;
    }

    @PostMapping
    public void add(@RequestBody Employee employee) {
        service.add(employee);
    }

    @PutMapping("/{id}")
    public void edit(@PathVariable("id") Long id, @RequestBody Employee employee) {
        service.edit(id, employee);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @GetMapping
    public Iterable<Employee> showAll() {
        return service.showAll();
    }
}

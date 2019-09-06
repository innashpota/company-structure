package com.inna.shpota.company.controller;

import com.inna.shpota.company.entity.EmployeeChange;
import com.inna.shpota.company.entity.Project;
import com.inna.shpota.company.entity.ProjectName;
import com.inna.shpota.company.service.ProjectService;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/projects")
@RestController
public class ProjectController {
    private final ProjectService service;

    public ProjectController(ProjectService service) {
        Assert.notNull(service, "Service must not be null");
        this.service = service;
    }

    @PostMapping
    public void add(@RequestBody Project project) {
        service.add(project);
    }

    @GetMapping
    public Iterable<Project> findAll() {
        return service.findAll();
    }

    @PostMapping("/{projectId}/employees/{employeeId}")
    public void addEmployee(
            @PathVariable("projectId") Long projectId,
            @PathVariable("employeeId") Long employeeId
    ) {
        service.addEmployee(projectId, employeeId);
    }

    @PutMapping("/{id}/employees")
    public void editEmployee(
            @PathVariable("id") Long projectId,
            @RequestBody EmployeeChange employeeChange
    ) {
        Long oldEmployeeId = employeeChange.getOldEmployeeId();
        Long newEmployeeId = employeeChange.getNewEmployeeId();
        service.editEmployee(projectId, oldEmployeeId, newEmployeeId);
    }

    @DeleteMapping("/{projectId}/employees/{employeeId}")
    public void deleteEmployee(
            @PathVariable("projectId") Long projectId,
            @PathVariable("employeeId") Long employeeId
    ) {
        service.deleteEmployee(projectId, employeeId);
    }

    @PutMapping("/{id}")
    public void editProjectName(@PathVariable("id") Long projectId, @RequestBody ProjectName projectName) {
        service.editProjectName(projectId, projectName.getName());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long projectId) {
        service.delete(projectId);
    }
}

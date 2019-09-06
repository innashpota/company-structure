package com.inna.shpota.company.service;

import com.inna.shpota.company.entity.Employee;
import com.inna.shpota.company.entity.Project;
import com.inna.shpota.company.repository.EmployeeRepository;
import com.inna.shpota.company.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final EmployeeRepository employeeRepository;

    public ProjectService(ProjectRepository projectRepository, EmployeeRepository employeeRepository) {
        Assert.notNull(projectRepository, "Project repository must not be null");
        Assert.notNull(employeeRepository, "Employee repository must not be null");
        this.projectRepository = projectRepository;
        this.employeeRepository = employeeRepository;
    }

    public void add(Project project) {
        projectRepository.save(project);
    }

    public Iterable<Project> findAll() {
        return projectRepository.findAll();
    }

    @Transactional
    public void addEmployee(Long projectId, Long employeeId) {
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent() && employeeOptional.isPresent()) {
            var project = projectOptional.get();
            var employee = employeeOptional.get();
            employee.getProjects().add(project);
            employeeRepository.save(employee);
        }
    }

    @Transactional
    public void editEmployee(Long projectId, Long oldEmployeeId, Long newEmployeeId) {
        Optional<Employee> oldEmployeeOptional = employeeRepository.findById(oldEmployeeId);
        Optional<Employee> newEmployeeOptional = employeeRepository.findById(newEmployeeId);
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent() && oldEmployeeOptional.isPresent() && newEmployeeOptional.isPresent()) {
            var project = projectOptional.get();
            var oldEmployee = oldEmployeeOptional.get();
            var newEmployee = newEmployeeOptional.get();
            oldEmployee.getProjects().remove(project);
            newEmployee.getProjects().add(project);
            employeeRepository.save(oldEmployee);
            employeeRepository.save(newEmployee);
        }
    }

    @Transactional
    public void deleteEmployee(Long projectId, Long employeeId) {
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (employeeOptional.isPresent() && projectOptional.isPresent()) {
            var project = projectOptional.get();
            var employee = employeeOptional.get();
            employee.getProjects().remove(project);
            employeeRepository.save(employee);
        }
    }

    public void editProjectName(Long projectId, String name) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            project.setName(name);
            projectRepository.save(project);
        }
    }

    public void delete(Long projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            projectRepository.delete(project);
        }
    }
}

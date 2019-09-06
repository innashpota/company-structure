package com.inna.shpota.company.service;

import com.inna.shpota.company.entity.Employee;
import com.inna.shpota.company.entity.Project;
import com.inna.shpota.company.repository.EmployeeRepository;
import com.inna.shpota.company.repository.ProjectRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.List;

import static java.util.Arrays.asList;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
public class ProjectServiceIntegrationTest {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    @Test
    @DirtiesContext
    public void shouldFailToCreateGivenNullProjectRepository() {
        ProjectRepository projectRepository = null;
        employeeRepository.save(getEmployee());
        expectedException.expect(IllegalArgumentException.class);
        expectedException.expectMessage("Project repository must not be null");

        new ProjectService(projectRepository, employeeRepository);
    }

    @Test
    @DirtiesContext
    public void shouldFailToCreateGivenNullEmployeeRepository() {
        EmployeeRepository employeeRepository = null;
        projectRepository.save(getProject());
        expectedException.expect(IllegalArgumentException.class);
        expectedException.expectMessage("Employee repository must not be null");

        new ProjectService(projectRepository, employeeRepository);
    }

    @Test
    @DirtiesContext
    public void shouldAdd() {
        var expected = getProject();

        projectService.add(expected);

        var actual = projectRepository.findAll().iterator().next();
        assertEquals(1, projectRepository.count());
        assertEquals(actual.getName(), expected.getName());
        assertEquals(actual.getBeginDate(), expected.getBeginDate());
        assertEquals(actual.getEndDate(), expected.getEndDate());
    }

    @Test
    @DirtiesContext
    public void shouldFindAll() {
        projectRepository.saveAll(getProjects());
        var expected = getProjects();

        Iterable<Project> actual = projectService.findAll();

        var firstActual = actual.iterator().next();
        assertEquals(expected.get(0).getName(), firstActual.getName());
        assertEquals(expected.get(0).getBeginDate(), firstActual.getBeginDate());
        assertEquals(expected.get(0).getEndDate(), firstActual.getEndDate());
    }

    @Test
    @DirtiesContext
    public void shouldAddEmployee() {
        var expectedEmployee = getEmployee();
        employeeRepository.save(expectedEmployee);
        var expectedProject = getProject();
        projectRepository.save(expectedProject);

        projectService.addEmployee(2L, 1L);

        var actualProject = projectRepository.findById(expectedProject.getId()).get();
        var actualProjectEmployees = actualProject.getEmployees();
        assertThat(actualProjectEmployees, hasSize(1));
        var firstActualEmployee = actualProjectEmployees.iterator().next();
        assertEquals(expectedEmployee.getFirstName(), firstActualEmployee.getFirstName());
        assertEquals(expectedEmployee.getLastName(), firstActualEmployee.getLastName());
        assertEquals(expectedEmployee.getGender(), firstActualEmployee.getGender());
        assertEquals(expectedEmployee.getBirthday(), firstActualEmployee.getBirthday());
        assertEquals(expectedEmployee.getCity(), firstActualEmployee.getCity());
    }

    @Test
    @DirtiesContext
    public void shouldEditEmployee() {
        var expectedEmployees = getEmployees();
        var firstEmployee = expectedEmployees.get(0);
        var secondEmployee = expectedEmployees.get(1);
        employeeRepository.save(firstEmployee);
        employeeRepository.save(secondEmployee);
        projectRepository.save(getProject());
        projectService.addEmployee(3L, 1L);

        projectService.editEmployee(3L, 1L, 2L);

        var actualProject = projectRepository.findById(3L).get();
        var actualProjectEmployees = actualProject.getEmployees();
        var firstActualEmployee = actualProjectEmployees.iterator().next();
        assertEquals(secondEmployee.getFirstName(), firstActualEmployee.getFirstName());
        assertEquals(secondEmployee.getLastName(), firstActualEmployee.getLastName());
        assertEquals(secondEmployee.getGender(), firstActualEmployee.getGender());
        assertEquals(secondEmployee.getBirthday(), firstActualEmployee.getBirthday());
        assertEquals(secondEmployee.getCity(), firstActualEmployee.getCity());
    }

    @Test
    @DirtiesContext
    public void shouldDeleteEmployee() {
        var expectedEmployee = getEmployee();
        employeeRepository.save(expectedEmployee);
        var expectedProject = getProject();
        projectRepository.save(expectedProject);
        projectService.addEmployee(2L, 1L);

        projectService.deleteEmployee(2L, 1L);

        var actualProject = projectRepository.findById(2L).get();
        var actualProjectEmployees = actualProject.getEmployees();
        assertThat(actualProjectEmployees, hasSize(0));
    }

    @Test
    @DirtiesContext
    public void shouldEditProjectName() {
        projectRepository.save(getProject());
        String expectedName = "Barbecue";

        projectService.editProjectName(1L, expectedName);

        var actualProject = projectRepository.findById(1L).get();
        assertEquals(expectedName, actualProject.getName());
    }

    @Test
    @DirtiesContext
    public void shouldDelete() {
        projectRepository.saveAll(getProjects());

        projectService.delete(1L);

        assertEquals(1, projectRepository.count());
    }

    private List<Project> getProjects() {
        var firstProject = new Project();
        firstProject.setName("Arlen the best");
        firstProject.setBeginDate(LocalDate.of(1954, 4, 19));
        firstProject.setEndDate(LocalDate.of(2054, 4, 19));
        var secondProject = new Project();
        secondProject.setName("Who likes beer?");
        secondProject.setBeginDate(LocalDate.of(1800, 1, 29));
        secondProject.setEndDate(LocalDate.of(3000, 6, 9));
        return asList(firstProject, secondProject);
    }

    private Project getProject() {
        var project = new Project();
        project.setName("Texas city");
        project.setBeginDate(LocalDate.of(1954, 4, 19));
        project.setEndDate(LocalDate.of(2054, 4, 19));
        return project;
    }

    private List<Employee> getEmployees() {
        var firstEmployee = new Employee();
        firstEmployee.setFirstName("Hank");
        firstEmployee.setLastName("Hill");
        firstEmployee.setGender("M");
        firstEmployee.setBirthday(LocalDate.of(1954, 04, 19));
        firstEmployee.setCity("Texas");
        var secondEmployee = new Employee();
        secondEmployee.setFirstName("Dale");
        secondEmployee.setLastName("Gribble");
        secondEmployee.setGender("M");
        secondEmployee.setBirthday(LocalDate.of(1954, 06, 12));
        secondEmployee.setCity("Texas");
        return asList(firstEmployee, secondEmployee);
    }

    private Employee getEmployee() {
        var employee = new Employee();
        employee.setFirstName("Hank");
        employee.setLastName("Hill");
        employee.setGender("M");
        employee.setBirthday(LocalDate.of(1954, 04, 19));
        employee.setCity("Texas");
        return employee;
    }
}
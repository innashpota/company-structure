package com.inna.shpota.company.service;

import com.inna.shpota.company.entity.Employee;
import com.inna.shpota.company.repository.EmployeeRepository;
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
import static org.junit.Assert.assertEquals;

@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
public class EmployeeServiceIntegrationTest {
    @Autowired
    private EmployeeService service;
    @Autowired
    private EmployeeRepository repository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    @Test
    public void shouldFailToCreateGivenNullRepository() {
        EmployeeRepository repository = null;
        expectedException.expect(IllegalArgumentException.class);
        expectedException.expectMessage("Repository must not be null");

        new EmployeeService(repository);
    }

    @Test
    @DirtiesContext
    public void shouldAdd() {
        var expected = getEmployee();

        service.add(expected);

        Employee actual = repository.findAll().iterator().next();
        assertEquals(1, repository.count());
        assertEquals(actual.getFirstName(), expected.getFirstName());
        assertEquals(actual.getLastName(), expected.getLastName());
        assertEquals(actual.getGender(), expected.getGender());
        assertEquals(actual.getBirthday(), expected.getBirthday());
        assertEquals(actual.getCity(), expected.getCity());
    }

    @Test
    @DirtiesContext
    public void shouldEdit() {
        repository.saveAll(getEmployees());
        var expected = getEmployeeWithId();

        service.edit(1L, expected);

        Employee actual = repository.findAll().iterator().next();
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getFirstName(), actual.getFirstName());
        assertEquals(expected.getLastName(), actual.getLastName());
        assertEquals(expected.getGender(), actual.getGender());
        assertEquals(expected.getBirthday(), actual.getBirthday());
        assertEquals(expected.getCity(), actual.getCity());
    }

    @Test
    @DirtiesContext
    public void shouldDelete() {
        repository.saveAll(getEmployees());

        service.delete(1L);

        assertEquals(1, repository.count());
    }

    @Test
    @DirtiesContext
    public void shouldShowAll() {
        repository.saveAll(getEmployees());
        List<Employee> expected = getEmployees();

        Iterable<Employee> actual = service.showAll();

        Employee firstActual = actual.iterator().next();
        assertEquals(expected.get(0).getFirstName(), firstActual.getFirstName());
        assertEquals(expected.get(0).getLastName(), firstActual.getLastName());
        assertEquals(expected.get(0).getGender(), firstActual.getGender());
        assertEquals(expected.get(0).getBirthday(), firstActual.getBirthday());
        assertEquals(expected.get(0).getCity(), firstActual.getCity());
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
        employee.setFirstName("Peggy");
        employee.setLastName("Hill");
        employee.setGender("F");
        employee.setBirthday(LocalDate.of(1955, 02, 06));
        employee.setCity("Texas");
        return employee;
    }

    private Employee getEmployeeWithId() {
        var employee = getEmployee();
        employee.setId(1L);
        return employee;
    }
}
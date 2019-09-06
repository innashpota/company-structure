package com.inna.shpota.company.controller;

import com.inna.shpota.company.entity.Employee;
import com.inna.shpota.company.service.EmployeeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static java.util.Arrays.asList;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.internal.verification.VerificationModeFactory.times;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RunWith(SpringRunner.class)
@WebMvcTest(EmployeeController.class)
@ActiveProfiles("test")
public class EmployeeControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private EmployeeService service;

    @Test
    public void shouldAdd() throws Exception {
        var employee = getEmployee();

        mockMvc.perform(
                post("/employees")
                        .contentType(APPLICATION_JSON)
                        .content("{\n" +
                                "  \"firstName\": \"Peggy\",\n" +
                                "  \"lastName\": \"Hill\",\n" +
                                "  \"gender\": \"F\",\n" +
                                "  \"birthday\": \"1955-02-06\",\n" +
                                "  \"city\": \"Texas\"\n" +
                                "}"))
                .andExpect(status().isOk());
        verify(service, times(1)).add(employee);
        verifyNoMoreInteractions(service);
    }

    @Test
    public void shouldEdit() throws Exception {
        List<Employee> employees = getEmployees();
        given(service.findAll()).willReturn(employees);
        var employee = getEmployeeWithId();

        mockMvc.perform(
                put("/employees/{id}", 1L)
                        .contentType(APPLICATION_JSON)
                        .content("{\n" +
                                "  \"id\": 1,\n" +
                                "  \"firstName\": \"Peggy\",\n" +
                                "  \"lastName\": \"Hill\",\n" +
                                "  \"gender\": \"F\",\n" +
                                "  \"birthday\": \"1955-02-06\",\n" +
                                "  \"city\": \"Texas\"\n" +
                                "}"))
                .andExpect(status().isOk());
        verify(service, times(1)).edit(1L, employee);
        verifyNoMoreInteractions(service);
    }

    @Test
    public void shouldDelete() throws Exception {
        List<Employee> employees = getEmployees();
        given(service.findAll()).willReturn(employees);

        mockMvc.perform(
                delete("/employees/{id}", 1L)
                        .accept(APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        verify(service).delete(1L);
        verifyNoMoreInteractions(service);
    }

    @Test
    public void shouldFindAll() throws Exception {
        List<Employee> employees = getEmployees();
        given(service.findAll()).willReturn(employees);

        mockMvc.perform(
                get("/employees")
                        .accept(APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$.[0].firstName").value("Hank"))
                .andExpect(jsonPath("$.[0].lastName").value("Hill"))
                .andExpect(jsonPath("$.[0].gender").value("M"))
                .andExpect(jsonPath("$.[0].birthday").value("1954-04-19"))
                .andExpect(jsonPath("$.[0].city").value("Texas"))
                .andExpect(jsonPath("$.[1].firstName").value("Dale"))
                .andExpect(jsonPath("$.[1].lastName").value("Gribble"))
                .andExpect(jsonPath("$.[1].gender").value("M"))
                .andExpect(jsonPath("$.[1].birthday").value("1954-06-12"))
                .andExpect(jsonPath("$.[1].city").value("Texas"))
                .andReturn();
        verify(service).findAll();
        verifyNoMoreInteractions(service);
    }

    private List<Employee> getEmployees() {
        var firstEmployee = new Employee();
        firstEmployee.setFirstName("Hank");
        firstEmployee.setLastName("Hill");
        firstEmployee.setGender("M");
        firstEmployee.setBirthday(LocalDate.of(1954, 4, 19));
        firstEmployee.setCity("Texas");
        var secondEmployee = new Employee();
        secondEmployee.setFirstName("Dale");
        secondEmployee.setLastName("Gribble");
        secondEmployee.setGender("M");
        secondEmployee.setBirthday(LocalDate.of(1954, 6, 12));
        secondEmployee.setCity("Texas");
        return asList(firstEmployee, secondEmployee);
    }

    private Employee getEmployee() {
        var employee = new Employee();
        employee.setFirstName("Peggy");
        employee.setLastName("Hill");
        employee.setGender("F");
        employee.setBirthday(LocalDate.of(1955, 2, 6));
        employee.setCity("Texas");
        return employee;
    }

    private Employee getEmployeeWithId() {
        var employee = getEmployee();
        employee.setId(1L);
        return employee;
    }
}
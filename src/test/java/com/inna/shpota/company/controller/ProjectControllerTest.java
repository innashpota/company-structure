package com.inna.shpota.company.controller;

import com.inna.shpota.company.entity.Project;
import com.inna.shpota.company.service.ProjectService;
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
@WebMvcTest(ProjectController.class)
@ActiveProfiles("test")
public class ProjectControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ProjectService service;

    @Test
    public void shouldAdd() throws Exception {
        var project = getProject();

        mockMvc.perform(
                post("/projects")
                        .contentType(APPLICATION_JSON)
                        .content("{\n" +
                                "  \"name\":\"Texas city\",\n" +
                                "  \"beginDate\":\"1954-04-19\",\n" +
                                "  \"endDate\":\"2054-04-19\"\n" +
                                "}"))
                .andExpect(status().isOk());
        verify(service, times(1)).add(project);
        verifyNoMoreInteractions(service);
    }

    @Test
    public void shouldFindAll() throws Exception {
        given(service.findAll()).willReturn(getProjects());

        mockMvc.perform(
                get("/projects")
                        .accept(APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$.[0].name").value("Arlen the best"))
                .andExpect(jsonPath("$.[0].beginDate").value("1954-04-19"))
                .andExpect(jsonPath("$.[0].endDate").value("2054-04-19"))
                .andExpect(jsonPath("$.[1].name").value("Who likes beer?"))
                .andExpect(jsonPath("$.[1].beginDate").value("1800-01-29"))
                .andExpect(jsonPath("$.[1].endDate").value("3000-06-09"))
                .andReturn();
        verify(service).findAll();
        verifyNoMoreInteractions(service);
    }

    @Test
    public void shouldAddEmployee() throws Exception {
        var projectId = 1L;
        var employeeId = 2L;

        mockMvc.perform(
                post(
                        "/projects/{projectId}/employees/{employeeId}",
                        projectId,
                        employeeId
                )
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());
        verify(service, times(1))
                .addEmployee(projectId, employeeId);
        verifyNoMoreInteractions(service);
    }

    @Test
    public void shouldEditEmployee() throws Exception {
        var projectId = 1L;
        var oldEmployeeId = 2L;
        var newEmployeeId = 4L;

        mockMvc.perform(
                put("/projects/{projectId}/employees", projectId)
                        .contentType(APPLICATION_JSON)
                        .content("{\n" +
                                "  \"oldEmployeeId\": 2,\n" +
                                "  \"newEmployeeId\": 4\n" +
                                "}"))
                .andExpect(status().isOk());
        verify(service, times(1))
                .editEmployee(projectId, oldEmployeeId, newEmployeeId);
        verifyNoMoreInteractions(service);
    }

    @Test
    public void shouldDeleteEmployee() throws Exception {
        var projectId = 1L;
        var employeeId = 2L;

        mockMvc.perform(
                delete("/projects/{projectId}/employees/{employeeId}", projectId, employeeId)
                        .accept(APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        verify(service).deleteEmployee(projectId, employeeId);
        verifyNoMoreInteractions(service);
    }

    @Test
    public void shouldEditProjectName() throws Exception {
        var projectId = 1L;
        var name = "Barbecue";

        mockMvc.perform(
                put("/projects/{projectId}", projectId)
                        .contentType(APPLICATION_JSON)
                        .content("{\n" +
                                "  \"name\": \"Barbecue\"\n" +
                                "}"))
                .andExpect(status().isOk());
        verify(service).editProjectName(projectId, name);
        verifyNoMoreInteractions(service);
    }

    @Test
    public void shouldDelete() throws Exception {
        var projects = getProjectsWithId();
        given(service.findAll()).willReturn(projects);

        mockMvc.perform(
                delete("/projects/{projectId}", 1L)
                        .accept(APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
        verify(service).delete(1L);
        verifyNoMoreInteractions(service);
    }

    private List<Project> getProjectsWithId() {
        var firstProject = new Project();
        firstProject.setId(1L);
        firstProject.setName("Arlen the best");
        firstProject.setBeginDate(LocalDate.of(1954, 4, 19));
        firstProject.setEndDate(LocalDate.of(2054, 4, 19));
        var secondProject = new Project();
        secondProject.setId(2L);
        secondProject.setName("Who likes beer?");
        secondProject.setBeginDate(LocalDate.of(1800, 1, 29));
        secondProject.setEndDate(LocalDate.of(3000, 6, 9));
        return asList(firstProject, secondProject);
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
}
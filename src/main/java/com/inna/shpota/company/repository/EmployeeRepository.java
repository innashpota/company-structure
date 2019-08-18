package com.inna.shpota.company.repository;

import com.inna.shpota.company.entity.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}

package com.inna.shpota.company.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmployeeChange {
    private Long oldEmployeeId;
    private Long newEmployeeId;
}

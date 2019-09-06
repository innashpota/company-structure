package com.inna.shpota.company.entity;

import java.util.Objects;

public class EmployeeChange {
    private Long oldEmployeeId;
    private Long newEmployeeId;

    public EmployeeChange() {
    }

    public EmployeeChange(Long oldEmployeeId, Long newEmployeeId) {
        this.oldEmployeeId = oldEmployeeId;
        this.newEmployeeId = newEmployeeId;
    }

    public Long getOldEmployeeId() {
        return oldEmployeeId;
    }

    public void setOldEmployeeId(Long oldEmployeeId) {
        this.oldEmployeeId = oldEmployeeId;
    }

    public Long getNewEmployeeId() {
        return newEmployeeId;
    }

    public void setNewEmployeeId(Long newEmployeeId) {
        this.newEmployeeId = newEmployeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EmployeeChange)) return false;
        EmployeeChange that = (EmployeeChange) o;
        return Objects.equals(oldEmployeeId, that.oldEmployeeId) &&
                Objects.equals(newEmployeeId, that.newEmployeeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(oldEmployeeId, newEmployeeId);
    }

    @Override
    public String toString() {
        return "EmployeeChange{" +
                "oldEmployeeId=" + oldEmployeeId +
                ", newEmployeeId=" + newEmployeeId +
                '}';
    }
}

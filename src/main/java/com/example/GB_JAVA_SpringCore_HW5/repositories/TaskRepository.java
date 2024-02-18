package com.example.GB_JAVA_SpringCore_HW5.repositories;

import com.example.GB_JAVA_SpringCore_HW5.models.Task;
import com.example.GB_JAVA_SpringCore_HW5.models.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    public List<Task> findAllByStatus(TaskStatus status);
}

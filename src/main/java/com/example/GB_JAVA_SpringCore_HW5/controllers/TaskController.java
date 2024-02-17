package com.example.GB_JAVA_SpringCore_HW5.controllers;

import com.example.GB_JAVA_SpringCore_HW5.models.Task;
import com.example.GB_JAVA_SpringCore_HW5.models.TaskStatus;
import com.example.GB_JAVA_SpringCore_HW5.services.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/tasks")
@AllArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public String getAllTasks(Model model) {
        model.addAttribute("tasks", taskService.getAllTasks());
        model.addAttribute("statuses", TaskStatus.values());
        return "tasks";
    }

    @GetMapping("/{status}")
    public ResponseEntity<List<Task>> getTasksByStatus(@PathVariable TaskStatus status) {
        return ResponseEntity.ok().body(taskService.getTasksByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Void> addTask(@RequestBody Task task) {
        taskService.createTask(task);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTask(@PathVariable Long id, @RequestBody Task task) {
        taskService.updateTask(id, task);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }
}

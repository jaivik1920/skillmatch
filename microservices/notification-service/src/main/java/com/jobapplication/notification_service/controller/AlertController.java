package com.jobapplication.notification_service.controller;

import com.jobapplication.notification_service.model.Alert;
import com.jobapplication.notification_service.service.AlertService;
import com.jobapplication.notification_service.service.SSEService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;
    private final SSEService sseService;

    @PostMapping("/create-alert")
    public ResponseEntity<?> createAlert(@RequestBody Alert alert)
    {
        try {
            alertService.createAlert(alert);
            return ResponseEntity.status(HttpStatus.CREATED).body("Alert created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete-alert/{id}")
    public ResponseEntity<?> deleteAlert(@PathVariable int id)
    {
        try {
            alertService.deleteAlert(id);
            return ResponseEntity.ok("Alert with ID "+ id  +" deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/update-alert")
    public ResponseEntity<?> updateAlert(@RequestBody Alert alert)
    {
        try {
            alertService.updateAlert(alert);
            return ResponseEntity.ok("Alert with ID "+ alert.getId() +" updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping(value = "/subscribe/{userId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribeSSe(@PathVariable int userId)
    {
        return sseService.subscribe(userId);
    }
}

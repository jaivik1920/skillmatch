package com.jobapplication.notification_service.service;

import com.jobapplication.notification_service.dto.JobEventDTO;
import com.jobapplication.notification_service.model.Alert;
import com.jobapplication.notification_service.model.AlertType;
import com.jobapplication.notification_service.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository alertRepository;

    public Alert createAlert(Alert alert)
    {
        alert.setCreatedAt(LocalDateTime.now());
        return alertRepository.save(alert);
    }

    public void deleteAlert(Integer alertId) {
        if (!alertRepository.existsById(alertId)) {
            throw new RuntimeException("Alert with ID " + alertId + " does not exist.");
        }

        alertRepository.deleteById(alertId);
    }

    public Alert getAlertById(Integer alertId) {
        return alertRepository.findById(alertId)
                .orElseThrow(() -> new RuntimeException("Alert with ID " + alertId + " does not exist."));
    }

    public Alert updateAlert(Alert alert) {
        Alert existingAlert = alertRepository.findById(alert.getId()).orElseThrow(() -> new RuntimeException("Alert with ID" + alert.getId() + " does not exist."));

        if(alert.getAlertType() != null)
            existingAlert.setAlertType(alert.getAlertType());
        if(alert.getAlertValue() != null)
            existingAlert.setAlertValue(alert.getAlertValue());
        existingAlert.setActive(alert.isActive());

        return alertRepository.save(existingAlert);
    }

   public void processAlerts(JobEventDTO event)
   {
       List<Alert> alerts = alertRepository.findAllByIsActiveTrue();

         if(alerts.isEmpty())
         {
             System.out.println("No active alerts found.");
             return;
         }

        List<Alert> companyTypeAlerts = alerts.stream().filter( alert -> alert.getAlertType() == AlertType.JOB_COMPANY).toList();
        List<Alert> titleTypeAlerts = alerts.stream().filter( alert -> alert.getAlertType() == AlertType.JOB_TITLE).toList();
        List<Integer> userIds = null;
        if(!companyTypeAlerts.isEmpty())
        {
            userIds = companyTypeAlerts.stream()
                    .filter(alert -> alert.getAlertValue().equalsIgnoreCase(event.getCompany()))
                    .map(Alert::getUserId)
                    .toList();
        }

        if(!titleTypeAlerts.isEmpty())
        {
            userIds = titleTypeAlerts.stream()
                    .filter(alert -> alert.getAlertValue().equalsIgnoreCase(event.getJobTitle()))
                    .map(Alert::getUserId)
                    .collect(Collectors.toList());
        }

       System.out.println(userIds);
   }
}

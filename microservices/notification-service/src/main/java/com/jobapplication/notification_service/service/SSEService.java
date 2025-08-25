package com.jobapplication.notification_service.service;

import com.jobapplication.notification_service.dto.ApplicationEventDTO;
import com.jobapplication.notification_service.dto.JobEventDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SSEService {
    private final Map<Integer, List<SseEmitter>> sseMap = new ConcurrentHashMap<>();

    public SseEmitter subscribe(int userId)
    {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        sseMap.computeIfAbsent(userId, id -> new ArrayList<>()).add(emitter);

        emitter.onCompletion(()-> sseMap.computeIfPresent(userId, (id,list)->{
            list.removeIf(e -> e.equals(emitter));
            return list;
        }));

        emitter.onError((error)-> sseMap.computeIfPresent(userId, (id,list)->{
            list.removeIf(e -> e.equals(emitter));
            return list;
        }));

        emitter.onTimeout(()-> sseMap.computeIfPresent(userId, (id,list)->{
            list.removeIf(e -> e.equals(emitter));
            return list;
        }));
        return emitter;
    }

    public void publishJobEvents(JobEventDTO dto)
    {
        for(Map.Entry<Integer, List<SseEmitter>> entry : sseMap.entrySet())
        {
            entry.getValue().forEach(emitter -> {
                try {
                    emitter.send(SseEmitter.event().name("JOB_EVENTS").data(dto));
                } catch (IOException e) {
                    System.err.println(e.getMessage());
                }
            });
        }
    }

    public void publishApplicationEvents(ApplicationEventDTO dto)
    {
        for(Map.Entry<Integer, List<SseEmitter>> entry : sseMap.entrySet())
        {
            entry.getValue().forEach(emitter -> {
                try {
                    emitter.send(SseEmitter.event().name("APPLICATION_EVENTS").data(dto));
                } catch (IOException e) {
                    System.err.println(e.getMessage());
                }
            });
        }
    }

    public void sendNotifications(int userid, JobEventDTO dto)
    {
        List<SseEmitter> emitters = sseMap.getOrDefault(userid, new ArrayList<>());

        emitters.forEach(emitter ->{
           try{
                emitter.send(SseEmitter.event().name("JOBS_NOTIFICATIONS").data(dto));
           } catch (Exception e) {
               System.err.println(e.getMessage());
           }
        });
    }

    public void sendApplicationEventsToRecruiter(int userid, ApplicationEventDTO eventDTO)
    {
        List<SseEmitter> emitters = sseMap.getOrDefault(userid, new ArrayList<>());
        emitters.forEach(emitter ->{
            try {
                emitter.send(SseEmitter.event().name("APPLY_JOB_NOTIFICATIONS").data(eventDTO));
            }
            catch (Exception e)
            {
                System.err.println(e.getMessage());
            }
        });
    }
}

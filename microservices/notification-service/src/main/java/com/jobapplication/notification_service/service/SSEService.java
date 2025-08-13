package com.jobapplication.notification_service.service;

import com.jobapplication.notification_service.dto.JobEventDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

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

    public void sendNotifications(int userid, JobEventDTO dto)
    {
        List<SseEmitter> emitters = sseMap.getOrDefault(userid, new ArrayList<>());

        emitters.forEach(emitter ->{
           try{
                emitter.send(SseEmitter.event().name("job-posted").data(dto));
           } catch (Exception e) {
               throw new RuntimeException(e);
           }
        });
    }
}

package com.jobapplication.notification_service.service;

import com.jobapplication.notification_service.dto.ApplyJobEventDTO;
import com.jobapplication.notification_service.dto.JobEventDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
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

    public void publishJobPostedEvent()
    {
        for(Map.Entry<Integer, List<SseEmitter>> entry : sseMap.entrySet())
        {
            entry.getValue().forEach(emitter -> {
                try {
                    emitter.send(SseEmitter.event().name("new-job-posted").data("new job posted"));
                    System.out.println("New Job Posted Event send");
                } catch (IOException e) {
//                    throw new RuntimeException(e);
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
                emitter.send(SseEmitter.event().name("job-posted").data(dto));
           } catch (Exception e) {
               System.err.println(e.getMessage());
           }
        });
    }

    public void sendApplyJobEventNotifications(int userid, ApplyJobEventDTO eventDTO)
    {
        List<SseEmitter> emitters = sseMap.getOrDefault(userid, new ArrayList<>());
        emitters.forEach(emitter ->{
            try {
                emitter.send(SseEmitter.event().name("job-applied").data(eventDTO));
            }
            catch (Exception e)
            {
                System.err.println(e.getMessage());
            }
        });
    }
}

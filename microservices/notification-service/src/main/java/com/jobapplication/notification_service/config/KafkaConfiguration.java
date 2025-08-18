package com.jobapplication.notification_service.config;

import com.jobapplication.notification_service.dto.ApplyJobEventDTO;
import com.jobapplication.notification_service.dto.JobEventDTO;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

@Configuration
@RequiredArgsConstructor
public class KafkaConfiguration {

    private final DefaultKafkaConsumerFactory<String,?> defaultKafkaConsumerFactory;

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, JobEventDTO> jobEventConsumerFactory(ConsumerFactory<String,JobEventDTO> defaultConsumerFactory)
    {
        return buildFactory(JobEventDTO.class, "notification-user-group");
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, ApplyJobEventDTO> applyJobEventConsumerFactory(ConsumerFactory<String, ApplyJobEventDTO> defaultConsumerFactory)
    {
        return buildFactory(ApplyJobEventDTO.class, "notification-recruitment-group");
    }


    private <T> ConcurrentKafkaListenerContainerFactory<String, T> buildFactory(Class<T> tClass, String groupId)
    {
        ConcurrentKafkaListenerContainerFactory<String, T> factory = new ConcurrentKafkaListenerContainerFactory<>();
        JsonDeserializer<T> deserializer = new JsonDeserializer<>(tClass);

        factory.setConsumerFactory(
                new DefaultKafkaConsumerFactory<>(
                        defaultKafkaConsumerFactory.getConfigurationProperties(),
                        new StringDeserializer(),
                        deserializer
                )
        );
        return factory;
    }
}

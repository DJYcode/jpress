package io.jpress.addon.topic.service.provider;

import io.jboot.aop.annotation.Bean;
import io.jpress.addon.topic.service.TopicService;
import io.jpress.addon.topic.model.Topic;
import io.jboot.service.JbootServiceBase;

@Bean
public class TopicServiceProvider extends JbootServiceBase<Topic> implements TopicService {

}
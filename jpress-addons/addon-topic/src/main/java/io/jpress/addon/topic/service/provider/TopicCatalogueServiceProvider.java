package io.jpress.addon.topic.service.provider;

import io.jboot.aop.annotation.Bean;
import io.jpress.addon.topic.service.TopicCatalogueService;
import io.jpress.addon.topic.model.TopicCatalogue;
import io.jboot.service.JbootServiceBase;

@Bean
public class TopicCatalogueServiceProvider extends JbootServiceBase<TopicCatalogue> implements TopicCatalogueService {

}
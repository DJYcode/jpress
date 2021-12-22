package io.jpress.addon.topic.service.provider;

import com.jfinal.aop.Inject;
import io.jboot.aop.annotation.Bean;
import io.jboot.db.model.Column;
import io.jboot.db.model.Columns;
import io.jpress.addon.topic.service.TopicCatalogueService;
import io.jpress.addon.topic.service.TopicService;
import io.jpress.addon.topic.model.Topic;
import io.jboot.service.JbootServiceBase;

@Bean
public class TopicServiceProvider extends JbootServiceBase<Topic> implements TopicService {
    @Inject
    TopicCatalogueService topicCatalogueService;

    @Override
    public Topic findByTopicCode(String topicCode) {
        Columns columns = new Columns();
        columns.add(Column.create("topic_code", topicCode));
        Topic topic = DAO.findFirstByColumns(columns);
        joinManyCatalogue(topic);
        return topic;
    }
    private void joinManyCatalogue(Topic topic) {
        if (topic == null) {
            return;
        }
        topicCatalogueService.joinMany(topic,"topic_id");
    }
}
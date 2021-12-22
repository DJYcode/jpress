package io.jpress.addon.topic.directive;

import com.jfinal.aop.Inject;
import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import io.jboot.db.model.Columns;
import io.jboot.utils.CollectionUtil;
import io.jboot.web.directive.annotation.JFinalDirective;
import io.jboot.web.directive.base.JbootDirectiveBase;
import io.jpress.addon.topic.model.Topic;
import io.jpress.addon.topic.model.TopicCatalogue;
import io.jpress.addon.topic.service.TopicService;
import io.jpress.module.article.model.Article;
import io.jpress.module.article.service.ArticleService;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@JFinalDirective("topic")
public class TopicDirective extends JbootDirectiveBase {

    @Inject
    private TopicService topicService;
    @Inject
    private ArticleService articleService;

    @Override
    public void onRender(Env env, Scope scope, Writer writer) {
        String topicCode = getPara("topic_code",scope);
        String articleId = getPara("article_id",scope);
        Topic topic = topicService.findByTopicCode(topicCode);
        scope.setLocal("topic", topic);//topicCatalogue -> {TopicCatalogue@7450} "{article_id:20,21,22,23, id:1, topic_id:1, title:基础命令, order_number:null}"
        List<TopicCatalogue> topicCatalogues = topic.get("topicCatalogueList");
        if (!CollectionUtil.isEmpty(topicCatalogues)) {
            List<Article> articles = new ArrayList<>();
            for (TopicCatalogue topicCatalogue : topicCatalogues) {
                String[] articleIds = topicCatalogue.getArticleId().split(",");
                Columns columns = new Columns();
                columns.in("id", Arrays.asList(articleIds));
                List<Article> articleList = articleService.findListByColumns(columns, "id asc", articleIds.length);
                topicCatalogue.setArticles(articleList);
                articles.addAll(articleList);
            }
            scope.setLocal("topicCatalogues", topicCatalogues);
            if (StringUtils.isNotBlank(articleId)) {
                Optional<Article> optionalArticle = articles.stream().filter(item -> articleId.equals(String.valueOf(item.getId()))).findFirst();
                if (optionalArticle.isPresent()) {
                    Article article = optionalArticle.get();
                    scope.setLocal("firstArticle",article);
                }
            } else {
                scope.setLocal("firstArticle",articles.get(0));
            }
        }
        renderBody(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

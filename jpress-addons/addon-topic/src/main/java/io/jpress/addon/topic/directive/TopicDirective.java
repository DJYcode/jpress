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

import java.util.*;
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
        Map<Long,Integer> numbers = new HashMap<>();
        Map<Long,String> active = new HashMap<>();
        int index = 0;
        if (!CollectionUtil.isEmpty(topicCatalogues)) {
            List<Article> articles = new ArrayList<>();
            for (TopicCatalogue topicCatalogue : topicCatalogues) {
                String[] articleIds = topicCatalogue.getArticleId().split(",");
                Columns columns = new Columns();
                columns.in("id", Arrays.asList(articleIds));
                List<Article> articleList = articleService.findListByColumns(columns, "id asc", articleIds.length);
                topicCatalogue.setArticles(articleList);
                articles.addAll(articleList);
                for (Article article : articleList) {
                    numbers.put(article.getId(),++index);
                    if (StringUtils.isNotBlank(articleId) && articleId.equals(String.valueOf(article.getId()))) {
                        active.put(article.getId(),"active");
                    } else {
                        active.put(article.getId(),"uactive");
                    }
                }
            }
            scope.setLocal("topicCatalogues", topicCatalogues);
            if (StringUtils.isNotBlank(articleId)) {
                for (int i = 0; i < articles.size(); i++) {
                    if (articleId.equals(String.valueOf(articles.get(i).getId()))) {
                        scope.setLocal("firstArticle",articles.get(i));
                        if (i+1 == articles.size()) {
                            scope.setLocal("previousArticle",articles.get(i-1));
                        } else if (i == 0){
                            scope.setLocal("nextArticle",articles.get(i+1));
                        } else {
                            scope.setLocal("nextArticle",articles.get(i+1));
                            scope.setLocal("previousArticle",articles.get(i-1));
                        }
                    }
                }
            } else {
                scope.setLocal("firstArticle",articles.get(0));
                scope.setLocal("nextArticle",articles.get(1));
            }
        }
        scope.setLocal("numbers",numbers);
        scope.setLocal("active",active);
        renderBody(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

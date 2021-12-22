/**
 * Copyright (c) 2016-2020, Michael Yang 杨福海 (fuhai999@gmail.com).
 * <p>
 * Licensed under the GNU Lesser General Public License (LGPL) ,Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.gnu.org/licenses/lgpl-3.0.txt
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.jpress.addon.topic.controller;

import com.jfinal.aop.Inject;
import com.jfinal.kit.Ret;
import com.jfinal.plugin.activerecord.Page;

import io.jboot.db.model.Columns;
import io.jboot.utils.CollectionUtil;
import io.jboot.web.controller.annotation.RequestMapping;
import io.jboot.web.validate.EmptyValidate;
import io.jpress.addon.topic.model.Topic;
import io.jpress.addon.topic.model.TopicCatalogue;
import io.jpress.addon.topic.service.TopicCatalogueService;
import io.jboot.web.validate.Form;
import io.jpress.addon.topic.service.TopicService;
import io.jpress.core.menu.annotation.AdminMenu;
import io.jpress.model.CouponCode;
import io.jpress.module.article.model.Article;
import io.jpress.module.article.service.ArticleService;
import io.jpress.web.base.AdminControllerBase;
import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;


@RequestMapping(value = "/admin/addon-topic/topic_catalogue", viewPath = "/")
public class _TopicCatalogueController extends AdminControllerBase {

    @Inject
    private TopicCatalogueService service;
    @Inject
    private TopicService topicService;
    @Inject
    private ArticleService articleService;
    @AdminMenu(text = "主题文章管理", groupId = "addon-topic")
    public void index() {
        Page<TopicCatalogue> entries=service.paginate(getPagePara(), 10);
        setAttr("page", entries);
        render("views/topic_catalogue_list.html");
    }


    public void edit() {
        int entryId = getParaToInt(0, 0);
        TopicCatalogue entry = entryId > 0 ? service.findById(entryId) : null;
        setAttr("topicCatalogue", entry);
        List<Topic> topicList = topicService.findAll();
        setAttr("topics", topicList);

        render("views/topic_catalogue_edit.html");
    }

    public void doSave() {
        TopicCatalogue entry = getModel(TopicCatalogue.class,"topicCatalogue");
        service.saveOrUpdate(entry);
        renderJson(Ret.ok().set("id", entry.getId()));
    }

    public void doDel() {
        Long id = getIdPara();
        render(service.deleteById(id) ? Ret.ok() : Ret.fail());
    }

    @EmptyValidate(@Form(name = "ids"))
    public void doDelByIds() {
        service.batchDeleteByIds(getParaSet("ids").toArray());
        renderOkJson();
    }
    /**
     * 选择文章的弹出层
     */
    public void layer() {
        String topicCode = getPara("topicCode");
        String articleId = getPara("articleId");
        List<Article> articleList = articleService.findArticlesByFlag(topicCode);
        List<TopicCatalogue> topicCatalogues = service.findListByColumns(
                Columns.create().eq("topic_id",
                topicService.findCountByColumns(Columns.create().eq("topic_code", topicCode))));
        if (!CollectionUtil.isEmpty(topicCatalogues)) {
           List<String> topicCatalogueArticleIds = topicCatalogues.stream().map(TopicCatalogue::getArticleId).collect(Collectors.toList());
           List<String> articleIds = new ArrayList<>();
            for (String catalogueArticleId : topicCatalogueArticleIds) {
                articleIds.addAll(Arrays.asList(catalogueArticleId.split(",")));
            }
            articleList = articleList.stream().filter(item->!articleIds.contains(String.valueOf(item.getId())))
                    .collect(Collectors.toList());
        }
        if (StringUtils.isNotBlank(articleId)) {
            String[] split = articleId.split(",");
            articleList = articleList.stream().filter(item->!Arrays.asList(split).contains(String.valueOf(item.getId())))
                    .collect(Collectors.toList());
            setAttr("articleList", articleList);
        } else {
            setAttr("articleList", articleList);
        }
        render("views/article_layer.html");
    }
}

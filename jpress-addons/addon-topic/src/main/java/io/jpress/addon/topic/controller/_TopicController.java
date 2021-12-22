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

import io.jboot.web.controller.annotation.RequestMapping;
import io.jboot.web.validate.EmptyValidate;
import io.jpress.addon.topic.model.Topic;
import io.jpress.addon.topic.service.TopicService;
import io.jboot.web.validate.Form;
import io.jpress.core.menu.annotation.AdminMenu;
import io.jpress.module.article.model.Article;
import io.jpress.module.article.service.ArticleService;
import io.jpress.web.base.AdminControllerBase;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequestMapping(value = "/admin/addon-topic/topic", viewPath = "/")
public class _TopicController extends AdminControllerBase {

    @Inject
    private TopicService service;
    @Inject
    private ArticleService articleService;

    @AdminMenu(text = "管理", groupId = "addon-topic")
    public void index() {
        Page<Topic> entries=service.paginate(getPagePara(), 10);
        setAttr("page", entries);
        render("views/topic_list.html");
    }


    public void edit() {
        int entryId = getParaToInt(0, 0);
        Topic entry = entryId > 0 ? service.findById(entryId) : null;
        setAttr("topic", entry);
        Map<String, List<Article>> articleFilterFlag = articleService.findAllArticleFilterFlag();
        Map<String, Integer> flagMap = new HashMap<>();
        for (String key : articleFilterFlag.keySet()) {
            flagMap.put(key,articleFilterFlag.get(key).size());
        }
        setAttr("flags",flagMap);
        render("views/topic_edit.html");
    }

    public void doSave() {
        Topic entry = getModel(Topic.class,"topic");
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
}

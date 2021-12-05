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
package io.jpress.addon.message.controller;

import com.jfinal.aop.Inject;
import com.jfinal.kit.Ret;
import com.jfinal.plugin.activerecord.Page;
import io.jboot.web.controller.annotation.RequestMapping;
import io.jboot.web.validate.EmptyValidate;
import io.jboot.web.validate.Form;
import io.jpress.addon.message.model.JpressAddonArticleDoc;
import io.jpress.addon.message.service.JpressAddonArticleDocService;
import io.jpress.core.menu.annotation.AdminMenu;
import io.jpress.web.base.AdminControllerBase;

import java.util.Set;


@RequestMapping(value = "/admin/article-doc", viewPath = "/views")
public class _ArticleDocController extends AdminControllerBase {

    @Inject
    private JpressAddonArticleDocService service;


    @AdminMenu(text = "留言列表", groupId = "message")
    public void list() {
        Page<JpressAddonArticleDoc> entries=service.paginate(getPagePara(), 10);
        setAttr("page", entries);
        render("jpress_addon_message_list.html");
    }


    public void edit() {
        int entryId = getParaToInt(0, 0);
        JpressAddonArticleDoc entry = entryId > 0 ? service.findById(entryId) : null;
        setAttr("jpressAddonMessage", entry);
        render("jpress_addon_message_edit.html");
    }


    public void doSave() {
        JpressAddonArticleDoc entry = getModel(JpressAddonArticleDoc.class,"jpressAddonMessage");
        service.saveOrUpdate(entry);
        renderJson(Ret.ok().set("id", entry.getId()));
    }



    public void doDel() {
        Long id = getIdPara();
        render(service.deleteById(id) ? Ret.ok() : Ret.fail());
    }


    @EmptyValidate(@Form(name = "ids"))
    public void doDelByIds() {
        Set<String> idsSet = getParaSet("ids");
        if (service.batchDeleteByIds(idsSet.toArray())){
            for (String id : idsSet){
                service.deleteById(Long.valueOf(id));
            }
        }
        renderOkJson();
    }
}

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
package io.jpress.addon.friendlink.controller;

import com.jfinal.aop.Inject;
import com.jfinal.kit.Ret;
import com.jfinal.plugin.activerecord.Page;

import io.jboot.web.controller.annotation.RequestMapping;
import io.jboot.web.validate.EmptyValidate;
import io.jpress.addon.friendlink.model.FriendLink;
import io.jpress.addon.friendlink.service.FriendLinkService;
import io.jboot.web.validate.Form;
import io.jpress.core.menu.annotation.AdminMenu;
import io.jpress.web.base.AdminControllerBase;


@RequestMapping(value = "/admin/addon-friend-link/friend_link", viewPath = "/")
public class _FriendLinkController extends AdminControllerBase {

    @Inject
    private FriendLinkService service;

    @AdminMenu(text = "友情链接管理", groupId = "addon-friend-link")
    public void index() {
        Page<FriendLink> entries=service.paginate(getPagePara(), 10);
        setAttr("page", entries);
        render("views/friend_link_list.html");
    }


    public void edit() {
        int entryId = getParaToInt(0, 0);
        FriendLink entry = entryId > 0 ? service.findById(entryId) : null;
        setAttr("friendLink", entry);
        render("views/friend_link_edit.html");
    }

    public void doSave() {
        FriendLink entry = getModel(FriendLink.class,"friendLink");
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

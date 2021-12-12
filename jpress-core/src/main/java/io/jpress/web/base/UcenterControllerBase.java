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
package io.jpress.web.base;

import com.jfinal.aop.Before;
import com.jfinal.core.NotAction;
import io.jboot.utils.StrUtil;
import io.jpress.core.template.Template;
import io.jpress.core.template.TemplateManager;
import io.jpress.web.interceptor.*;
import io.jpress.web.render.TemplateRender;

/**
 * @author Michael Yang 杨福海 （fuhai999@gmail.com）
 * @version V1.0
 * @Package io.jpress.web
 */
@Before({
        CSRFInterceptor.class,
        UserInterceptor.class,
        UserMustLoginedInterceptor.class,
        TemplateInterceptor.class,
        UserCenterInterceptor.class
})
public abstract class UcenterControllerBase extends ControllerBase {

    @Override
    @NotAction
    public void render(String view) {
        render(view, null);
    }

    @NotAction
    public void render(String view, String defaultView) {
        //如果是 / 开头的文件，就不通过模板文件去渲染。而是去根目录去查找。
        if (view != null && view.startsWith("/")) {
            super.render(view);
            return;
        }

        String paraView = getPara("v");

        String newView = StrUtil.isBlank(paraView) ? view : paraView + ".html";
        defaultView = StrUtil.isBlank(defaultView) ? view : defaultView;

        doRender(newView, defaultView);
    }

    protected void doRender(String view, String defaultView) {

        Template template = TemplateManager.me().getCurrentTemplate();
        if (template == null) {
            renderDefault(defaultView);
            return;
        }

        boolean isMobile = isMobileBrowser();

        //匹配到可以用的 view
        view = template.matchView(view, isMobile);

        //匹配不到渲染的模板，尝试使用 default 去匹配
        if (view == null && defaultView != null && !defaultView.startsWith("/")) {
            view = template.matchView(defaultView, isMobile);
        }

        if (view == null) {
            renderDefault(defaultView);
        } else {
            super.render(new TemplateRender(template.buildRelativePath(view)));
        }

    }
    private void renderDefault(String defaultView) {
        if (defaultView == null) {
            renderText("can not match template view to render");
        } else {
            super.render(new TemplateRender(defaultView));
        }
    }

}

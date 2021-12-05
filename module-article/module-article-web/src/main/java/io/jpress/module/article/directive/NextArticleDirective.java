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
package io.jpress.module.article.directive;

import com.jfinal.aop.Inject;
import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import io.jboot.utils.CollectionUtil;
import io.jboot.web.controller.JbootControllerContext;
import io.jboot.web.directive.annotation.JFinalDirective;
import io.jboot.web.directive.base.JbootDirectiveBase;
import io.jpress.module.article.model.Article;
import io.jpress.module.article.model.ArticleCategory;
import io.jpress.module.article.service.ArticleCategoryService;
import io.jpress.module.article.service.ArticleService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


/**
 * @author Michael Yang 杨福海 （fuhai999@gmail.com）
 * @version V1.0
 */
@JFinalDirective("nextArticle")
public class NextArticleDirective extends JbootDirectiveBase {

    @Inject
    private ArticleService service;
    @Inject
    private ArticleCategoryService categoryService;

    @Override
    public void onRender(Env env, Scope scope, Writer writer) {
        Article article = JbootControllerContext.get().getAttr("article");

        Article nextArticle = service.findNextById(article.getId());
        if (nextArticle == null) {
            return;
        }
        List<ArticleCategory> articleCategories = categoryService.findListByArticleId(nextArticle.getId());
        List<ArticleCategory> categorys = articleCategories.stream()
                .filter(item -> ArticleCategory.TYPE_CATEGORY.equals(item.getType()))
                .collect(Collectors.toList());
        if (CollectionUtil.isEmpty(categorys)) {
            nextArticle.setArticleCategory(new ArticleCategory());
        } else {
            nextArticle.setArticleCategory(categorys.get(0));
        }
        List<ArticleCategory> tags = articleCategories.stream()
                .filter(item -> ArticleCategory.TYPE_TAG.equals(item.getType()))
                .collect(Collectors.toList());
        if (CollectionUtil.isEmpty(tags)) {
            nextArticle.setTags(new ArrayList<>());
        } else {
            nextArticle.setTags(tags);
        }

        scope.setLocal("next", nextArticle);
        renderBody(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

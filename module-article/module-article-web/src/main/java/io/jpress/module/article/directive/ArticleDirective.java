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
import io.jboot.utils.StrUtil;
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
@JFinalDirective("article")
public class ArticleDirective extends JbootDirectiveBase {

    @Inject
    private ArticleService service;
    @Inject
    private ArticleCategoryService categoryService;

    @Override
    public void onRender(Env env, Scope scope, Writer writer) {
        String idOrSlug = getPara(0, scope);
        Article article = getArticle(idOrSlug);

        if (article == null) {
            return;
        }
        List<ArticleCategory> articleCategories = categoryService.findListByArticleId(article.getId());
        List<ArticleCategory> categorys = articleCategories.stream()
                .filter(item -> ArticleCategory.TYPE_CATEGORY.equals(item.getType()))
                .collect(Collectors.toList());
        if (CollectionUtil.isEmpty(categorys)) {
            article.setArticleCategory(new ArticleCategory());
        } else {
            article.setArticleCategory(categorys.get(0));
        }
        List<ArticleCategory> tags = articleCategories.stream()
                .filter(item -> ArticleCategory.TYPE_TAG.equals(item.getType()))
                .collect(Collectors.toList());
        if (CollectionUtil.isEmpty(tags)) {
            article.setTags(new ArrayList<>());
        } else {
            article.setTags(tags);
        }

        scope.setLocal("article", article);
        renderBody(env, scope, writer);
    }

    private Article getArticle(String idOrSlug) {
        return StrUtil.isNumeric(idOrSlug)
                ? service.findById(idOrSlug)
                : service.findFirstBySlug(idOrSlug);
    }


    @Override
    public boolean hasEnd() {
        return true;
    }
}

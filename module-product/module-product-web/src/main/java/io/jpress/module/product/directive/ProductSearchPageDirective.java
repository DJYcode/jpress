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
package io.jpress.module.product.directive;

import com.jfinal.aop.Inject;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import io.jboot.utils.StrUtil;
import io.jboot.web.controller.JbootControllerContext;
import io.jboot.web.directive.JbootPaginateDirective;
import io.jboot.web.directive.annotation.JFinalDirective;
import io.jboot.web.directive.base.JbootDirectiveBase;
import io.jpress.module.product.model.Product;
import io.jpress.module.product.query.ProductQuery;
import io.jpress.module.product.service.ProductService;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Michael Yang 杨福海 （fuhai999@gmail.com）
 * @version V1.0
 */
@JFinalDirective("productSearchPage")
public class ProductSearchPageDirective extends JbootDirectiveBase {

    @Inject
    private ProductService productService;

    @Override
    public void onRender(Env env, Scope scope, Writer writer) {

        Controller controller = JbootControllerContext.get();

        String keyword = controller.getAttr("keyword");
        int page = controller.getAttr("page");
        int pageSize = getParaToInt("pageSize", scope, 10);
        String sort = controller.getAttr("sort");
        String filter = controller.getAttr("filter");
        List<String> sortFields = Arrays.asList("created", "sales_count", "price");
        List<String> filterFields = Arrays.asList("free", "charge");
        Map<String,Object> searchParams = new HashMap<>();
        if (StringUtils.isNotBlank(sort) && sortFields.contains(sort)) {
            searchParams.put("sort:" + sort+":desc",sort);
        }
        if (StringUtils.isNotBlank(filter) && filterFields.contains(filter)) {
            if ("free".equals(filter)) {
                searchParams.put("filter:price:eq",0);
            } else if ("charge".equals(filter)) {
                searchParams.put("filter:price:gt",0);
            }
        }

        Page<Product> dataPage = StrUtil.isNotBlank(keyword)
                ? productService.search(new ProductQuery().setTitle(keyword).setSearchParams(searchParams), page, pageSize)
                : null;

        if (dataPage != null) {
            scope.setGlobal("productPage", dataPage);
        }

        //需要页面自行判断 productPage 是否为空
        renderBody(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }


    @JFinalDirective("productSearchPaginate")
    public static class SearchPaginateDirective extends JbootPaginateDirective {
        @Override
        protected Page<?> getPage(Env env, Scope scope, Writer writer) {
            return (Page<?>) scope.get("productPage");
        }

    }
}

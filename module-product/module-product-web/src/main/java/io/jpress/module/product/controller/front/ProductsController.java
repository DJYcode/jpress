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
package io.jpress.module.product.controller.front;

import io.jboot.web.controller.annotation.RequestMapping;
import io.jpress.web.base.TemplateControllerBase;
import org.apache.commons.lang3.StringUtils;


/**
 * @author Michael Yang 杨福海 （fuhai999@gmail.com）
 * @version V1.0
 * @Title: 所有产品的 Controller，主要是用过 {{@link io.jpress.module.product.directive.ProductPageDirective 来渲染的}}
 * @Package io.jpress.module.product
 */
@RequestMapping("/products")
public class ProductsController extends TemplateControllerBase {

    public void index() {

        //标识菜单高亮
        setMenuActive(menu -> menu.isUrlStartWidth("/products"));

        //设置当前页码
        setPageNumber(getParaToInt());

        String orderBy = getPara("orderBy");
        if (StringUtils.isBlank(orderBy)) {
            orderBy = "created";
        } else if ("created".equals(orderBy)) {
            orderBy = "created"; // 最新资源标签页
        } else if ("sales_count".equals(orderBy)){
            orderBy = "sales_count";
        } else {
            orderBy = "created";
        }
        set("orderBy",orderBy);
        set("type",getPara("type"));
        render("products.html","prolist.html");
    }


}

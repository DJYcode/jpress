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
package io.jpress.module.product.controller.api;

import com.jfinal.aop.Inject;
import com.jfinal.kit.Ret;
import com.jfinal.plugin.activerecord.Page;
import io.jboot.aop.annotation.DefaultValue;
import io.jboot.apidoc.ContentType;
import io.jboot.apidoc.annotation.Api;
import io.jboot.apidoc.annotation.ApiOper;
import io.jboot.apidoc.annotation.ApiPara;
import io.jboot.apidoc.annotation.ApiResp;
import io.jboot.web.controller.annotation.RequestMapping;
import io.jboot.web.json.JsonBody;
import io.jpress.commons.Rets;
import io.jpress.module.product.model.ProductCategory;
import io.jpress.module.product.service.ProductCategoryService;
import io.jpress.web.base.ApiControllerBase;

import javax.validation.constraints.NotNull;
import java.util.List;

@RequestMapping("/api/product/category")
@Api("产品分类相关 API")
public class ProductCategoryApiController extends ApiControllerBase {

    @Inject
    private ProductCategoryService productCategoryService;


    @ApiOper(value = "获取商品分类详情", paraNotes = "id 和 slug 必须传入一个值")
    public Ret detail(@ApiPara("产品ID") Long id, @ApiPara("产品固定连接") String slug) {
        return Ret.ok();//.set("detail", product);
    }

    @ApiOper("删除产品分类")
    public Ret doDelete(@ApiPara("产品分类ID") @NotNull Long id) {
        productCategoryService.deleteById(id);
        return Rets.OK;
    }

    @ApiOper(value = "创建新的产品分类", contentType = ContentType.JSON)
    public Ret doCreate(@ApiPara("产品分类的 JSON 信息") @JsonBody ProductCategory productCategory) {
        Object id = productCategoryService.save(productCategory);
        return Ret.ok().set("id", id);
    }

    @ApiOper(value = "更新产品分类", contentType = ContentType.JSON)
    public Ret doUpdate(@ApiPara("产品分类的 JSON 信息") @JsonBody ProductCategory productCategory) {
        productCategoryService.update(productCategory);
        return Rets.OK;
    }
    /**
     * 通过 分类ID 分页读取文章列表
     */
    @ApiOper("分类列表")
    @ApiResp(field = "page", notes = "商品分类数据", dataType = Page.class, genericTypes = ProductCategory.class)
    public Ret page(@ApiPara("分页的页码") @DefaultValue("1") int pageNumber
            , @ApiPara("每页的数据数量") @DefaultValue("10") int pageSize) {
        Page<ProductCategory> page = productCategoryService.paginateByType(pageNumber, pageSize, ProductCategory.TYPE_CATEGORY);
        return Ret.ok().set("page", page);
    }
    @ApiPara("分类列表")
    public Ret list() {
        List<ProductCategory> productCategories = productCategoryService.findListByType(ProductCategory.TYPE_CATEGORY);
        return Ret.ok().set("data", productCategories);
    }


}

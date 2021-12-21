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
package io.jpress.module.product.searcher;

import com.jfinal.aop.Inject;
import com.jfinal.plugin.activerecord.Page;
import io.jpress.module.product.model.Product;
import io.jpress.module.product.query.ProductQuery;
import io.jpress.module.product.service.ProductService;
import io.jpress.module.product.service.query.SearchParam;
import io.jpress.module.product.service.search.ProductSearcher;


public class DbSearcher implements ProductSearcher {


    @Inject
    private ProductService productService;

    @Override
    public void addProduct(Product article) {
        // do noting
    }

    @Override
    public void deleteProduct(Object id) {
        // do noting
    }

    @Override
    public void updateProduct(Product article) {
        // do noting
    }

    @Override
    public Page<Product> search(String keyword, int pageNum, int pageSize) {
        return productService.searchIndb(keyword, pageNum, pageSize);
    }

    @Override
    public Page<Product> search(SearchParam searchParam, int pageNum, int pageSize) {
        ProductQuery productQuery = new ProductQuery()
                .setTitle(searchParam.getTitle())
                .setCategoryId(searchParam.getCategoryId())
                .setSortField(searchParam.getSortField())
                .setSearchParams(searchParam.getSearchParams());
        return productService.searchIndb(productQuery, pageNum, pageSize);
    }
}

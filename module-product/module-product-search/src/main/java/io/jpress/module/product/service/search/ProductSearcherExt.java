package io.jpress.module.product.service.search;

import com.jfinal.plugin.activerecord.Page;
import io.jpress.module.product.model.Product;
import io.jpress.module.product.service.query.SearchParam;

import java.util.Map;

/**
 * @Description：商品搜索扩展
 * @Author：djy
 * @Date：2021/11/11 21:23
 * @Version：v1.0
 */
public interface ProductSearcherExt {
    String TITLE = "title";

    String CATEGORY_ID = "category_id";

    Page<Product> search(SearchParam searchParam, int pageNum, int pageSize);
}

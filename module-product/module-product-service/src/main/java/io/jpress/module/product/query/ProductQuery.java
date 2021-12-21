package io.jpress.module.product.query;

import java.io.Serializable;
import java.util.Map;

/**
 * @Description：
 * @Author：djy
 * @Date：2021/11/22 00:07
 * @Version：v1.0
 */
public class ProductQuery implements Serializable {
    private String title;
    private String categoryId;
    /**
     * 排序字段
     * key:字段名，value:升序/降序
     */
    private Map<String,String> sortField;

    private Map<String,Object> searchParams;

    public String getTitle() {
        return title;
    }

    public ProductQuery setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public ProductQuery setCategoryId(String categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public Map<String, String> getSortField() {
        return sortField;
    }

    public ProductQuery setSortField(Map<String, String> sortField) {
        this.sortField = sortField;
        return this;
    }

    public Map<String, Object> getSearchParams() {
        return searchParams;
    }

    public ProductQuery setSearchParams(Map<String, Object> searchParams) {
        this.searchParams = searchParams;
        return this;
    }
}

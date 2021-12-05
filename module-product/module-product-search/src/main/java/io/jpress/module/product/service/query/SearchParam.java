package io.jpress.module.product.service.query;

import java.io.Serializable;
import java.util.Map;

/**
 * @Description：
 * @Author：djy
 * @Date：2021/11/22 00:01
 * @Version：v1.0
 */
public class SearchParam implements Serializable {
    private String title;
    private String categoryId;
    /**
     * 排序字段
     * key:字段名，value:升序/降序
     */
    private Map<String,String> sortField;

    public String getTitle() {
        return title;
    }

    public SearchParam setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public SearchParam setCategoryId(String categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public Map<String, String> getSortField() {
        return sortField;
    }

    public SearchParam setSortField(Map<String, String> sortField) {
        this.sortField = sortField;
        return this;
    }
}

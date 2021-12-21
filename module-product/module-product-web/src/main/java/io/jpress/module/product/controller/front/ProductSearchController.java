package io.jpress.module.product.controller.front;

import io.jboot.web.controller.annotation.RequestMapping;
import io.jpress.web.base.TemplateControllerBase;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.List;

@RequestMapping("/product/search")
public class ProductSearchController extends TemplateControllerBase {


    public void index() {

        /**
         * 不让页面大于100，我认为：
         * 1、当一个真实用户在搜索某个关键字的内容，通过翻页去找对应数据，不可能翻到100页以上。
         * 2、翻页翻到100页以上，一般是机器：可能是来抓取数据的。
         */
        int page = getParaToInt("page", 1);
        if (page <= 0 || page > 100) {
            renderError(404);
            return;
        }

        setAttr("keyword", getEscapeHtmlPara("keyword"));
        setAttr("page", page);

        List<String> sortFields = Arrays.asList("created", "sales_count", "price");
        List<String> filterFields = Arrays.asList("free", "charge");
        String sort = getPara("sort");
        String filter = getPara("filter");
        if (StringUtils.isNotBlank(sort) && sortFields.contains(sort)) {
            setAttr("sort", sort);
        }
        if (StringUtils.isNotBlank(filter) && filterFields.contains(filter)) {
            setAttr("filter", filter);
        }

        setMenuActive(menu -> menu.isUrlStartWidth("/product/search"));
        render("prosearch.html");
    }

}

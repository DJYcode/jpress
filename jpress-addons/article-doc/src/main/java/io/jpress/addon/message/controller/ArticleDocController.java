package io.jpress.addon.message.controller;

import com.jfinal.aop.Inject;
import com.jfinal.kit.Ret;
import io.jboot.utils.StrUtil;
import io.jboot.web.controller.JbootController;
import io.jboot.web.controller.annotation.RequestMapping;
import io.jpress.addon.message.model.JpressAddonArticleDoc;
import io.jpress.addon.message.service.JpressAddonArticleDocService;
import io.jpress.commons.utils.CommonsUtils;


@RequestMapping(value = "/article-doc",viewPath = "/")
public class ArticleDocController extends JbootController{

    @Inject
    private JpressAddonArticleDocService service;

    public void doSave() {

        JpressAddonArticleDoc entry = getModel(JpressAddonArticleDoc.class);
        //防止xss注入攻击
        CommonsUtils.escapeModel(entry);

        if(StrUtil.isBlank(entry.getFirstTitle())){
            renderJson(Ret.fail().set("msg","一级标题不能是空"));
            return;
        }

        if(StrUtil.isBlank(entry.getArticleId())){
            renderJson(Ret.fail().set("msg","文章ID不能是空"));
            return;
        }


        if(StrUtil.isBlank(entry.getArticleTitle())){
            renderJson(Ret.fail().set("msg","文章标题不能是空"));
            return;
        }


        if(StrUtil.isBlank(entry.getUrl())){
            renderJson(Ret.fail().set("msg","文章链接不能是空"));
            return;
        }

        entry.setShow(false);

        service.save(entry);

        renderJson(Ret.ok());
    }

}

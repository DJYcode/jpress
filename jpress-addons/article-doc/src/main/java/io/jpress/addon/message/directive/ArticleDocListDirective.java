package io.jpress.addon.message.directive;

import com.jfinal.aop.Inject;
import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import io.jboot.db.model.Columns;
import io.jboot.web.directive.annotation.JFinalDirective;
import io.jboot.web.directive.base.JbootDirectiveBase;
import io.jpress.addon.message.model.JpressAddonArticleDoc;
import io.jpress.addon.message.service.JpressAddonArticleDocService;

import java.util.List;


@JFinalDirective("articleDocList")
public class ArticleDocListDirective extends JbootDirectiveBase {

    @Inject
    private JpressAddonArticleDocService service;

    @Override
    public void onRender(Env env, Scope scope, Writer writer) {

        Columns columns = new Columns();
        columns.eq("show", true);
        List<JpressAddonArticleDoc> jpressAddonMessageList = service.findListByColumns(columns);
        scope.setLocal("messageList", jpressAddonMessageList);
        renderBody(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

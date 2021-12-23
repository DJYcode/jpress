package io.jpress.addon.friendlink.directive;

import com.jfinal.aop.Inject;
import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import io.jboot.db.model.Columns;
import io.jboot.web.directive.annotation.JFinalDirective;
import io.jboot.web.directive.base.JbootDirectiveBase;
import io.jpress.addon.friendlink.model.FriendLink;
import io.jpress.addon.friendlink.service.FriendLinkService;

import java.util.List;


@JFinalDirective("friendLinks")
public class FriendLinkListDirective extends JbootDirectiveBase {

    @Inject
    private FriendLinkService friendLinkService;

    @Override
    public void onRender(Env env, Scope scope, Writer writer) {

        Columns columns = new Columns();
        List<FriendLink> friendLinks = friendLinkService.findListByColumns(columns);
        scope.setLocal("friendLinks", friendLinks);
        renderBody(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

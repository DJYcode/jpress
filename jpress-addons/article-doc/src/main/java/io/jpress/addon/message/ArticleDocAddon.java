package io.jpress.addon.message;

import io.jpress.core.addon.AddonBase;
import io.jpress.core.addon.AddonInfo;
import io.jpress.core.addon.AddonUtil;
import io.jpress.core.menu.MenuGroup;
import io.jpress.core.menu.MenuManager;

import java.sql.SQLException;

/**
 * 文档专题插件
 */
public class ArticleDocAddon extends AddonBase  {


    @Override
    public void onInstall(AddonInfo addonInfo) {
        try {
            AddonUtil.execSqlFile(addonInfo, "sql/install.sql");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public void onUninstall(AddonInfo addonInfo) {
        try {
            AddonUtil.execSqlFile(addonInfo, "sql/uninstall.sql");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void onStart(AddonInfo addonInfo) {

        /**
         *  添加菜单到后台
         */
        MenuGroup orderMenuGroup = new MenuGroup();
        orderMenuGroup.setId("article-doc");
        orderMenuGroup.setText("系列文章");
        orderMenuGroup.setIcon("<i class=\"fas fa-comment-alt\"></i>");

        MenuManager.me().getModuleMenus().add(orderMenuGroup);

    }

    @Override
    public void onStop(AddonInfo addonInfo) {

        /**
         *  删除添加的菜单
         */
        MenuManager.me().deleteMenuGroup("article-doc");

    }
}

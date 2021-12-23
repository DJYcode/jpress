package io.jpress.addon.friendlink;

import io.jpress.core.addon.AddonBase;
import io.jpress.core.addon.AddonInfo;
import io.jpress.core.addon.AddonUtil;
import io.jpress.core.menu.MenuGroup;
import io.jpress.core.menu.MenuManager;

import java.sql.SQLException;

/**
 * 友情链接插件
 */
public class FriendlinkAddon extends AddonBase  {


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
        orderMenuGroup.setId("addon-friend-link");
        orderMenuGroup.setText("友情链接");
        orderMenuGroup.setIcon("<i class=\"fas fa-comment-alt\"></i>");

        MenuManager.me().getModuleMenus().add(orderMenuGroup);

    }

    @Override
    public void onStop(AddonInfo addonInfo) {

        /**
         *  删除添加的菜单
         */
        MenuManager.me().deleteMenuGroup("addon-friend-link");

    }
}

package io.jpress.web.api;

import com.github.houbb.heaven.util.lang.BeanUtil;
import com.jfinal.aop.Inject;
import com.jfinal.kit.Ret;
import io.jboot.apidoc.annotation.Api;
import io.jboot.apidoc.annotation.ApiOper;
import io.jboot.apidoc.annotation.ApiResp;
import io.jboot.web.controller.annotation.RequestMapping;
import io.jpress.commons.layer.SortKit;
import io.jpress.model.Menu;
import io.jpress.service.MenuService;
import io.jpress.web.base.ApiControllerBase;

import java.util.List;

/**
 * @Description：
 * @Author：djy
 * @Date：2021/11/10 22:05
 * @Version：v1.0
 */
@RequestMapping("/api/menu")
@Api("菜单API")
public class MenuApiController extends ApiControllerBase {

    @Inject
    private MenuService menuService;

    /**
     * 获取菜单列表
     *
     * @return
     */
    @ApiOper("获取菜单列表")
    @ApiResp(field = "menu", notes = "菜单列表", dataType = List.class, genericTypes = Menu.class)
    public Ret list() {
        List<Menu> menus = menuService.findListByType(Menu.TYPE_MAIN);
        SortKit.toTree(menus);
        return Ret.ok().set("list", menus);
    }
}

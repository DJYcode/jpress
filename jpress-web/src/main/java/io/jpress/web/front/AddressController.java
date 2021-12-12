package io.jpress.web.front;

import com.jfinal.aop.Inject;
import com.jfinal.kit.Ret;
import com.jfinal.plugin.activerecord.Page;
import io.jboot.web.controller.annotation.RequestMapping;
import io.jboot.web.validate.EmptyValidate;
import io.jboot.web.validate.Form;
import io.jpress.JPressConsts;
import io.jpress.core.menu.annotation.UCenterMenu;
import io.jpress.model.UserAddress;
import io.jpress.service.UserAddressService;
import io.jpress.web.base.UcenterControllerBase;

import java.util.Set;


@RequestMapping(value = "/ucenter/address")
public class AddressController extends UcenterControllerBase {
    private static final String DEFAULT_ADDRESS_LIST_TEMPLATE = "/WEB-INF/views/ucenter/address/address_list.html";
    private static final String DEFAULT_ADDRESS_EDIT_TEMPLATE = "/WEB-INF/views/ucenter/address/address_edit.html";
    private static final String DEFAULT_ADDRESS_LAYER_TEMPLATE = "/WEB-INF/views/ucenter/address/address_layer.html";


    @Inject
    private UserAddressService userAddressService;

    /**
     * 用户地址列表
     */
    @UCenterMenu(text = "我的地址", groupId = JPressConsts.UCENTER_MENU_PERSONAL_INFO,
            icon = "<i class=\"fas fa-map text-info\"></i>",order = 20)
    public void index() {
        Page<UserAddress> page = userAddressService.paginate(getPagePara(), 10, getLoginedUser().getId());
        setAttr("page", page);
        render("ucenter/address_list.html",DEFAULT_ADDRESS_LIST_TEMPLATE);
    }

    /**
     * 用户地址新增，编辑
     */
    public void edit() {
        Long id = getParaToLong("id");
        if (id != null) {
            UserAddress data = userAddressService.findById(id);
            render404If(notLoginedUserModel(data));
            setAttr("address", data);
        }
        render("ucenter/address_edit.html",DEFAULT_ADDRESS_EDIT_TEMPLATE);
    }

    /**
     * 选择地址的弹出层
     */
    public void layer() {
        Page<UserAddress> page = userAddressService.paginate(getPagePara(), 10, getLoginedUser().getId());
        setAttr("page", page);
        render(DEFAULT_ADDRESS_LAYER_TEMPLATE);
    }


    /**
     * 批量删除
     */
    @EmptyValidate(@Form(name = "ids"))
    public void doDelByIds() {
        Set<String> idsSet = getParaSet("ids");

        for (String id : idsSet) {
            UserAddress address = userAddressService.findById(id);
            if (address != null && isLoginedUserModel(address)){
                userAddressService.delete(address);
            }
        }

        renderJson(Ret.ok());
    }

    /**
     * 单个删除
     */
    public void doDel() {
        UserAddress address = userAddressService.findById(getIdPara());
        if (address != null && isLoginedUserModel(address)){
            userAddressService.delete(address);
        }
        renderOkJson();
    }

    /**
     * 新增/编辑地址
     */
    @EmptyValidate({
            @Form(name = "address.username",message = "请填写联系人"),
            @Form(name = "address.mobile",message = "请填写联系方式"),
            @Form(name = "address.detail",message = "请填写详细地址"),
    })
    public void doAdd() {
        UserAddress address = getBean(UserAddress.class, "address");
        userAddressService.addUserAddress(address,getLoginedUser().getId());
        renderJson(Ret.ok());
    }

}

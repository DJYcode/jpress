package io.jpress.web.front;

import com.jfinal.aop.Inject;
import io.jboot.web.controller.annotation.RequestMapping;
import io.jpress.JPressConsts;
import io.jpress.core.menu.annotation.UCenterMenu;
import io.jpress.model.CouponCode;
import io.jpress.service.CouponCodeService;
import io.jpress.service.CouponService;
import io.jpress.web.base.UcenterControllerBase;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author haicuan139 (haicuan139@163.com)
 * @Date: 2019/12/24
 */
@RequestMapping(value = "/ucenter/coupon")
public class CouponController extends UcenterControllerBase {

    private static final String DEFAULT_COUPON_LIST_TEMPLATE = "/WEB-INF/views/ucenter/coupon/coupon_code_list.html";
    private static final String DEFAULT_COUPON_LAYER_TEMPLATE = "/WEB-INF/views/ucenter/coupon/coupon_code_layer.html";


    @Inject
    private CouponService couponService;

    @Inject
    private CouponCodeService couponCodeService;

    /**
     * 用户优惠券列表
     */
    @UCenterMenu(text = "优惠券", groupId = JPressConsts.UCENTER_MENU_FINANCE_INFO,
            icon = "<i class=\"fas fa-credit-card text-info\"></i>",order = 40)
    public void index() {
        List<CouponCode> renderList = couponCodeService.findAvailableByUserId(getLoginedUser().getId());
        setAttr("couponCodeList", renderList);
        render("ucenter/coupon/coupon_list.html",DEFAULT_COUPON_LIST_TEMPLATE);
    }


    /**
     * 选择优惠券的弹出层
     */
    public void layer() {
        String price = getPara("price");
        List<CouponCode> couponCodes = couponCodeService.findAvailableByUserId(getLoginedUser().getId(), new BigDecimal(price));
        setAttr("couponCodeList", couponCodes);
        render(DEFAULT_COUPON_LAYER_TEMPLATE);
    }


}

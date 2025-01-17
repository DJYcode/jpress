package io.jpress.model;

import io.jboot.db.annotation.Table;
import io.jboot.utils.StrUtil;
import io.jpress.commons.utils.CommonsUtils;
import io.jpress.model.base.BaseUserOrderItem;
import org.apache.commons.lang3.time.DateUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Generated by JPress.
 */
@Table(tableName = "user_order_item", primaryKey = "id")
public class UserOrderItem extends BaseUserOrderItem<UserOrderItem> {

    private static final long serialVersionUID = 1L;

    /**
     * 这个状态数值，完全等同于 UserOrder.Trade_status_xxx
     */
    public static final int STATUS_TRADING = UserOrder.TRADE_STATUS_TRADING; //交易中
    public static final int STATUS_COMPLETED = UserOrder.TRADE_STATUS_COMPLETED; //交易完成（但是可以申请退款）
    public static final int STATUS_CANCEL = UserOrder.TRADE_STATUS_CANCEL; //取消交易
    public static final int STATUS_APPLY_FOR_REFUNDING = UserOrder.TRADE_STATUS_APPLY_FOR_REFUNDING; //申请退款
    public static final int STATUS_REFUSAL_REFUNDING = UserOrder.TRADE_STATUS_REFUSAL_REFUNDING; //拒绝退款
    public static final int STATUS_REFUNDING = UserOrder.TRADE_STATUS_REFUNDING; //退款中
    public static final int STATUS_REFUNDED = UserOrder.TRADE_STATUS_REFUNDED;//退款完成
    public static final int STATUS_FINISHED = UserOrder.TRADE_STATUS_FINISHED;//交易结束

    public static final Map<Integer, String> statusTexts = new HashMap<>();

    static {
        statusTexts.put(STATUS_TRADING, "交易中");
        statusTexts.put(STATUS_COMPLETED, "交易完成");
        statusTexts.put(STATUS_CANCEL, "交易结束");
        statusTexts.put(STATUS_APPLY_FOR_REFUNDING, "申请退款中");
        statusTexts.put(STATUS_REFUSAL_REFUNDING, "解决退款");
        statusTexts.put(STATUS_REFUNDING, "退款中");
        statusTexts.put(STATUS_REFUNDED, "退款完成");
        statusTexts.put(STATUS_FINISHED, "交易结束");
    }

    public boolean canView() {
        Integer status = getStatus();

        if (status == null || (status != STATUS_FINISHED && status != STATUS_COMPLETED)) {
            return false;
        }

        if (StrUtil.isBlank(getViewPath()) || StrUtil.isBlank(getViewText())) {
            return false;
        }

        if (getViewEffectiveTime() == 0) {
            return true;
        }

        return DateUtils.addSeconds(getCreated(), getViewEffectiveTime().intValue()).getTime() > System.currentTimeMillis();
    }

    public boolean isFinished() {
        Integer status = getStatus();
        return status != null && status == STATUS_FINISHED;
    }

    public boolean isVirtualProduct() {
        Boolean v = getWithVirtual();
        return v != null && v;
    }

    @Override
    public boolean save() {
        CommonsUtils.escapeModel(this, "options");
        return super.save();
    }

    @Override
    public boolean update() {
        CommonsUtils.escapeModel(this, "options");
        return super.update();
    }


}

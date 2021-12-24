package io.jpress.addon.topic.model.base;

import io.jboot.db.model.JbootModel;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JPress, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseTopicCatalogue<M extends BaseTopicCatalogue<M>> extends JbootModel<M> implements IBean {

    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
	public void setId(java.lang.Long id) {
		set("id", id);
	}

    /**
     * 主键ID
     */
	public java.lang.Long getId() {
		return getLong("id");
	}

    /**
     * 主题ID
     */
	public void setTopicId(java.lang.Long topicId) {
		set("topic_id", topicId);
	}

    /**
     * 主题ID
     */
	public java.lang.Long getTopicId() {
		return getLong("topic_id");
	}

    /**
     * 标题
     */
	public void setTitle(java.lang.String title) {
		set("title", title);
	}

    /**
     * 标题
     */
	public java.lang.String getTitle() {
		return getStr("title");
	}

    /**
     * 文章标题ID列表 以,分割
     */
	public void setArticleId(java.lang.String articleId) {
		set("article_id", articleId);
	}

    /**
     * 文章标题ID列表 以,分割
     */
	public java.lang.String getArticleId() {
		return getStr("article_id");
	}

    /**
     * 排序编码
     */
	public void setOrderNumber(java.lang.Integer orderNumber) {
		set("order_number", orderNumber);
	}

    /**
     * 排序编码
     */
	public java.lang.Integer getOrderNumber() {
		return getInt("order_number");
	}

}

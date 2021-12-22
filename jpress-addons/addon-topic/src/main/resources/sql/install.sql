DROP TABLE IF EXISTS `topic`;
DROP TABLE IF EXISTS `topic_catalogue`;
create table `topic` (
                       `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
                       `topic_name` varchar(256) DEFAULT '' COMMENT '专题名称',
                       `slug` varchar(256) DEFAULT '' COMMENT 'slug',
                       `topic_code` varchar(256) DEFAULT '' COMMENT '专题标识',
                       `topic_content` text COMMENT '内容描述',
                       `topic_summary` text COMMENT '摘要',
                       `topic_type` varchar(256) DEFAULT '' COMMENT '专题类型',
                       `count` int(11) unsigned DEFAULT 0 COMMENT '专题项数量',
                       `order_number` int(11) DEFAULT 0 COMMENT '排序编码',
                       `created` datetime DEFAULT NULL COMMENT '创建日期',
                       `modified` datetime DEFAULT NULL COMMENT '最后更新日期',
                       PRIMARY KEY (`id`),
                       KEY `topic_typeslug` (`topic_type`,`slug`),
                       KEY `order_number` (`order_number`),
                       KEY `topic_type` (`topic_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='专题';

create table `topic_catalogue` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `topic_id` int(11) unsigned NOT NULL  COMMENT '主题ID',
    `title` varchar(256) DEFAULT '' COMMENT '标题',
    `article_id` varchar(512) DEFAULT '' COMMENT '文章标题ID列表 以,分割',
    `order_number` int(11) DEFAULT 0 COMMENT '排序编码',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='目录';


DROP TABLE IF EXISTS `article_doc`;
create table article_doc(
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `first_title` varchar(128) DEFAULT NULL COMMENT '第一级标题',
    `second_title` varchar(128) DEFAULT NULL COMMENT '第二级标题',
    `article_id` int(11) unsigned DEFAULT NULL COMMENT '文章ID',
    `article_title` varchar(255) unsigned DEFAULT NULL COMMENT '文章标题',
    `url` varchar(255) unsigned DEFAULT NULL COMMENT '文章链接',
    `show` tinyint(1) DEFAULT NULL COMMENT '是否展示',
     PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
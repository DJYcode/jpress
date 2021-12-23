DROP TABLE IF EXISTS `friend_link`;

create table `friend_link`
(
    id int unsigned auto_increment COMMENT '主键ID',
    name varchar(50) null comment '链接名',
    url varchar(255) null comment '网址',
    ico varchar(512) null comment '图标路径',
    order_number int default 0 null comment '排序',
    created datetime null comment '创建时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='友情链接';

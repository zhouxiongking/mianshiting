/*==============================================================*/
/* DBMS name:      Sybase SQL Anywhere 11                       */
/* Created on:     2015/6/10 13:04:29                           */
/*==============================================================*/

/*==============================================================*/
/* Table: comheart                                              */
/*==============================================================*/
create table comheart 
(
   id                   int                            not null  AUTO_INCREMENT,
   userid               varchar(32)                    null,
   commentid            varchar(32)                    null,
   constraint PK_COMHEART primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: "comment"                                             */
/*==============================================================*/
create table comments 
(
   id                   int                            not null AUTO_INCREMENT,
   userid               varchar(32)                    null,
   cusername            varchar(20)                    null,
   videoid              varchar(32)                  null,
   content              varchar(500)                   null,
   comtime              varchar(20)                    null,
   constraint PK_COMMENTS primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: heart                                                 */
/*==============================================================*/
create table heart 
(
   id                   int                            not null AUTO_INCREMENT,
   userid               varchar(32)                    null,
   picid                varchar(32)                    null,
   constraint PK_HEART primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: picture                                               */
/*==============================================================*/
create table picture 
(
   id                  	int                            not null AUTO_INCREMENT,
   userid               varchar(32)                    null,
   username             varchar(20)                    null,
   category             varchar(20)                    null,
   theme                varchar(50)                    null,
   description          varchar(300)                   null,
   picinfo              varchar(10000)                 null,
   picurl               varchar(5000)                  null,
   smallurl             varchar(5000)                  null,
   uploadtime           varchar(20)                    null,
   total                int                            null,
   status               varchar(10)                    null,
   scales               varchar(400)                   null,
   opinion              varchar(200)                   null,
   constraint PK_PICTURE primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: reply                                                 */
/*==============================================================*/
create table reply 
(
   id                   int                            not null AUTO_INCREMENT,
   fromid               varchar(32)                    null,
   commentid            varchar(32)                    null,
   toid                 varchar(32)                    null,
   content              varchar(5000)                  null,
   constraint PK_REPLY primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: "user"                                                */
/*==============================================================*/
create table users 
(
   id                   int                            not null AUTO_INCREMENT,
   username             varchar(20)                    null,
   password             varchar(20)                    null,
   qq                   varchar(12)                    null,
   academy              varchar(20)                    null,
   major                varchar(30)                    null,
   grade                varchar(10)                    null,
   realname             varchar(10)                    null,
   tel                  varchar(15)                    null,
   email                varchar(50)                    null,
   role                 varchar(5)                     null,
   constraint PK_USERS primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: "video"                                                */
/*==============================================================*/
create table article 
(
   id                   int                            not null AUTO_INCREMENT,
   description          varchar(200)                   null,
   title                varchar(50)                    null,
   label                varchar(30)                    null,
   content              text                           null,
   clicks               int                            null,
   uploadtime           varchar(20)                    null,
   url                  varchar(200)                   null,
   video_url            varchar(200)                   null,
   status               varchar(10)                    null,
   category             varchar(20)                    null,
   userId               varchar(32)                    null,
   username             varchar(20)                    null,
   constraint PK_ARTICLE primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: "audio"                                                */
/*==============================================================*/
create table audio 
(
   id                   int                            not null AUTO_INCREMENT,
   title                varchar(32)                    null,
   uploadtime           varchar(20)                    null,
   totaltime            int                            null,
   category             varchar(20)                    null,
   number               varchar(10)                    null,
   field                varchar(100)                   null,
   url                  varchar(200)                   null,
   constraint PK_AUDIO primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 阅读量 */
create table reading
(
   id                   int                            not null AUTO_INCREMENT,
   article_id           int                            not null,
   count                int                            not null,
   constraint PK_READING primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 留言板 */
create table message
(
   id                   int                            not null AUTO_INCREMENT,
   name                 varchar(10)                    null,
   content              varchar(100)                   not null,
   leave_time           varchar(20)                    null,
   isPass               int                            not null,
   constraint PK_READING primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*==============================================================*/
/* DBMS name:      Sybase SQL Anywhere 11                       */
/* Created on:     2015/6/10 13:04:29                           */
/*==============================================================*/

/*==============================================================*/
/* Table: comheart                                              */
/*==============================================================*/
create table comheart 
(
   id                   varchar(32)                    not null,
   userid               varchar(32)                    null,
   commentid            varchar(32)                    null,
   constraint PK_COMHEART primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: "comment"                                             */
/*==============================================================*/
create table comments 
(
   id                   varchar(32)                    not null,
   userid               varchar(32)                    null,
   cusername            varchar(20)                    null,
   picid                varchar(32)                    null,
   content              varchar(500)                   null,
   comtime              varchar(20)                    null,
   constraint PK_COMMENTS primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: heart                                                 */
/*==============================================================*/
create table heart 
(
   id                   varchar(32)                    not null,
   userid               varchar(32)                    null,
   picid                varchar(32)                    null,
   constraint PK_HEART primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: picture                                               */
/*==============================================================*/
create table picture 
(
   id                   varchar(32)                    not null,
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
   id                   varchar(32)                    null,
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
   id                   varchar(32)                    not null,
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
create table video 
(
   id                   varchar(32)                    not null,
   name                 varchar(20)                    null,
   title                varchar(30)                    null,
   label                varchar(20)                    null,
   description          varchar(300)                   null,
   clicks               int                            null,
   uploadtime           varchar(20)                    null,
   url                  varchar(100)                   null,
   picUrl               varchar(100)                   null,
   status               varchar(10)                    null,
   obligate             varchar(20)                    null,
   userId               varchar(32)                    null,
   username             varchar(20)                    null,
   constraint PK_VIDEO primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: "audio"                                                */
/*==============================================================*/
create table audio 
(
   id                   varchar(32)                    not null,
   title                varchar(32)                    null,
   uploadtime           varchar(20)                    null,
   totaltime            int                            null,
   category             varchar(20)                    null,
   number               varchar(10)                    null,
   field                varchar(100)                   null,
   url                  varchar(200)                   null,
   constraint PK_AUDIO primary key clustered (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
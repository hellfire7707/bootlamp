DROP TABLE member;
DROP TABLE member_roles;
DROP TABLE postscript_vote;
DROP TABLE postscript_view;
DROP TABLE tag;
DROP TABLE postscript;
DROP TABLE postscript_comment;
DROP TABLE study;
DROP TABLE study_comment;
DROP TABLE study_view;
DROP TABLE study_vote;
DROP TABLE mentor;
DROP TABLE comment;
DROP TABLE mentor_view;
DROP TABLE mentor_vote;
DROP TABLE mybootcamp;
DROP TABLE boot_camp;

-- 유저/역할
CREATE TABLE member (
	member_id bigint primary key
	,email varchar(255)
	,nickname varchar(100) 
	,password varchar(255) not null
);

CREATE TABLE member_roles (
	member_member_id bigint primary key
	,roles varchar(255) not null
);

--부트캠프 게시판
CREATE TABLE postscript_vote (
	postscript_vote_id bigint primary key
	,created_at datetime(6)
	,updated_at datetime(6)
	,total_votes int
	,vote int
	,member_id bigint
	,postscript bigint

);

CREATE TABLE postscript_view (
	postscript_view_id bigint primary key
	,member_id bigint
	,postscript_postscript bigint
);

CREATE TABLE tag (
	tag_id bigint primary key
	,tag_name varchar(255)
	,member_id bigint
	,postscript_id bigint
);

CREATE TABLE postscript (
	postscript_id bigint primary key
	,created_at datetime(6)
	,updated_at datetime(6)
	,postscript_content text
	,postscript_status varchar(20)
	,postscript_title text
	,tag_name varchar(255)
	,total_votes int
	,view  int
	,vote int
	,member_id bigint
);

CREATE TABLE postscript_comment (
	postscript_comment_id bigint primary key
	,created_at datetime(6)
	,updated_at datetime(6)
	,postscript_comment varchar(255)
	,member_id bigint
	,postscript_id bigint
);


-- 스터디 게시판
CREATE TABLE study (
	study_id  bigint primary key
	,created_at datetime(6)
	,updated_at datetime(6)
	,study_content varchar(255)
	,study_title varchar(255)
	,tag_name varchar(255)
	,total_votes int
	,view int
	,member_id bigint 
);

CREATE TABLE study_comment (
	study_comment_id bigint primary key
	,created_at datetime(6)
	,updated_at datetime(6)
	,study_comment varchar(255)
	,member_id bigint
	,study_id bigint
);

CREATE TABLE study_view (
	study_view_id bigint primary key
	,member_member_id bigint
	,study_study_id bigint
);
CREATE TABLE study_vote (
	study_vote_id bigint primary key
	,member_member_id bigint
	,study_study_id bigint
);

-- 멘토링 게시판
CREATE TABLE mentor (
	mentor_id  bigint primary key
	,created_at datetime(6)
	,updated_at datetime(6)
	,mentor_content text
	,mentor_title text
	,tag_name varchar(255)
	,total_votes int
	,view int
	,member_id bigint 
);

CREATE TABLE comment (
	mentor_comment_id bigint primary key
	,created_at datetime(6)
	,updated_at datetime(6)
	,mentor_comment varchar(255)
	,member_id bigint
	,mentor_mentoringid bigint
);

CREATE TABLE mentor_view (
	mentor_view_id bigint primary key
	,member_id bigint
	,mentor_mentor_id bigint
);

CREATE TABLE mentor_vote (
	mentor_vote_id bigint primary key
	,total_votes int
	,view int
	,member_id bigint
	,mentor_mentorid bigint
);

-- 부트캠프 일정
CREATE TABLE mybootcamp (
  mybootcamp_id bigint primary key
  ,vote int
  ,bootcamp_bootcampid bigint
  ,member_id bigint
);


CREATE TABLE boot_camp (
	bootcamp_id bigint primary key
	,address varchar(255)
	,begin_register_date varchar(255)
	,duration varchar(255)
	,end_date varchar(255)
	,final_register_date varchar(255)
	,on_off varchar(255)
	,process varchar(255)
	,satisfaction varchar(255)
	,site text
	,start_date varchar(255)
	,superviser varchar(255)
	,title varchar(255)
	,total_cost varchar(255)
	,tr_time varchar(255)
	,weekend_status varchar(255)
	,yard_man varchar(255)
);
/*DROP TABLE member;
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
*/

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

-- 부트캠프 리스트
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('97','(주)알파코','모집중','2022-12-08','[누구나 AI] 딥러닝 부트 캠프','무료(국비지원)','온/오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('72','인천일보아카데미','모집중','2022-12-08','빅데이터를 활용한 웹 시각화 양성과정','무료(국비지원)','오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('196','라이징캠프','모집중','2022-12-09','안드로이드 클래스','72만원','온라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('197','라이징캠프','모집중','2022-12-09','Server 클래스','72만원','온라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('198','라이징캠프','모집중','2022-12-09','Web 클래스','72만원','온라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('199','라이징캠프','모집중','2022-12-09','ios클래스','72만원','온라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('74','아시아경제 교육센터','모집중','2022-12-11','빅데이터 기반 디지털 산업융합 서비스 개발자 양성과정','무료(국비지원)','오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('200','코드캠프','모집중','2022-12-11','온라인 부트캠프 3기','600만원','온라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('201','코드캠프','모집중','2022-12-11','온라인 풀스택 부트캠프','850만원','온라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('184','코드캠프','모집중','2022-12-11','오프라인 부트캠프 ','850만원','오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('202','코드캠프','모집중','2022-12-11','오프라인 풀스택 부트캠프','1280만원','오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('75','아시아경제 교육센터','모집중','2022-12-11','빅데이터 분석 기반 AI 서비스 개발 부트캠프','무료(국비지원)','오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('16','아시아경제 교육센터','모집중','2022-12-12','핀테크 디지털 금융사이언티스트 양성과정','무료(국비지원)','오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('159','한경닷컴IT교육센터','모집중','2022-12-18','[핀테크 캠프]클라우드 기반 백엔드 금융 서비스 개발 실무','무료(국비지원)','오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('175','엔코아 아카데미','모집중','2022-12-18','인공지능을 활용한 휴먼 포즈 제네레이션 시스템 개발자 양성 과정','무료(국비지원)','오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('163','한경닷컴IT교육센터','모집중','2022-12-18','AI기반 빅데이터 분석과 RPA활용 프로젝트','무료(국비지원)','오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('48','아시아경제 교육센터','모집중','2022-12-19','실무프로젝트 기반 AI기술 활용 전문가 양성과정','무료(국비지원)','오프라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('187','F-Lab','모집중','2022-12-20','안드로이드 멘토링 프로그램','600만원','온라인');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('170','멀티캠퍼스','모집중','2022-12-21','[멀티잇]데이터 분석&엔지니어 취업캠프(Python)','무료(국비지원)','온오프 혼합');
insert into boot_camp(bootcamp_Id, title, begin_Register_Date, final_Register_Date, process, total_Cost, on_Off) values('173','멀티캠퍼스','모집중','2022-12-22','[멀티잇]백엔드 개발자 취업캠프(Java)','무료(국비지원)','온오프 혼합');


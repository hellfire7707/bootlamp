CREATE TABLE mybootcamp (
  mybootcamp_id bigint primary key
  ,vote int
  ,bootcamp_bootcampid bigint
  ,member_id bigint
);


CREATE TABLE mybootcamp (
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
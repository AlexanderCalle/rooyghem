DROP TABLE users;
DROP TABLE groups;
DROP TABLE locations;
DROP TABLE activities;

CREATE TABLE users (
	user_id INT,
	firstname VARCHAR(45),
	lastname VARCHAR(45),
	email VARCHAR(50),
	is_admin TINYINT,
	username VARCHAR(45),
	passhash VARCHAR(45),
	phone VARCHAR(45),
	FOREIGN KEY (group_id) REFERENCES groups(group_id)
);

CREATE TABLE groups (
	group_id INT,
	name VARCHAR(45),
	story LONGTEXT,
	logo VARCHAR(50),
	location_id TINYINT,
);

CREATE TABLE locations (
	location_id INT,
	name VARCHAR(45),
	adress VARCHAR(45),
	picture VARCHAR(45),
	iframe VARCHAR(45),
);

CREATE TABLE activities (
	activity_id INT,
	start_date DATETIME,
	end_date DATETIME,
	meetingpoint VARCHAR(45),
	description VARCHAR(45),
	start_publication DATE,
	end_publication DATE,
	group_id INT
);
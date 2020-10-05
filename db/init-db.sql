DROP TABLE users;
DROP TABLE groups;
DROP TABLE locations;
DROP TABLE activities;

CREATE TABLE users (
	PRIMARY KEY user_id INT,
	firstname VARCHAR(45) NOT NULL,
	lastname VARCHAR(45) NOT NULL,
	email VARCHAR(50) NOT NULL,
	is_admin TINYINT(1) DEFAULT 0,
	username VARCHAR(45) NOT NULL,
	passhash VARCHAR(45) NOT NULL,
	phone VARCHAR(45) NOT NULL,
	FOREIGN KEY (group_id) REFERENCES groups(group_id) NOT NULL
);

CREATE TABLE groups (
	PRIMARY KEY group_id INT,
	name VARCHAR(45) NOT NULL,
	story LONGTEXT,
	logo VARCHAR(50) NOT NULL,
	FOREIGN KEY (location_id) REFERENCES locations(location_id) NOT NULL
);

CREATE TABLE locations (
	PRIMARY KEY location_id INT,
	name VARCHAR(45) NOT NULL,
	adress VARCHAR(45) NOT NULL,
	picture VARCHAR(45) NOT NULL,
	iframe VARCHAR(45),
);

CREATE TABLE activities (
	PRIMARY KEY activity_id INT,
	start_date DATETIME NOT NULL,
	end_date DATETIME NOT NULL,
	meetingpoint VARCHAR(45) NOT NULL,
	description VARCHAR(45) NOT NULL,
	start_publication DATE,
	end_publication DATE,
	FOREIGN KEY (group_id) REFERENCES groups(group_id) NOT NULL
);
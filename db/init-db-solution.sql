CREATE TABLE locations (
	location_id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (location_id),
	name VARCHAR(45) NOT NULL,
	adress VARCHAR(45) NOT NULL,
	picture VARCHAR(45) NOT NULL,
	iframe VARCHAR(45)
);

CREATE TABLE `groups` (
	group_id INT AUTO_INCREMENT,
    PRIMARY KEY (group_id),
	name VARCHAR(45) NOT NULL,
	story LONGTEXT,
	logo VARCHAR(50) NOT NULL,
    location_id INT NOT NULL,
	CONSTRAINT `location_id` FOREIGN KEY (`location_id`) REFERENCES locations(location_id)
);

CREATE TABLE users (
	user_id VARCHAR(256) NOT NULL,
	firstname VARCHAR(45) NOT NULL,
	lastname VARCHAR(45) NOT NULL,
	email VARCHAR(50) NOT NULL,
	is_admin TINYINT(1) DEFAULT 0,
	username VARCHAR(45) NOT NULL,
	passhash VARCHAR(256) NOT NULL,
	phone VARCHAR(45) NOT NULL,
    group_id INT NOT NULL,
	bondsteam VARCHAR(45) NOT NULL,
	path_pic VARCHAR(256),
    PRIMARY KEY (user_id),
	UNIQUE KEY username_UNIQUE (username),
	FOREIGN KEY (group_id) REFERENCES `groups`(group_id)
);

CREATE TABLE activities (
	activity_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(45) NOT NULL,
	PRIMARY KEY (activity_id),
	start_date DATETIME NOT NULL,
	end_date DATETIME NOT NULL,
	meetingpoint VARCHAR(45),
	description VARCHAR(45),
	start_publication DATE,
	end_publication DATE,
    group_id INT NOT NULL,
	CONSTRAINT `group_id` FOREIGN KEY (`group_id`) REFERENCES `groups`(group_id)
);

CREATE TABLE newsfeeds (
	feed_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(45) NOT NULL,
	description TEXT NOT NULL,
	start_publication DATE,
	end_publication DATE,
	picture_path VARCHAR(256),
    created_by VARCHAR(256) NOT NULL,
    PRIMARY KEY (feed_id),
	CONSTRAINT `created_by` FOREIGN KEY (created_by) REFERENCES users(user_id)
);

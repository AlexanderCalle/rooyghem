CREATE TABLE albums (
    album_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    group_id INT NOT NULL,
    description LONGTEXT,
    activity_start DATE,
    activity_end DATE,
    creation_date DATE,
    checked BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(album_id),
    FOREIGN KEY (group_id) REFERENCES `groups`(group_id)
)

CREATE TABLE pictures (
    pictures_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    album_id INT,
    path VARCHAR(255),
    upload_date DATE,
    was_approved BOOLEAN DEFAULT FALSE,
    approved_by VARCHAR(255) NOT NULL,
    approved_on DATE,
    PRIMARY KEY(pictures_id),
    FOREIGN KEY (album_id) REFERENCES `albums`(album_id),
    CONSTRAINT `approved_by` FOREIGN KEY (approved_by) REFERENCES users(user_id)
)
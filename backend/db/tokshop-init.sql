CREATE TABLE tokshopitems (
    tokshopitem_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description LONGTEXT NOT NULL,
    price FLOAT NOT NULL,
    picture_path VARCHAR(256) UNIQUE,
    added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (tokshopitem_id)
);
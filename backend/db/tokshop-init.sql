CREATE TABLE tokshopitems (
    tokshopitem_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description LONGTEXT NOT NULL,
    price FLOAT NOT NULL,
    picture_path VARCHAR(256) UNIQUE,
    added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (tokshopitem_id)
);

CREATE TABLE tokshoporders (
    tokshoporder_id VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    firstname VARCHAR(45) NOT NULL,
    lastname VARCHAR(45) NOT NULL,
    group_id INT NOT NULL,
    ordered_on DATE NOT NULL,
    payed_on DATE,
    payed_reference VARCHAR(255),
    handed_on DATE,
    PRIMARY KEY(tokshoporder_id),
    FOREIGN KEY(`group_id`) REFERENCES `groups`(group_id)
);

CREATE TABLE tokshoporderitems (
    tokshoporderitem_id VARCHAR(256) NOT NULL,
    tokshoporder_id VARCHAR(256) NOT NULL,
    tokshopitem_id INT NOT NULL,
    amount INT unsigned NOT NULL CHECK (amount > 0),
    PRIMARY KEY(tokshoporderitem_id),
    FOREIGN KEY (`tokshoporder_id`) REFERENCES tokshoporders(tokshoporder_id),
    FOREIGN KEY (`tokshopitem_id`) REFERENCES tokshopitems(tokshopitem_id)
);
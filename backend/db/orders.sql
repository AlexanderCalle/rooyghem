CREATE TABLE `orders` (
    order_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (order_id),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    `group` VARCHAR(255) NOT NULL,
    total_amount INT NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pick_up_moment VARCHAR(255) NOT NULL
)
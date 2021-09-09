CREATE TABLE `orders` (
    order_id INT NOT NULL AUTOINCREMENT,
    PRIMARY KEY (order_id),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    `group` VARCHAR(255) NOT NULL,
    total_amount INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)
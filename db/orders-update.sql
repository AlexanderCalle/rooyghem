ALTER TABLE `rooyghem_dev`.`orders` 
CHANGE COLUMN `email` `phone` VARCHAR(255) NOT NULL ;

ALTER TABLE `Rooyghem`.`orders` 
ADD COLUMN `pick_up_moment` VARCHAR(255) NOT NULL AFTER `order_date`;
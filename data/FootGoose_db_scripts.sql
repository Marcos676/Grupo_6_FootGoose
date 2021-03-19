-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema footgoose
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema footgoose
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `footgoose` DEFAULT CHARACTER SET latin1 ;
USE `footgoose` ;

-- -----------------------------------------------------
-- Table `footgoose`.`animal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `footgoose`.`animal` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `animal` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `footgoose`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `footgoose`.`category` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `footgoose`.`label`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `footgoose`.`label` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `footgoose`.`sub_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `footgoose`.`sub_category` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `sub_category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `footgoose`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `footgoose`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(70) NOT NULL,
  `description` VARCHAR(300) NULL DEFAULT NULL,
  `cuantity` SMALLINT(6) NOT NULL,
  `price` DECIMAL(5,2) NOT NULL,
  `discount` TINYINT(3) NULL DEFAULT NULL,
  `sold` INT NULL DEFAULT 0,
  `expiration` DATETIME NULL DEFAULT NULL,
  `final_price` DECIMAL(5,2) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `animal_id` INT(11) NOT NULL,
  `category_id` INT(11) NOT NULL,
  `sub_category_id` INT(11) NOT NULL,
  `label_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_animales_id_idx` (`animal_id` ASC),
  INDEX `fk_category_id_idx` (`category_id` ASC),
  INDEX `fk_subCategory_id_idx` (`sub_category_id` ASC),
  INDEX `fk_label_id_idx` (`label_id` ASC),
  CONSTRAINT `fk_animales_id`
    FOREIGN KEY (`animal_id`)
    REFERENCES `footgoose`.`animal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `footgoose`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_label_id`
    FOREIGN KEY (`label_id`)
    REFERENCES `footgoose`.`label` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subCategory_id`
    FOREIGN KEY (`sub_category_id`)
    REFERENCES `footgoose`.`sub_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `footgoose`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `footgoose`.`location` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `footgoose`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `footgoose`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `address` VARCHAR(70) NULL DEFAULT NULL,
  `tel` INT(11) NULL DEFAULT NULL,
  `img` VARCHAR(45) NOT NULL DEFAULT 'undefined.PNG',
  `admin` TINYINT(1) NOT NULL DEFAULT 0,
  `location_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_location_id_idx` (`location_id` ASC),
  CONSTRAINT `fk_location_id`
    FOREIGN KEY (`location_id`)
    REFERENCES `footgoose`.`location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `footgoose`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `footgoose`.`cart` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_id_idx` (`user_id` ASC),
  INDEX `fk_product_id_idx` (`product_id` ASC),
  CONSTRAINT `fk_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `footgoose`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `footgoose`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `footgoose`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `footgoose`.`favorites` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_id_idx` (`product_id` ASC),
  INDEX `fk_favoriter_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_favorite_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `footgoose`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productFavorite_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `footgoose`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `footgoose`.`img_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `footgoose`.`img_product` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `img_name` VARCHAR(45) NULL DEFAULT 'undefinedProduct.png',
  `product_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_img_product_id_idx` (`product_id` ASC),
  CONSTRAINT `fk_img_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `footgoose`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

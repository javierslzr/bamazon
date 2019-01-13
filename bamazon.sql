CREATE DATABASE bamazon_db;

USE bamazon_db;


DROP DATABASE IF EXISTS bamazon_db;

-- Creates the "favorite_db" database --
CREATE DATABASE bamazon_db;


CREATE TABLE products(
id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR (150) NOT NULL,
department_name VARCHAR (150) NOT NULL,
price INTEGER,
stock_quantity INTEGER,
PRIMARY KEY (id)
);

SELECT * FROM products


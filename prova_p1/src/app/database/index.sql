CREATE DATABASE mydatabase;
USE mydatabase;

CREATE TABLE products (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category_id VARCHAR(36) NOT NULL,
  subcategory VARCHAR(255) NOT NULL
);

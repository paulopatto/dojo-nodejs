CREATE TABLE IF NOT EXISTS people (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    person_id     VARCHAR(255) NOT NULL,
    first_name    VARCHAR(255) NOT NULL,
    last_name     VARCHAR(255) NOT NULL,
    sex           ENUM('Male', 'Female', 'Other') NOT NULL,
    email         VARCHAR(255) NOT NULL,
    phone         VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    job_title     VARCHAR(255) NOT NULL,

    INDEX (person_id),
    INDEX (email),
    INDEX (phone),
    INDEX (job_title),
    INDEX (date_of_birth)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;


CREATE TABLE IF NOT EXISTS customers (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    customer_id       VARCHAR(255) NOT NULL,
    first_name        VARCHAR(255) NOT NULL,
    last_name         VARCHAR(255) NOT NULL,
    company           VARCHAR(255) NOT NULL,
    city              VARCHAR(255) NOT NULL,
    country           VARCHAR(255) NOT NULL,
    phone_1           VARCHAR(255) NOT NULL,
    phone_2           VARCHAR(255),
    email             VARCHAR(255) NOT NULL,
    subscription_date DATE NOT NULL,
    website           VARCHAR(255),

    INDEX (customer_id),
    INDEX (email),
    INDEX (subscription_date),
    INDEX (company),
    INDEX (country),
    INDEX (city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;


CREATE TABLE IF NOT EXISTS organizations (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    organization_id     VARCHAR(255) NOT NULL,
    name                VARCHAR(255) NOT NULL,
    website             VARCHAR(255),
    country             VARCHAR(255) NOT NULL,
    description         TEXT,
    founded             YEAR NOT NULL,
    industry            VARCHAR(255) NOT NULL,
    number_of_employees INT NOT NULL,
    
    INDEX (organization_id),
    INDEX (country),
    INDEX (founded),
    INDEX (industry)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  COLLATE=utf8_general_ci;



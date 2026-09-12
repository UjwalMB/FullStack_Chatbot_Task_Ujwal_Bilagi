CREATE DATABASE IF NOT EXISTS dronetv;

USE dronetv;

CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL,

    phone VARCHAR(20) NOT NULL,

    user_type ENUM('Student', 'Customer', 'Other') NOT NULL,

    interest VARCHAR(150) NOT NULL,

    message TEXT NOT NULL,

    status ENUM(
        'New',
        'Contacted',
        'In Progress',
        'Closed'
    ) DEFAULT 'New',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
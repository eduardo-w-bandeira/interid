-- Base table for Individual and Legal Entity users
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    user_type ENUM('individual', 'legal_entity') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

-- Individuals inherite from Users
CREATE TABLE Individuals (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    birth_date DATE,
    gov_id VARCHAR(50) UNIQUE,
    issuing_authority VARCHAR(100),
    country VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Legal Entities inherite from Users
CREATE TABLE LegalEntities (
    user_id INT PRIMARY KEY,
    legal_name VARCHAR(200) NOT NULL,
    business_name VARCHAR(200) NOT NULL,
    reg_num VARCHAR(50) UNIQUE,
    reg_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Declarations (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100),
    cont TEXT NOT NULL,
    allow_comments BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Agreements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    cont TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE AgreementParticipants (
    id SERIAL PRIMARY KEY,
    agreement_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (agreement_id) REFERENCES Agreements(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    UNIQUE(agreement_id, user_id)  -- Ensure a user can only participate once in an agreement
);

CREATE TABLE DeclarationComments (
    id SERIAL PRIMARY KEY,
    declaration_id INT NOT NULL,
    user_id INT NOT NULL,
    cont TEXT NOT NULL,
    parent_comment_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (declaration_id) REFERENCES Declarations(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
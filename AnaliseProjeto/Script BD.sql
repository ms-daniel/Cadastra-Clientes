IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = 'CADASTRO_CLIENTES')
BEGIN
    CREATE DATABASE CADASTRO_CLIENTES;
    PRINT 'O banco de dados CADASTRO_CLIENTES foi criado com sucesso.';
END
ELSE
BEGIN
    PRINT 'O banco de dados CADASTRO_CLIENTES já existe no servidor.';
END

GO -- garantir que o bloco if seja executado antes do use

USE CADASTRO_CLIENTES;

CREATE TABLE Clientes (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    Logotipo NVARCHAR(255), -- caminho para arquivo da img
);

CREATE TABLE Logradouros (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Cliente_ID INT,
    Rua NVARCHAR(255) NOT NULL,
    Numero NVARCHAR(50),
    Bairro NVARCHAR(100),
    Cidade NVARCHAR(100) NOT NULL,
    Estado NVARCHAR(100) NOT NULL,
    CEP NVARCHAR(20) NOT NULL,
    FOREIGN KEY (Cliente_ID) REFERENCES Clientes(ID) ON DELETE CASCADE
);





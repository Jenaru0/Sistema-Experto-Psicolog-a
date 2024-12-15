CREATE DATABASE IF NOT EXISTS psicologiaSistema;

USE psicologiaSistema;

CREATE TABLE IF NOT EXISTS usuarios (
                                        id INT AUTO_INCREMENT PRIMARY KEY,
                                        nombre VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS respuestas (
                                          id INT AUTO_INCREMENT PRIMARY KEY,
                                          usuario_id INT NOT NULL,
                                          pregunta_key VARCHAR(255) NOT NULL,
    respuesta INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );

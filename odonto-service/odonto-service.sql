SET search_path = odonto;

CREATE TABLE IF NOT EXISTS programa_salud_oral
(
    id_programa_salud_oral SERIAL PRIMARY KEY,
    codigo                 VARCHAR(10)  NOT NULL,
    nombre                 VARCHAR(100) NOT NULL,
    descripcion            VARCHAR(255),
    activo                 CHAR(1)      NOT NULL,
    UNIQUE (codigo)
);

CREATE TABLE IF NOT EXISTS ficha_odontologica
(
    id_ficha_odontologica  SERIAL PRIMARY KEY,
    fecha_control          DATE NOT NULL,
    observacion            TEXT,
    id_paciente            INT  NOT NULL,
    id_programa_salud_oral INT  NOT NULL,
    id_centro_salud        INT  NOT NULL,
    id_usuario_responsable INT  NOT NULL,
    FOREIGN KEY (id_programa_salud_oral) REFERENCES programa_salud_oral (id_programa_salud_oral) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS odontograma
(
    id_odontograma        SERIAL PRIMARY KEY,
    pieza_dental          VARCHAR(5)  NOT NULL,
    estado                VARCHAR(50) NOT NULL,
    observacion           TEXT,
    id_ficha_odontologica INT         NOT NULL,
    FOREIGN KEY (id_ficha_odontologica) REFERENCES ficha_odontologica (id_ficha_odontologica) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS radiografia
(
    id_radiografia        SERIAL PRIMARY KEY,
    path                  VARCHAR(255) NOT NULL,
    fecha_toma            DATE,
    id_ficha_odontologica INT          NOT NULL,
    FOREIGN KEY (id_ficha_odontologica) REFERENCES ficha_odontologica (id_ficha_odontologica) ON DELETE CASCADE ON UPDATE CASCADE
);
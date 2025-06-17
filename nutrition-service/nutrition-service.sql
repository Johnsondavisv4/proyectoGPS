SET search_path = nutrition;

CREATE TABLE IF NOT EXISTS programa_nutricional
(
    id_programa_nutricional SERIAL PRIMARY KEY,
    codigo                  VARCHAR(10)  NOT NULL,
    nombre                  VARCHAR(100) NOT NULL,
    descripcion             VARCHAR(255) NOT NULL,
    activo                  CHAR(1)      NOT NULL,
    UNIQUE (codigo)
);

CREATE TABLE IF NOT EXISTS inscripcion_pacam
(
    id_inscripcion_pacam    SERIAL PRIMARY KEY,
    fecha_inscripcion       DATE    NOT NULL,
    estado                  CHAR(1) NOT NULL,
    id_paciente             INT,
    id_programa_nutricional INT     NOT NULL,
    id_centro_salud         INT     NOT NULL,
    FOREIGN KEY (id_programa_nutricional) REFERENCES programa_nutricional (id_programa_nutricional) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS informe_pacam
(
    id_informe_pacam        SERIAL PRIMARY KEY,
    fecha_informe           DATE           NOT NULL,
    total_beneficiario      INT            NOT NULL,
    total_desembolso        NUMERIC(10, 2) NOT NULL,
    id_programa_nutricional INT            NOT NULL,
    FOREIGN KEY (id_programa_nutricional) REFERENCES programa_nutricional (id_programa_nutricional) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS control_desembolso
(
    id_control_desembolso SERIAL PRIMARY KEY,
    fecha_entrega         DATE          NOT NULL,
    cantidad_entregada    NUMERIC(8, 2) NOT NULL,
    id_inscripcion_pacam  INT           NOT NULL,
    FOREIGN KEY (id_inscripcion_pacam) REFERENCES inscripcion_pacam (id_inscripcion_pacam) ON DELETE CASCADE ON UPDATE CASCADE
);

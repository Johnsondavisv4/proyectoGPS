SET search_path = vaccination;

CREATE TABLE IF NOT EXISTS vacuna
(
    id_vacuna   SERIAL PRIMARY KEY,
    codigo      VARCHAR(10)  NOT NULL,
    nombre      VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS calendario_vacuna
(
    id_calendario_vacuna SERIAL PRIMARY KEY,
    edad_recomendada     INT NOT NULL,
    dosis                INT NOT NULL,
    etapa                VARCHAR(50),
    id_vacuna            INT NOT NULL,
    FOREIGN KEY (id_vacuna) REFERENCES vacuna (id_vacuna) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS registro_vacunacion
(
    id_registro_vacunacion SERIAL PRIMARY KEY,
    fecha_aplicacion       DATE NOT NULL,
    lote                   VARCHAR(50),
    id_paciente            INT  NOT NULL,
    id_vacuna              INT  NOT NULL,
    id_calendario_vacuna   INT,
    id_centro_salud        INT  NOT NULL,
    id_usuario_responsable INT  NOT NULL,
    FOREIGN KEY (id_vacuna) REFERENCES vacuna (id_vacuna) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_calendario_vacuna) REFERENCES calendario_vacuna (id_calendario_vacuna) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS alerta_inasistencia
(
    id_alerta_inasistencia SERIAL PRIMARY KEY,
    fecha_alerta           DATE         NOT NULL,
    motivo                 VARCHAR(255) NOT NULL,
    id_registro_vacunacion INT          NOT NULL,
    FOREIGN KEY (id_registro_vacunacion) REFERENCES registro_vacunacion (id_registro_vacunacion) ON DELETE CASCADE ON UPDATE CASCADE
);
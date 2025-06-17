SET search_path = pharmacy;

CREATE TABLE IF NOT EXISTS medicamento
(
    id_medicamento SERIAL PRIMARY KEY,
    nombre         VARCHAR(100) NOT NULL,
    presentacion   VARCHAR(50),
    descripcion    TEXT
);

CREATE TABLE IF NOT EXISTS receta
(
    id_receta     SERIAL PRIMARY KEY,
    id_paciente   INT  NOT NULL,
    id_medico     INT  NOT NULL,
    fecha_emision DATE NOT NULL,
    validez_dias  INT  NOT NULL DEFAULT 30,
    indicacion    TEXT
);

CREATE TABLE IF NOT EXISTS receta_medicamento
(
    id_receta_medicamento SERIAL PRIMARY KEY,
    id_receta             INT         NOT NULL,
    id_medicamento        INT         NOT NULL,
    dosis                 VARCHAR(50) NOT NULL,
    frecuencia            VARCHAR(50) NOT NULL,
    duracion_dias         INT         NOT NULL,
    FOREIGN KEY (id_receta) REFERENCES receta (id_receta) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_medicamento) REFERENCES medicamento (id_medicamento) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS despacho_medicamento
(
    id_despacho         SERIAL PRIMARY KEY,
    id_receta_med       INT         NOT NULL,
    fecha_despacho      TIMESTAMP   NOT NULL DEFAULT now(),
    cantidad_despachada VARCHAR(50) NOT NULL,
    id_farmacia         INT,
    FOREIGN KEY (id_receta_med) REFERENCES receta_medicamento (id_receta_medicamento) ON DELETE RESTRICT ON UPDATE CASCADE
);
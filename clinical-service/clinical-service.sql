SET search_path = clinical;

CREATE TABLE IF NOT EXISTS cita
(
    id_cita         SERIAL PRIMARY KEY,
    fecha_hora      DATE        NOT NULL,
    tipo_cita       VARCHAR(20) NOT NULL,
    estado          VARCHAR(20) NOT NULL,
    observacion     TEXT        NOT NULL,
    id_paciente     INT         NOT NULL,
    id_usuario      INT         NOT NULL,
    id_centro_salud INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS estratificacion_riesgo
(
    id_estratificacion_riesgo SERIAL PRIMARY KEY,
    nivel_riesgo              VARCHAR(20)  NOT NULL,
    motivo                    VARCHAR(255) NOT NULL,
    fecha_asignacion          DATE         NOT NULL,
    id_paciente               INT          NOT NULL,
    usuario_responsable       INT          NOT NULL
);
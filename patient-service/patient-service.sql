SET search_path = patient;

CREATE TABLE IF NOT EXISTS paciente
(
    id_paciente      SERIAL PRIMARY KEY,
    direccion        VARCHAR(100) NOT NULL,
    rut              VARCHAR(12)  NOT NULL,
    nombre           VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(50)  NOT NULL,
    apellido_materno VARCHAR(50)  NOT NULL,
    fecha_nacimiento DATE         NOT NULL,
    genero           CHAR(1)      NOT NULL,
    telefono         VARCHAR(15)  NOT NULL
);

CREATE TABLE IF NOT EXISTS programa_control
(
    id_programa_control SERIAL PRIMARY KEY,
    nombre              VARCHAR(100) NOT NULL,
    descripcion         VARCHAR(255),
    activo              CHAR(1)      NOT NULL,
    codigo              VARCHAR(10)  NOT NULL,
    UNIQUE (codigo)
);

CREATE TABLE IF NOT EXISTS familia
(
    id_familia     SERIAL PRIMARY KEY,
    nombre         VARCHAR(100) NOT NULL,
    fecha_creacion DATE         NOT NULL
);

CREATE TABLE IF NOT EXISTS tipo_relacion
(
    id_tipo_relacion SERIAL PRIMARY KEY,
    descripcion      VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS miembro_familiar
(
    id_miembro_familiar SERIAL PRIMARY KEY,
    nombre              VARCHAR(100) NOT NULL,
    fecha_nacimiento    DATE,
    genero              CHAR(1),
    id_familia          INT          NOT NULL,
    id_tipo_relacion    INT          NOT NULL,
    id_paciente         INT,
    FOREIGN KEY (id_familia) REFERENCES familia (id_familia) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_tipo_relacion) REFERENCES tipo_relacion (id_tipo_relacion) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS plan_intervencion
(
    id_plan_intervencion SERIAL PRIMARY KEY,
    nombre               VARCHAR(100) NOT NULL,
    descripcion          VARCHAR(255),
    fecha_inicio         DATE,
    fecha_fin            DATE,
    id_familia           INT          NOT NULL,
    FOREIGN KEY (id_familia) REFERENCES familia (id_familia) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS factor_riesgo
(
    id_factor_riesgo SERIAL PRIMARY KEY,
    descripcion      VARCHAR(255) NOT NULL,
    id_familia       INT          NOT NULL,
    FOREIGN KEY (id_familia) REFERENCES familia (id_familia) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS factor_protector
(
    id_factor_protector SERIAL PRIMARY KEY,
    descripcion         VARCHAR(255) NOT NULL,
    id_familia          INT          NOT NULL,
    FOREIGN KEY (id_familia) REFERENCES familia (id_familia) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ficha_control
(
    id_ficha_control       SERIAL PRIMARY KEY,
    fecha_control          DATE NOT NULL,
    observacion            TEXT,
    id_paciente            INT  NOT NULL,
    id_programa_control    INT  NOT NULL,
    id_centro_salud        INT  NOT NULL,
    id_usuario_responsable INT  NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES paciente (id_paciente) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_programa_control) REFERENCES programa_control (id_programa_control) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS historial_resultado
(
    id_historial_resultado SERIAL PRIMARY KEY,
    fecha_registro         DATE NOT NULL,
    presion_sistolica      INT,
    presion_diastolica     INT,
    frecuencia_cardiaca    INT,
    glicemia               NUMERIC(5, 2),
    peso                   NUMERIC(5, 2),
    talla                  NUMERIC(4, 2),
    imc                    NUMERIC(4, 2),
    observacion            TEXT,
    id_ficha_control       INT  NOT NULL,
    FOREIGN KEY (id_ficha_control) REFERENCES ficha_control (id_ficha_control) ON DELETE CASCADE ON UPDATE CASCADE
);
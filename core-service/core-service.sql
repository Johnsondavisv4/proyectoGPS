SET search_path = core;

CREATE TABLE IF NOT EXISTS centro_salud
(
    id_centro_salud SERIAL PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    direccion       VARCHAR(255) NOT NULL,
    telefono        VARCHAR(15)  NOT NULL
);

CREATE TABLE IF NOT EXISTS usuario
(
    id_usuario      SERIAL PRIMARY KEY,
    username        VARCHAR(50)  NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    nombre          VARCHAR(100) NOT NULL,
    email           VARCHAR(100) NOT NULL,
    estado          CHAR(1)      NOT NULL,
    id_centro_salud INT          NOT NULL,
    FOREIGN KEY (id_centro_salud) REFERENCES centro_salud (id_centro_salud) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS rol
(
    id_rol      SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS usuario_rol
(
    id_usuario INT NOT NULL,
    id_rol     INT NOT NULL,
    PRIMARY KEY (id_usuario, id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES rol (id_rol) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO centro_salud (nombre, direccion, telefono) VALUES
                                                           ('Hospital del Tórax',             'José Manuel Infante 717, Providencia, Santiago',                      '+56 2 25755000'),
                                                           ('Hospital Luis Calvo Mackenna',    'Antonio Varas 360, Providencia, Santiago',                           '+56 2 5755984'),
                                                           ('Hospital de Niños Roberto del Río','Profesor Zañartu 1085, Independencia, Santiago',                    '+56 2 25758251'),
                                                           ('Hospital del Salvador',           'Dr. Eduardo Pereira 152, Providencia, Santiago',                     '+56 2 2230 9000'),
                                                           ('Hospital Sótero del Río',         'Bombal 291, Puente Alto, Santiago',                                  '+56 2 2833 7000'),
                                                           ('Hospital Psiquiátrico Dr. Horwitz Barak','San Pablo 1050, Santiago','+56 2 2695 1000'),
                                                           ('Hospital San Juan de Dios',       'Alameda 1825, Santiago',                                             '+56 2 2676 5000'),
                                                           ('Hospital Luis Tisné',             'Nueva York 1621, Santiago',                                          '+56 2 2235 6000'),
                                                           ('Hospital Militar',                'Av. Las Condes 4506, La Reina, Santiago',                             '+56 2 2544 1000'),
                                                           ('Hospital Félix Bulnes',           'Av. Brasil 2280, Quinta Normal, Santiago',                            '+56 2 2686 5000');

INSERT INTO rol (nombre, descripcion) VALUES
                                          ('Administrador',              'Tiene todos los permisos para manejar la plataforma'),
                                          ('Médico tratante',            'Médico a cargo de la atención de pacientes en el hospital'),
                                          ('Médico residente',           'Médico en formación avanzada bajo supervisión de un médico tratante'),
                                          ('Enfermero registrado',       'Profesional de enfermería titulado que administra medicamentos y monitoriza pacientes'),
                                          ('Enfermero práctico con licencia', 'Enfermero que proporciona cuidados básicos bajo supervisión'),
                                          ('Enfermero facultativo',      'Enfermero con formación avanzada y autonomía para prescribir'),
                                          ('Especialista médico',        'Profesional con especialización en áreas médicas específicas'),
                                          ('Farmacéutico',               'Profesional encargado de la dispensación y asesoría de medicamentos'),
                                          ('Técnico de laboratorio',     'Profesional que realiza pruebas diagnósticas en laboratorio'),
                                          ('Empleado administrativo',    'Personal que gestiona registros y tareas administrativas'),
                                          ('Recepcionista',              'Encargado de la atención y orientación de pacientes y visitantes');
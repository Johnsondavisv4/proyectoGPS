import React from 'react';
import PacienteForm from './PacienteForm';

interface Paciente {
    id_paciente: number;
    nombre: string;
    rut: string;
    fecha_nacimiento: string;
    direccion: string;
    apellido_paterno: string;
    apellido_materno: string;
    genero: string;
    telefono: string;
}

const capitalizeWords = (str: string) =>
    str.replace(/\b\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

export default async function Page() {
    let filas;
    let error;

    try {
        const res = await fetch('http://localhost:3010/patient/paciente', {cache: 'no-store'});
        if (!res.ok) {
            throw new Error('Error al cargar pacientes');
        }
        filas = await res.json();
    } catch (err: any) {
        filas = [];
        error = err;
    }

    if (error) {
        return (
            <div style={{padding: '2rem', color: 'red'}}>
                <h1>Error cargando pacientes:</h1>
                <p>{(error as any).message || 'Error desconocido'}</p>
            </div>
        );
    }

    const pacientes: Paciente[] = (filas || []) as Paciente[];

    return (
        <main style={{padding: '2rem'}}>
            <h1>Pacientes</h1>
            <PacienteForm/>

            <div className="pacientes-grid" style={{marginTop: '1rem'}}>
                {pacientes.length > 0 ? (
                    pacientes.map((p) => (
                        <div key={p.id_paciente} className="patient-card">
                            <h3 style={{margin: '0 0 0.5rem'}}>
                                {capitalizeWords(p.nombre)} {capitalizeWords(p.apellido_paterno)} {capitalizeWords(p.apellido_materno)}
                            </h3>
                            <p>
                                <strong>RUT:</strong> {p.rut}
                            </p>
                            <p>
                                <strong>F. Nac.:</strong>{' '}
                                {new Date(p.fecha_nacimiento).toLocaleDateString('es-CL')}
                            </p>
                            <p>
                                <strong>Género:</strong>{' '}
                                {p.genero}
                            </p>
                            <p>
                                <strong>Teléfono:</strong> {p.telefono}
                            </p>
                            <p>
                                <strong>Dirección:</strong> {capitalizeWords(p.direccion)}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No hay pacientes aún.</p>
                )}
            </div>
        </main>
    );
}
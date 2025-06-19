'use client';

import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

interface AuthContextType {
    user: UserInfo | null | undefined;
    login: (username: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

interface RegisterData {
    username: string;
    password: string;
    nombre: string;
    email: string;
    id_centro_salud: number;
}

interface UserInfo {
    username: string;
    nombre: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const parseSessionDuration = (duration: string): number => {
    const value = parseInt(duration.slice(0, -1), 10);
    const unit = duration.slice(-1).toLowerCase();

    switch (unit) {
        case 'h':
            return value * 60 * 60 * 1000;
        case 'd':
            return value * 24 * 60 * 60 * 1000;
        case 'm':
            return value * 60 * 1000;
        case 's':
            return value * 1000;
        default:
            return 60 * 60 * 1000;
    }
};

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
    const router = useRouter();

    const checkSessionValidity = () => {
        const token = localStorage.getItem('token');
        const loginTime = localStorage.getItem('loginTime');
        const userInfoRaw = localStorage.getItem('userInfo');
        const sessionDuration = parseSessionDuration(
            process.env.NEXT_PUBLIC_SESSION_DURATION || '1h'
        );

        if (token && loginTime && userInfoRaw) {
            const now = Date.now();
            const loginTimeMs = parseInt(loginTime, 10);

            if (now - loginTimeMs > sessionDuration) {
                // Caducó la sesión
                logout();
            } else {
                // Sesión válida: restaurar userInfo desde localStorage
                try {
                    const info: UserInfo = JSON.parse(userInfoRaw);
                    setUser(info);
                } catch {
                    // Si está corrupto, forzar logout
                    logout();
                }
            }
        } else {
            // Falta token, loginTime o userInfo
            setUser(null);
        }
    };

    useEffect(() => {
        checkSessionValidity();
        const interval = setInterval(checkSessionValidity, 60000);
        return () => clearInterval(interval);
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const loginRes = await fetch('http://localhost:3010/core/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });

            if (!loginRes.ok) {
                alert('Credenciales inválidas');
                return;
            }

            const loginData = await loginRes.json();
            const token = loginData.access_token;

            const userRes = await fetch(`http://localhost:3010/core/usuarios/user/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!userRes.ok) {
                alert('Error al obtener información del usuario');
                return;
            }
            const userData = await userRes.json();

            const userInfo: UserInfo = {
                username: userData.username,
                nombre: userData.nombre,
                email: userData.email
            };

            localStorage.setItem('token', token);
            localStorage.setItem('loginTime', new Date().getTime().toString());
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            setUser(userInfo);
            router.push('/');
        } catch (err) {
            if (err instanceof Error) {
                alert('Error al iniciar sesión: ' + err.message);
            } else {
                alert('Error desconocido al iniciar sesión');
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('userInfo');
        setUser(null);
        router.push('/');
    };

    const register = async (data: RegisterData) => {
        try {
            const res = await fetch('http://localhost:3010/core/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                alert('Error al registrar usuario');
                return;
            }

            const nuevoUsuario = await res.json();
            const idUsuario = nuevoUsuario.id_usuario;

            const rolRes = await fetch('http://localhost:3010/core/usuario-rol', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id_usuario: idUsuario
                }),
            });

            if (!rolRes.ok) {
                const errText = await rolRes.text();
                alert('Usuario creado, pero error al asignar rol:\n' + errText);
                return;
            }

            alert('Usuario registrado y rol asignado correctamente')
            router.refresh();
        } catch (err) {
            alert('Error inesperado al registrar');
        }
    };

    return (
        <AuthContext.Provider value={{user, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return ctx;
}
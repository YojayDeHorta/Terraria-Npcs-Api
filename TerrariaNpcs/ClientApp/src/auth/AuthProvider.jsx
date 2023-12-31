﻿import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

const authContext = React.createContext();

export function useAuthContext() {
    return useContext(authContext);
}


export function AuthProvider(props) {
    let navigate = useNavigate(); 

    
    const [user, setUser] = useState({
        id: localStorage.getItem('id') || "",
        name: localStorage.getItem('name') || "",
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (newUser) => {
        localStorage.setItem('id', newUser.id)
        localStorage.setItem('name', newUser.name)
        localStorage.setItem('token', newUser.token)
        setToken(newUser.token)
        delete newUser.token
        setUser(newUser);
    }
    const logout = () => {
        localStorage.removeItem('id') 
        localStorage.removeItem('name') 
        localStorage.removeItem('token') 
        setUser({
            id:  "",
            name: "",
        })
        setToken(null)
        navigate('/');

    }
    return (
        <authContext.Provider value={{ user, token, login, logout }}>
                {props.children}
        </authContext.Provider>
    );
}
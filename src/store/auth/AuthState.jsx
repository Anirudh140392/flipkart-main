import React, { useState, useEffect } from "react";
import AuthContext from "./authContext";

const AuthState = (props) => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        if (username) {
            localStorage.setItem("username", username);
        }
    }, [username]);

    const setUser = (name) => {
        setUsername(name);
    };

    return (
        <AuthContext.Provider value={{ username, setUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
